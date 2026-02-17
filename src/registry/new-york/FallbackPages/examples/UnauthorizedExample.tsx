import type { Route } from "next";

import { FallbackPage } from "../FallbackPages";

export default function UnauthorizedExample() {
  return (
    <FallbackPage
      variant="unauthorized"
      loginPagePathname={"/login" as Route}
      className="min-h-auto"
    />
  );
}
