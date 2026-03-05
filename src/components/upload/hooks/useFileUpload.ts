import { useOnUnMount } from "@/hooks/useOnUnMount";
import type { RequiredPick } from "@/registry/types/RequiredPick/RequiredPick";
import { isAbortedError } from "@/utils/error/isAbortedError";
import { useReducer } from "react";
import { toast } from "sonner";

export type FileItem = {
  id: string;
  file: File;

  progressPercentage: number;
  uploadSpeedInSeconds: number;
  timeLeftInSeconds: number;
  startTime: number | null;

  error: string | null;
  abortController: AbortController | null;
};

type FileAction =
  | { type: "ADD_FILES"; payload: FileItem[] }
  | { type: "REMOVE_FILE"; payload: { id: string } }
  | {
      type: "UPDATE_FILE";
      payload: RequiredPick<Partial<FileItem>, "id">;
    }
  | { type: "CLEAR_FILES" };

/**
 * Reducer function to manage the state of uploaded files.
 */
function fileReducer(state: FileItem[], action: FileAction): FileItem[] {
  switch (action.type) {
    case "ADD_FILES":
      return [...state, ...action.payload];
    case "REMOVE_FILE":
      return state.filter((file) => {
        const isTargetFile = file.id === action.payload.id;
        if (isTargetFile) file.abortController?.abort();
        return !isTargetFile;
      });
    case "UPDATE_FILE":
      return state.map((file) =>
        file.id === action.payload.id ? { ...file, ...action.payload } : file,
      );
    case "CLEAR_FILES":
      state.forEach(({ abortController }) => abortController?.abort());
      return [];
    default:
      action satisfies never;
      return state;
  }
}

const errorFallbackMessage =
  "Something went wrong during upload! please try again or contact customer support.";

export type UseFileUploadOptions<T> = {
  onUploadComplete: (result: T) => void;
  uploadHandler: (options: {
    file: FileItem["file"];
    signal: AbortController["signal"];
    onprogress: NonNullable<XMLHttpRequest["upload"]["onprogress"]>;
  }) => Promise<T>;
};

/**
 * Custom hook to manage file uploads.
 * this hook can be used for both single/multiple uploads
 */
export function useFileUpload<T>({
  onUploadComplete,
  uploadHandler,
}: UseFileUploadOptions<T>) {
  const [files, dispatch] = useReducer(fileReducer, []);

  /**
   * internal function, Handles the file upload process.
   */
  async function _handleUpload(filesToUpload: FileItem[]) {
    const filesToProcess = filesToUpload || files;
    if (filesToProcess.length === 0) return;

    const uploadPromises = filesToProcess
      .filter((file) => !file.error)
      .map((fileItem) => {
        // Create AbortController for this specific upload
        const abortController = new AbortController();
        dispatch({
          type: "UPDATE_FILE",
          payload: { id: fileItem.id, abortController },
        });

        // handles the file upload and onprogress
        uploadHandler({
          file: fileItem.file,
          signal: abortController.signal,
          onprogress: (event) => {
            if (!event.lengthComputable) return;

            const progress = event.loaded / event.total;
            const startTime = fileItem.startTime || Date.now();

            const progressPercentage = progress * 100;

            const elapsedMs = Date.now() - startTime;
            const elapsedSec = elapsedMs / 1_000;
            const uploadSpeedInSeconds =
              elapsedSec > 0 ? event.loaded / elapsedSec : 0;

            const uploadedBytes = progress * event.total;
            const timeLeftInSeconds =
              (event.total - uploadedBytes) / uploadSpeedInSeconds;

            dispatch({
              type: "UPDATE_FILE",
              payload: {
                id: fileItem.id,
                progressPercentage,
                uploadSpeedInSeconds,
                timeLeftInSeconds,
                startTime,
              },
            });
          },
        })
          .then((res) => {
            onUploadComplete(res);
            toast.success(`${fileItem.file.name} uploaded successfully.`);
          })
          .catch((error) => {
            if (isAbortedError(error)) return;

            dispatch({
              type: "UPDATE_FILE",
              payload: {
                id: fileItem.id,
                error: `${error?.message || errorFallbackMessage}`,
                abortController: null,
              },
            });
            toast.error(
              `${fileItem.file.name}: ${error?.message || errorFallbackMessage}`,
            );
          })
          .finally(() => {
            // once upload is complete,removes the abortController
            dispatch({
              type: "UPDATE_FILE",
              payload: {
                id: fileItem.id,
                abortController: null,
              },
            });
          });
      });

    await Promise.all(uploadPromises).catch((error) =>
      toast.error(
        error instanceof Error ? error.message : errorFallbackMessage,
      ),
    );
  }

  /**
   * Adds new files and triggers the upload process.
   */
  function handleAdd(file: File[]) {
    if (!file || file.length === 0) return;

    const newFiles: FileItem[] = Array.from(file).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,

      progressPercentage: 0,
      uploadSpeedInSeconds: 0,
      timeLeftInSeconds: 0,
      startTime: Date.now(),

      error: null,
      abortController: null,
    }));

    dispatch({ type: "ADD_FILES", payload: newFiles });
    _handleUpload(newFiles);
  }

  /**
   * Removes a file and aborts the upload if in progress.
   */
  function handleRemove(id: FileItem["id"]) {
    dispatch({ type: "REMOVE_FILE", payload: { id } });
  }

  /**
   * Retries the upload for the file with that matches id param.
   */
  function handleRetry(id: FileItem["id"]) {
    const file = files.find((file) => file.id === id);
    if (!file) return toast.error("File not found");

    // Abort any existing upload for this file
    if (file.abortController) file.abortController.abort();

    const fileToRetry: FileItem = {
      ...file,

      timeLeftInSeconds: 0,
      progressPercentage: 0,
      uploadSpeedInSeconds: 0,
      startTime: Date.now(),

      error: null,
      abortController: null, // Will be set when upload starts
    };

    dispatch({ type: "UPDATE_FILE", payload: fileToRetry });
    _handleUpload([fileToRetry]);
  }

  /**
   * Aborts and removes all the files
   */
  function handleAbortAll() {
    dispatch({ type: "CLEAR_FILES" });
  }

  // Abort all upload requests when the component unmounts
  useOnUnMount(() =>
    files.forEach(({ abortController }) => abortController?.abort()),
  );

  return {
    files,
    handleAdd,
    handleRemove,
    handleRetry,
    handleAbortAll,
  };
}
