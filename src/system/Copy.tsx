import * as React from "react";
import { Check, CopySimple } from "@phosphor-icons/react";

/**
 * Hover-revealed copy button. Invisible until its host `.fb-row` is hovered or it
 * receives keyboard focus — the affordance is there when wanted and silent
 * otherwise, which matters in a table where every row would otherwise carry one.
 *
 * Confirms in place (check, 1.5s) rather than firing a toast: the user is looking
 * at the thing they clicked, and a notification for a copy is noise.
 */
export function Copy({ text, label = "Copy" }: { text: string; label?: string }) {
  const [ok, setOk] = React.useState(false);
  return (
    <button
      className={`fb-copy${ok ? " on" : ""}`}
      title={ok ? "Copied" : label}
      aria-label={label}
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        } catch {
          // Clipboard unavailable (denied permission, or an insecure context).
          // Nothing to recover: the tag simply does not confirm.
        }
      }}
    >
      {ok ? <Check size={11} weight="bold" /> : <CopySimple size={11} />}
    </button>
  );
}
