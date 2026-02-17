import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useId } from "react";

import { ASSET_UPLOAD_NODE_ICONS } from "../constants";
import { ImageForm } from "./ImageForm";

const assetsList = {
  image: {
    icon: ASSET_UPLOAD_NODE_ICONS.image,
    title: "Image",
  },
  audio: {
    icon: ASSET_UPLOAD_NODE_ICONS.audio,
    title: "Audio",
  },
  video: {
    icon: ASSET_UPLOAD_NODE_ICONS.video,
    title: "Video",
  },
} as const;

const forms = {
  image: ImageForm,
  // audio: AudioForm,
  // video: VideoForm,
};

export default function AssetUploadNode({
  node,
  getPos,
  deleteNode,
}: NodeViewProps) {
  const formId = useId();

  const mediaType = "image";
  // const mediaType = node.attrs.mediaType as MediaType;

  const { icon: Icon, title } = assetsList[mediaType];
  const CurrentAssetForm = forms[mediaType];

  return (
    <NodeViewWrapper className="not-prose my-4 w-full">
      <Card key={mediaType + title} className="">
        <CardHeader>
          <CardTitle className="items-center">
            <Icon className="me-1 mb-0.25 inline-block size-5" /> {title}
          </CardTitle>
          <CardDescription>
            insert an {mediaType} into the document
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CurrentAssetForm formId={formId} getPos={getPos} node={node} />
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={deleteNode}>
            Cancel
          </Button>
          <Button form={formId} type="submit">
            Insert
          </Button>
        </CardFooter>
      </Card>
    </NodeViewWrapper>
  );
}

// function AudioForm({ formId }: BaseFormProps) {
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");

//   function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     // const formData =
//   }

//   return (
//     <form id={formId}>
//       <UploadOrUrl
//         accept="audio/*"
//         mediaLabel="Audio"
//         urlPlaceholder="https://example.com/audio.mp3"
//         url={url}
//         onUrlChange={setUrl}
//         onUploadSuccess={setUrl}
//       />
//     </form>
//   );
// }
// function VideoForm({ formId }: BaseFormProps) {
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");

//   function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     // const formData =
//   }

//   return (
//     <form id={formId} onSubmit={(e) => {}}>
//       <UploadOrUrl
//         accept="video/*"
//         mediaLabel="Video"
//         urlPlaceholder="https://example.com/video.mp4"
//         url={url}
//         onUrlChange={setUrl}
//         onUploadSuccess={setUrl}
//       />
//     </form>
//   );
// }
