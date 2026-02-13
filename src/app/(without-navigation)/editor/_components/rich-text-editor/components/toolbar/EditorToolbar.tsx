import { BlockButtons } from "./components/BlockButtons";
import { HeadingDropdown } from "./components/HeadingDropdown";
import { ListButtons } from "./components/ListButtons";
import { Separator } from "./components/Separator";
import { TextAlignDropdown } from "./components/TextAlignDropdown";
import { TextFormattingButtons } from "./components/TextFormattingButtons";
import { UndoRedo } from "./components/UndoRedo";

export function EditorToolbar() {
  return (
    <div
      data-slot="editor-toolbar"
      className="flex items-center justify-center gap-2 overflow-x-auto bg-muted/70 px-2 py-1.5"
    >
      <UndoRedo />

      <Separator />

      <HeadingDropdown />
      <BlockButtons />

      <ListButtons />
      <TextAlignDropdown />
      <TextFormattingButtons />
      {/*              
              < />
              < />
              < />
              <TextAlignButtons />
              < />
              <TextFormattingButtons />
              < />
              < />
              < />
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
