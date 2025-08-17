"use client";

import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/items/alert/alert";
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
  "default",
  "destructive",
] as const;

export default function AlertExample() {
  const [selectedVariant, setSelectedVariant] =
    useState<AlertVariant>("success");

  return (
    <div className="not-prose mx-auto grid w-[calc(100%-3rem)] gap-5">
      <div>
        <div className="mb-2.5 text-base font-medium">
          Click to Change Variant
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
    </div>
  );
}
