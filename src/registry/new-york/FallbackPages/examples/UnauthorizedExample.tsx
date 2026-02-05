import type { Route } from "next";

import { UnauthorizedPage } from "../FallbackPages";

export default function UnauthorizedExample() {
  return (
    <UnauthorizedPage className="min-h-auto" loginHref={"/login" as Route} />
  );
}
