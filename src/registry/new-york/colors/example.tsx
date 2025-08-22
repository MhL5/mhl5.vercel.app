"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useState, type ComponentPropsWithoutRef } from "react";

type AlertVariant = NonNullable<
  ComponentPropsWithoutRef<typeof Alert>["variant"]
>;

const alertVariants: AlertVariant[] = [
  "success",
  "error",
  "warning",
  "info",
] as const;

export default function AlertExample() {
  const [selectedVariant, setSelectedVariant] =
    useState<AlertVariant>("success");

  return (
    <div className="not-prose mx-auto grid w-[calc(100%-3rem)] gap-5">
      <div>
        <div className="mb-2.5 text-base font-medium">
          Click to change alert colors
        </div>
        <div className="flex gap-2">
          {alertVariants.map((variant) => {
            const isActive = variant === selectedVariant;
            return (
              <Button
                onClick={() => setSelectedVariant(variant)}
                variant={isActive ? "default" : "secondary"}
                key={variant}
                className="capitalize"
              >
                {variant}
              </Button>
            );
          })}
        </div>
      </div>

      <Alert variant={selectedVariant}>
        <TriangleAlert />
        <AlertTitle className="mb-1.5">Lorem, ipsum dolor.</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas,
          reiciendis.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Badge className="bg-success-background text-success-foreground border-success-border h-7 text-sm">
          Success
        </Badge>
        <Badge className="bg-error-background text-error-foreground border-error-border h-7 text-sm">
          Info
        </Badge>
        <Badge className="bg-info-background text-info-foreground border-info-border h-7 text-sm">
          Warning
        </Badge>
        <Badge className="bg-warning-background text-warning-foreground border-warning-border h-7 text-sm">
          Error
        </Badge>
      </div>
    </div>
  );
}
