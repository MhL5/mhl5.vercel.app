export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

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
    return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;

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

    if (!isAccepted) return `File "${file.name}" is not an accepted file type.`;
  }

  return null;
}

export type FileValidationResult = {
  acceptedFiles: File[];
  rejectedFiles: Array<{ file: File; error: string }>;
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

export function formatTimeLeftInSeconds(timeLeftInSeconds: number) {
  if (timeLeftInSeconds < 60)
    return `${Math.round(timeLeftInSeconds)} seconds remaining`;
  if (timeLeftInSeconds < 3600)
    return `${Math.round(timeLeftInSeconds / 60)} minutes remaining`;
  return `${Math.round(timeLeftInSeconds / 3600)} hours remaining`;
}
