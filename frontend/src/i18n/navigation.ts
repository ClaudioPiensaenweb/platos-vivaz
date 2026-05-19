import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
import type { ComponentProps } from "react";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

/** Union of all valid href values accepted by the typed Link component. */
export type AppHref = ComponentProps<typeof Link>["href"];
