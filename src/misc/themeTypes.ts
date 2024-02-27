import { Dispatch, SetStateAction } from "react";

export type ThemeContextType = {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
};
