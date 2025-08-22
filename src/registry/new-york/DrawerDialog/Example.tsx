import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DrawerDialog } from "@/registry/new-york/DrawerDialog/DrawerDialog";

export default function Example() {
  return (
    <DrawerDialog
      trigger={<Button>Open DrawerDialog</Button>}
      content={
        <div className="flex w-full flex-col gap-4 p-6">
          <DialogTitle>DrawerDialog Example</DialogTitle>
          <DialogDescription>
            This is a description of the DrawerDialog Example.
          </DialogDescription>

          <div className="mt-3 flex items-center justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button>Submit</Button>
            </DialogClose>
          </div>
        </div>
      }
    />
  );
}
