import type { ReactElement } from 'react';

/**
 * Streaming fallback for the authenticated app. The root layout reads Supabase
 * config at request time (see docs/adr/0001), which makes routes render
 * per-request; this skeleton hides that latency behind an instant placeholder
 * while the page content streams in. The `(main)` layout (nav) stays mounted.
 */
export default function Loading(): ReactElement {
  return (
    <div role="status" className="w-full">
      <span className="sr-only">Loading…</span>
      <div className="animate-pulse" aria-hidden="true">
        <div className="bg-grey-100 mb-8 h-9 w-40 rounded-lg" />
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="bg-grey-100 h-28 flex-1 rounded-lg" />
          <div className="bg-grey-100 h-28 flex-1 rounded-lg" />
          <div className="bg-grey-100 h-28 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
