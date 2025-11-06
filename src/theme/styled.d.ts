import "styled-components";
import type { StyledTheme } from "./styled-theme";

declare module "styled-components" {
  export interface DefaultTheme extends StyledTheme {}
}
