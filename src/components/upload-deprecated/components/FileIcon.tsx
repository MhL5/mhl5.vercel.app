import {
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  VideoIcon,
} from "lucide-react";

export function FileIconComponent({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) {
  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  )
    return <FileTextIcon data-slot="file-icon" />;

  if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  )
    return <FileArchiveIcon data-slot="file-icon" />;

  if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  )
    return <FileSpreadsheetIcon data-slot="file-icon" />;

  if (fileType.includes("video/")) return <VideoIcon data-slot="file-icon" />;
  if (fileType.includes("audio/"))
    return <HeadphonesIcon data-slot="file-icon" />;
  if (fileType.startsWith("image/")) return <ImageIcon data-slot="file-icon" />;
  return <FileIcon data-slot="file-icon" />;
}
