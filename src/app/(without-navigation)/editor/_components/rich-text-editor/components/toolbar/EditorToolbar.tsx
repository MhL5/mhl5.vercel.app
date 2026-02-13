import { Attachments } from "./components/Attachments";
import { BlockButtons } from "./components/BlockButtons";
import { HeadingDropdown } from "./components/HeadingDropdown";
import { ListDropdown } from "./components/ListDropdown";
import { TextAlignDropdown } from "./components/TextAlignDropdown";
import { TextFormattingButtons } from "./components/TextFormattingButtons";
import TocButton from "./components/TocButton";
import { UndoRedo } from "./components/UndoRedo";
import { YoutubeDropdown } from "./components/YoutubeDropdown";
import { TableDropdown } from "./components/table/TableDropdown";
import { Separator } from "./components/ui/Separator";

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

      <Separator />

      <TocButton />
      <TableDropdown />
      <Attachments />
      <YoutubeDropdown />
    </div>
  );
}
