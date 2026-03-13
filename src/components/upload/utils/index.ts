import {
  formatBytes,
  truncateMiddle,
} from "@/registry/utils/formatters/formatters";

export function validateFile({
  file,
  maxSize,
  accept,
}: {
  file: File;
  maxSize: number;
  accept: string;
}) {
  if (file.size > maxSize)
    return [
      {
        message: `File "${truncateMiddle(file.name)}" exceeds the maximum size of ${formatBytes(maxSize)}.`,
      },
    ];

  if (accept !== "*") {
    const acceptedTypes = accept.split(",").map((type) => type.trim());
    const fileType = file.type;
    const fileExtension = `.${file.name.split(".").pop()}`;

    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith("."))
        return fileExtension.toLowerCase() === type.toLowerCase();

      if (type.endsWith("/*")) {
        const baseType = type.split("/")[0];
        return fileType.startsWith(`${baseType}/`);
      }
      return fileType === type;
    });

    if (!isAccepted)
      return [
        {
          message: `File "${truncateMiddle(file.name)}" is not an accepted file type.`,
        },
      ];
  }

  return null;
}

export type FileValidationResult = {
  acceptedFiles: File[];
  rejectedFiles: Array<{
    file: File;
    error: Array<{ message: string }>;
  }>;
};

export function validateFiles({
  files,
  accept,
  maxSize,
}: {
  files: File[];
  maxSize: number;
  accept: string;
}) {
  if (files.length === 0) return { acceptedFiles: [], rejectedFiles: [] };

  return files.reduce<FileValidationResult>(
    (acc, file) => {
      const error = validateFile({
        file,
        maxSize,
        accept,
      });

      if (error) acc.rejectedFiles.push({ file, error });
      else acc.acceptedFiles.push(file);

      return acc;
    },
    { acceptedFiles: [], rejectedFiles: [] },
  );
}

export function isImage(str: string) {
  // Define a regular expression to check for image file extensions
  const imageExtensions = /\.(avif|jpg|jpeg|png|gif|bmp|webp|svg)$/i;
  // Test the input string against the regular expression
  return imageExtensions.test(str);
}

export function parseFileUrl(url: string) {
  // Split the pathname into parts
  const parts = url.split("/");

  // Get the last part which is the file name with extension
  const fileNameWithExtension = parts[parts.length - 1];

  // Split the file name and extension
  const [name, type] = fileNameWithExtension.split(".");

  return {
    name: name || url,
    type,
  };
}
