const BASE = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100";
const pressable = `${BASE} active:scale-[0.97]`;
const pressableSoft = `${BASE} active:scale-[0.985]`;
export {
  pressable,
  pressableSoft
};
//# sourceMappingURL=press.js.map