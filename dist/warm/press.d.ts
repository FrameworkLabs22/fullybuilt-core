/** Buttons / pills / small controls — 3% press. */
declare const pressable = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-[0.97]";
/** Large surfaces (cards) — gentler 1.5% press so big elements don't jump. */
declare const pressableSoft = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-[0.985]";

export { pressable, pressableSoft };
