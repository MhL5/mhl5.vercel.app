import InputWithIcon from "@/app/(with-navigation)/snippets/components/InputWithIcon";
import { Search } from "lucide-react";

export default function Example() {
  return (
    <InputWithIcon icon={Search} inputProps={{ placeholder: "search..." }} />
  );
}
