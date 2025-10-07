"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function AlertExample() {
  return (
    <div className="not-prose mx-auto grid w-[calc(100%-3rem)] gap-5">
      <div className="grid grid-cols-2 gap-2">
        <Alert variant="success">
          <TriangleAlert />
          <AlertTitle className="mb-1.5">Lorem, ipsum dolor.</AlertTitle>
          <AlertDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </AlertDescription>
        </Alert>
        <Alert variant="error">
          <TriangleAlert />
          <AlertTitle className="mb-1.5">Lorem, ipsum dolor.</AlertTitle>
          <AlertDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <TriangleAlert />
          <AlertTitle className="mb-1.5">Lorem, ipsum dolor.</AlertTitle>
          <AlertDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </AlertDescription>
        </Alert>
        <Alert variant="info">
          <TriangleAlert />
          <AlertTitle className="mb-1.5">Lorem, ipsum dolor.</AlertTitle>
          <AlertDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex gap-2">
        <Badge className="h-7 border-success-border bg-success-background text-sm text-success-foreground">
          Success
        </Badge>
        <Badge className="h-7 border-error-border bg-error-background text-error-foreground text-sm">
          Info
        </Badge>
        <Badge className="h-7 border-info-border bg-info-background text-info-foreground text-sm">
          Warning
        </Badge>
        <Badge className="h-7 border-warning-border bg-warning-background text-sm text-warning-foreground">
          Error
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button className="border border-success-border bg-success-background text-success-foreground hover:bg-success-background/80">
          Success
        </Button>
        <Button className="border border-error-border bg-error-background text-error-foreground hover:bg-error-background/80">
          Error
        </Button>
        <Button className="border border-info-border bg-info-background text-info-foreground hover:bg-info-background/80">
          Info
        </Button>
        <Button className="border border-warning-border bg-warning-background text-warning-foreground hover:bg-warning-background/80">
          Warning
        </Button>
      </div>
    </div>
  );
}
