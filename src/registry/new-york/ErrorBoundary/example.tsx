import { ErrorBoundary } from "@/registry/new-york/ErrorBoundary/ErrorBoundary";

export default function Example() {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
}

function Component() {
  throw new Error("example error thrown inside <Component />");
  return <div>Component</div>;
}
