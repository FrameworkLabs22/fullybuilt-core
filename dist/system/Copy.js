import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Check, CopySimple } from "@phosphor-icons/react";
function Copy({ text, label = "Copy" }) {
  const [ok, setOk] = React.useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `fb-copy${ok ? " on" : ""}`,
      title: ok ? "Copied" : label,
      "aria-label": label,
      onClick: async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        } catch {
        }
      },
      children: ok ? /* @__PURE__ */ jsx(Check, { size: 11, weight: "bold" }) : /* @__PURE__ */ jsx(CopySimple, { size: 11 })
    }
  );
}
export {
  Copy
};
//# sourceMappingURL=Copy.js.map