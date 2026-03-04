import { useAppField } from "@/components/form/appForm";
import { DropZone } from "@/components/upload/DropZone";
import { FileItem } from "@/components/upload/components/FileItem";
import { useFileUpload } from "@/components/upload/hooks/useFileUpload";

type UploadFileParams = {
  signal: AbortSignal;
  file: File;
  onprogress: NonNullable<XMLHttpRequest["upload"]["onprogress"]>;
};

export async function uploadFile({
  file,
  signal,
  onprogress,
}: UploadFileParams) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      onprogress.call(xhr, event);
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

  return (await response.json()) as { file: { url: string }; message: string };
}

/**
 * i like this field to accept a uploader fn
 * i want the fetcher logic to not be a part of this component, we might use axios ky xhr ..........
 *
 * we need to somehow sync the state of this component with the form, value and onChange(create delete update)
 * it should also reset on form reset ...
 */
export function AppFieldDropzone() {
  const { fieldControlProps } = useAppField();
  const { files, handleAdd, handleRemove, handleRetry } = useFileUpload({
    onUploadComplete: () => {},
    uploadHandler: uploadFile,
  });

  return (
    <>
      <DropZone
        accept="image/*"
        disabled={false}
        multiple
        onFilesSelect={(file) => {
          handleAdd(file);
        }}
        inputId={fieldControlProps.id}
        isInvalid={fieldControlProps["aria-invalid"]}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((fileItem, i) => (
            <FileItem
              key={`${fileItem.id}-${i}`}
              fileItem={fileItem}
              onRemove={() => handleRemove(fileItem.id)}
              onRetry={() => handleRetry(fileItem.id)}
              disabled={false}
            />
          ))}
        </div>
      )}
    </>
  );
}
