import { font } from "ui/settings";
import { setSpace, setType } from "ui/mixins";

const h1 = `
  ${setType("h")};
  ${setSpace("mvs")};
  display: block;
  font-family: ${font.digrotesk};
  font-weight: 600;
`;

export default h1;
