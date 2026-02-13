import AudioDialog from "./AudioDialog";
import { ImageButton } from "./ImageDropdown";
import TablePopover from "./TablePopover";
import TocButton from "./TocButton";
import VideoDialog from "./VideoDialog";
import YoutubeDropdown from "./YoutubeDropdown";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto bg-muted/70 px-2 py-1.5">
      <ImageButton />
      <TablePopover />
      <YoutubeDropdown />
      <TocButton />
      <AudioDialog />
      <VideoDialog />
    </div>
  );
}
