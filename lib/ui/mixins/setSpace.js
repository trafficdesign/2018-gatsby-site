import { space } from "../settings";
import _fluidify from "./_fluidify";

/* eslint import/prefer-default-export: 0 */
export const setSpace = (args, force) => {
  const prop = args.substr(0, 1);
  const pos = args.substr(1, 1);
  const size = args.substr(2, 1);
  const properties = {
    b: "border-width",
    m: "margin",
    p: "padding"
  };
  const positions = {
    t: "top",
    b: "bottom",
    l: "left",
    r: "right"
  };
  const isImportant = force === "force";
  switch (pos) {
    case "a":
      return _fluidify(
        `${properties[prop]}`,
        space[size][0],
        space[size][1],
        isImportant
      );
    case "h":
      return _fluidify(
        [`${properties[prop]}-left`, `${properties[prop]}-right`],
        space[size][0],
        space[size][1],
        isImportant
      );
    case "v":
      return _fluidify(
        [`${properties[prop]}-top`, `${properties[prop]}-bottom`],
        space[size][0],
        space[size][1],
        isImportant
      );
    default:
      return _fluidify(
        `${properties[prop]}-${positions[pos]}`,
        space[size][0],
        space[size][1],
        isImportant
      );
  }
};
