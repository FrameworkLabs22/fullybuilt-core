import * as React from "react";
import { tone, type Tone } from "./tone";

/**
 * Notification layer.
 *
 * Reserved for two cases: confirming a blocking write (place / receive / save —
 * where the list behind a busy button gives no feedback that anything happened),
 * and reporting a failure. Not for narrating things the user can already see.
 *
 * `toast()` is callable from anywhere, including outside React. <Toaster /> is
 * mounted once per page and renders the stack.
 */

interface ToastMsg {
  id: number;
  tone: Tone;
  title: string;
  sub?: string;
}

let pushToast: ((t: Omit<ToastMsg, "id">) => void) | null = null;

/** Show a toast. No-ops when no <Toaster /> is mounted. */
export function toast(title: string, opts?: { tone?: Tone; sub?: string }): void {
  pushToast?.({ title, tone: opts?.tone ?? "muted", sub: opts?.sub });
}

/** Fixed bottom-right toast stack. Mount once, alongside <TipLayer />. */
export function Toaster() {
  const [items, setItems] = React.useState<ToastMsg[]>([]);
  React.useEffect(() => {
    let n = 0;
    pushToast = (t) => {
      const id = ++n;
      // Keep the last 4: a burst of writes should not build a wall of toasts.
      setItems((xs) => [...xs.slice(-3), { ...t, id }]);
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 5000);
    };
    return () => {
      pushToast = null;
    };
  }, []);
  if (!items.length) return null;
  return (
    <div className="fb-toaster" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="fb-toast">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: tone(t.tone).fg }} />
          <div className="min-w-0 flex-1">
            <p className="fb-toast-title">{t.title}</p>
            {t.sub && <p className="fb-toast-sub">{t.sub}</p>}
          </div>
          <button
            onClick={() => setItems((xs) => xs.filter((x) => x.id !== t.id))}
            aria-label="Dismiss"
            className="fb-toast-x"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
