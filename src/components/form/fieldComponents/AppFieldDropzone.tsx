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
import { fileUpload } from "@/components/upload/services/fileUpload";
import { toast } from "sonner";

export function AppFieldDropzone() {
  const { isInvalid, fieldControlProps } = useAppField();
  const field = useFieldContext();
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Uploader
          onUploadComplete={(res) => field.handleChange(res.file.url)}
          uploadHandler={fileUpload}
          disabled={isSubmitting}
          isInvalid={isInvalid}
        >
          <UploaderDropZone
            multiple={false}
            accept="image/*"
            inputId={fieldControlProps.id}
            onDropRejected={(errors) => {
              field.setErrorMap({ onChange: errors });
              errors.forEach(
                (err) => err?.message && toast.error(err?.message),
              );
            }}
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
