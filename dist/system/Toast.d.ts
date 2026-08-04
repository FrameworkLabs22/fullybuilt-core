import * as React from 'react';
import { Tone } from './tone.js';

/** Show a toast. No-ops when no <Toaster /> is mounted. */
declare function toast(title: string, opts?: {
    tone?: Tone;
    sub?: string;
}): void;
/** Fixed bottom-right toast stack. Mount once, alongside <TipLayer />. */
declare function Toaster(): React.JSX.Element | null;

export { Toaster, toast };
