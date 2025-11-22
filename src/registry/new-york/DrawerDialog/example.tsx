import { OctagonAlert } from "lucide-react";
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

      <DrawerDialogContent className="sm:max-w-md">
        <DrawerDialogScrollArea className="grid place-items-center gap-4 not-sm:p-5 not-sm:pt-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-destructive">
            <OctagonAlert />
          </div>

          <div className="flex w-full flex-col gap-4 text-center">
            <DrawerDialogTitle>Are you absolutely sure?</DrawerDialogTitle>
            <DrawerDialogDescription className="text-balance">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDialogDescription>

            <div className="mt-3 grid grid-cols-1 items-center justify-center gap-3 sm:mx-auto sm:max-w-xs sm:grid-cols-2">
              <DrawerDialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerDialogClose>

              <DialogClose asChild>
                <Button variant="destructive">Delete account</Button>
              </DialogClose>
            </div>
          </div>
        </DrawerDialogScrollArea>
      </DrawerDialogContent>
    </DrawerDialog>
  );
}
