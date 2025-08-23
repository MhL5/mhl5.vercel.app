import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  DrawerDialog,
  DrawerDialogClose,
  DrawerDialogContent,
  DrawerDialogDescription,
  DrawerDialogScrollArea,
  DrawerDialogTitle,
  DrawerDialogTrigger,
} from "@/registry/new-york/DrawerDialog/DrawerDialog";

export default function Example() {
  return (
    <DrawerDialog>
      <DrawerDialogTrigger asChild>
        <Button>trigger</Button>
      </DrawerDialogTrigger>

      <DrawerDialogContent>
        <DrawerDialogScrollArea className="not-sm:p-5">
          <div className="flex w-full flex-col gap-4">
            <DrawerDialogTitle>DrawerDialog Example</DrawerDialogTitle>
            <DrawerDialogDescription>
              This is a description of the DrawerDialog Example.
            </DrawerDialogDescription>

            <div className="mt-3 flex items-center justify-end gap-3">
              <DrawerDialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerDialogClose>

              <DialogClose asChild>
                <Button>Submit</Button>
              </DialogClose>
            </div>
          </div>
        </DrawerDialogScrollArea>
      </DrawerDialogContent>
    </DrawerDialog>
  );
}
