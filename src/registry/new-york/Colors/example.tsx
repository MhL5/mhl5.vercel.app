"use client";

import { CheckCircle, Info, TriangleAlert, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const variants = ["success", "error", "warning", "info"] as const;
const alertsExamples = [
  {
    variant: variants[0],
    title: variants[0],
    description: "Successfully completed the task.",
    icon: CheckCircle,
  },
  {
    variant: variants[1],
    title: variants[1],
    description: "An error occurred while processing the request.",
    icon: XCircle,
  },
  {
    variant: variants[2],
    title: variants[2],
    description: "A warning message to inform you about the potential issue.",
    icon: TriangleAlert,
  },
  {
    variant: variants[3],
    title: variants[3],
    description: "This is an informational message to keep you updated.",
    icon: Info,
  },
] as const;

const badgesExamples = variants.map((variant) => {
  return {
    variant,
    title: variant,
    icon:
      variant === "success"
        ? CheckCircle
        : variant === "error"
          ? XCircle
          : variant === "warning"
            ? TriangleAlert
            : Info,
  };
});

export default function AlertExample() {
  return (
    <div className="not-prose mx-auto grid w-[calc(100%-3rem)] gap-5">
      <div className="grid grid-cols-2 gap-2">
        {alertsExamples.map(({ description, icon: Icon, title, variant }) => {
          return (
            <Alert key={`${variant}-${title}`} variant={variant}>
              <Icon />
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
            </Alert>
          );
        })}
      </div>

      <div className="flex gap-2">
        {badgesExamples.map(({ icon: Icon, title, variant }) => {
          return (
            <Badge
              key={`${variant}-${title}`}
              className="px-2 py-1 text-sm shadow-none"
              variant={variant}
            >
              <Icon />
              {title}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
