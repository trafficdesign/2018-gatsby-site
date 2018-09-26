import { font, track } from "ui/settings";
import { setType } from "ui/mixins";

const label = `
  ${setType("x")};
  display: inline-block;
  font-family: ${font.body};
  letter-spacing: ${track.s};
  text-transform: uppercase;
`;

export default label;
