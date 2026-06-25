import { createContext } from "react";

/**
 * Render variant for KPIs. "tile" is the standard hero card; "strip" is the
 * compact cell used inside <KpiStrip> for overflow KPIs. Provided via context
 * so widget render() functions don't need to know which variant they're in.
 *
 * Kept in its own module (no component exports) so KpiTile/KpiStrip stay
 * fast-refresh friendly.
 */
export const KpiVariantContext = createContext<"tile" | "strip">("tile");
