"use client";

import * as React from "react";
import { useDemoDialog } from "@/components/marketing/demo-dialog";
import { isDemoCooldownActive } from "@/lib/leads";

export function AutoDemoPopup() {
  const { open } = useDemoDialog();

  React.useEffect(() => {
    if (!isDemoCooldownActive()) open();
  }, [open]);

  return null;
}
