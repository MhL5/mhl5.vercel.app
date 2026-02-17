import { ImageIcon, Music, Video } from "lucide-react";

export const ASSET_UPLOAD_NODE_ICONS = {
  image: ImageIcon,
  video: Video,
  audio: Music,
};

export const ASSET_UPLOAD_NODE_OPTIONS = [
  {
    mediaType: "image",
    icon: ASSET_UPLOAD_NODE_ICONS.image,
    label: "Image",
  },
  {
    mediaType: "video",
    icon: ASSET_UPLOAD_NODE_ICONS.video,
    label: "Video",
  },
  {
    mediaType: "audio",
    icon: ASSET_UPLOAD_NODE_ICONS.audio,
    label: "Audio",
  },
] as const;
