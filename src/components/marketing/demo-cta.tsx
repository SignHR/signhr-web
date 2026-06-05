"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useDemoDialog } from "@/components/marketing/demo-dialog";

interface DemoCtaProps extends ButtonProps {
  plan?: string;
}

export function DemoCta({ plan, onClick, children, ...props }: DemoCtaProps) {
  const { open } = useDemoDialog();
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        open(plan);
      }}
    >
      {children}
    </Button>
  );
}
