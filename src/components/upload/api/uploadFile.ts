import { tryCatch } from "@/registry/utils/tryCatch/tryCatch";
import { useRef, useState } from "react";

type UploadFileParams = {
  signal: AbortSignal;
  file: File;
  onUploadProgress: (options: {
    progressPercentage: number;
    uploadSpeed: number;
  }) => void;
};

async function uploadFile({
  file,
  signal,
  onUploadProgress,
}: UploadFileParams) {
  const formData = new FormData();
  formData.append("file", file);

  return await new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const startTime = Date.now();

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      const loaded = event.loaded;
      const total = event.total;
      const progressPercentage = (loaded / total) * 100;

      const elapsedMs = Date.now() - startTime;
      const elapsedSec = elapsedMs / 1_000;
      const uploadSpeed = elapsedSec > 0 ? loaded / elapsedSec : 0;

      onUploadProgress({ progressPercentage, uploadSpeed });
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300)
        return resolve(new Response(xhr.responseText, { status: xhr.status }));
      reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
    };

    xhr.onerror = () => reject(new Error("Upload failed"));

    xhr.onabort = () => reject(new DOMException("Aborted", "AbortError"));

    signal.addEventListener("abort", () => xhr.abort());

    xhr.open("POST", "http://localhost:4000/upload");
    xhr.send(formData);
  });
}

type UploadState = {
  progressPercentage: number;
  uploadSpeed: number;
  file: File | null;
  error: string;
};

const defaultState: UploadState = {
  progressPercentage: 0,
  uploadSpeed: 0,
  file: null,
  error: "",
};

function useUploadFile({ onSuccess }: { onSuccess: (url: string) => void }) {
  const abortControllerRef = useRef<AbortController | null>(null);
  const isUploadActiveRef = useRef(false);
  const [uploadState, setUploadState] = useState<UploadState>(defaultState);

  async function handleUpload(file: File) {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    isUploadActiveRef.current = true;

    setUploadState({
      ...defaultState,
      file,
      progressPercentage: 0,
    });

    const [error, response] = await tryCatch(
      uploadFile({
        file,
        signal: controller.signal,
        onUploadProgress: ({ progressPercentage, uploadSpeed }) => {
          if (!isUploadActiveRef.current) return;
          setUploadState({
            progressPercentage,
            uploadSpeed,
            file,
            error: "",
          });
        },
      }),
    );

    isUploadActiveRef.current = false;

    if (error) {
      // Check if the error is due to request cancellation
      const isAborted =
        error.name === "AbortError" ||
        (error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "ERR_CANCELED");

      // If aborted, we don't show an error toast as it was intentionally cancelled
      if (isAborted) return;

      setUploadState((prev) =>
        prev.file
          ? { ...prev, error: error.message }
          : {
              ...defaultState,
              file,
              fileName: file.name,
              fileSize: file.size,
              error: error.message,
            },
      );
      return;
    }

    if (response) onSuccess(JSON.parse(await response.text()).file.url);
    setUploadState(defaultState);
  }

  function handleRemove() {
    isUploadActiveRef.current = false;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setUploadState(defaultState);
  }

  function handleRetry() {
    const file = uploadState.file;
    if (!file) return;
    handleRemove();
    handleUpload(file);
  }

  return {
    uploadState,
    handleUpload,
    handleRemove,
    handleRetry,
  };
}

export { useUploadFile, uploadFile };
