import {
  useAppField,
  useFieldContext,
  useFormContext,
} from "@/components/form/appForm";
import {
  Uploader,
  UploaderDropZone,
  UploaderFileItem,
  UploaderFilesList,
} from "@/components/upload/Uploader";

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
  const field = useFieldContext();

  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Uploader
          onUploadComplete={(res) => field.handleChange(res.file.url)}
          uploadHandler={uploadFile}
          disabled={isSubmitting}
          isInvalid={fieldControlProps["aria-invalid"]}
        >
          <UploaderDropZone
            multiple={false}
            accept="image/*"
            inputId={fieldControlProps.id}
            onDropRejected={(error) => field.setErrorMap({ onChange: error })}
          />

          <UploaderFilesList>
            {(files) =>
              files.map((fileItem) => (
                <UploaderFileItem key={fileItem.id} fileItem={fileItem} />
              ))
            }
          </UploaderFilesList>
        </Uploader>
      )}
    </form.Subscribe>
  );
}

/* 

*/
