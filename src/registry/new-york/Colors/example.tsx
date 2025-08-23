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

      <div className="flex gap-2">
        <Button className="bg-success-background text-success-foreground hover:bg-success-background/80 border-success-border border">
          Success
        </Button>
        <Button className="bg-error-background text-error-foreground hover:bg-error-background/80 border-error-border border">
          Error
        </Button>
        <Button className="bg-info-background text-info-foreground hover:bg-info-background/80 border-info-border border">
          Info
        </Button>
        <Button className="bg-warning-background text-warning-foreground hover:bg-warning-background/80 border-warning-border border">
          Warning
        </Button>
      </div>
    </div>
  );
}
