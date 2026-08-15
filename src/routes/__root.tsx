import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-xl text-7xl">404</h1>
        <h2 className="mt-4 text-sm uppercase tracking-[0.24em] text-muted-foreground">Page not found</h2>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-80"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl uppercase tracking-[-0.02em]">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-80"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VOLTWRLD — Precision Grips & Components" },
      {
        name: "description",
        content: "VOLTWRLD builds premium monochrome grips, accessories and components for riders.",
      },
      { property: "og:title", content: "VOLTWRLD — Precision Grips & Components" },
      {
        property: "og:description",
        content: "VOLTWRLD builds premium monochrome grips, accessories and components for riders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppFrame() {
  useCartSync();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppFrame />
    </QueryClientProvider>
  );
}
