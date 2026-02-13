import { BlockButtons } from "./components/BlockButtons";
import { HeadingDropdown } from "./components/HeadingDropdown";
import { ListDropdown } from "./components/ListDropdown";
import { Separator } from "./components/Separator";
import { TextAlignDropdown } from "./components/TextAlignDropdown";
import { TextFormattingButtons } from "./components/TextFormattingButtons";
import { UndoRedo } from "./components/UndoRedo";

export function EditorToolbar() {
  return (
    <div
      data-slot="editor-toolbar"
      className="flex items-center justify-center gap-2 overflow-x-auto bg-card px-2 py-1.75 text-card-foreground"
    >
      <UndoRedo />

      <Separator />

      <HeadingDropdown />
      <ListDropdown />
      <BlockButtons />

      <Separator />

      <TextFormattingButtons />

      <Separator />

      <TextAlignDropdown />

      {/*              
              

              <ImageButton />

              <TablePopover />

              <YoutubeDropdown />

              <TocButton />

              <AudioDialog />

              <VideoDialog />
       */}
    </div>
  );
}
