import { useMemo } from "react";
import { ColorValue, useColorScheme } from "react-native";
export type Styles = {
  colors: {
    isDark: boolean;
    text: ColorValue;
    card: ColorValue;
    background: ColorValue;
    border: ColorValue;
  };
  spacing: typeof spacingSizes;
};
const spacing = 14;
export const spacingSizes = {
  xs: spacing * 0.6,
  s: spacing * 0.8,
  m: spacing,
  l: spacing * 1.4,
  xl: spacing * 1.8
};
const theme: Record<string, Styles["colors"]> = {
  light: {
    isDark: false,
    text: "#000",
    card: "#f5f5f7",
    background: "#FFFFFF",
    border: "#efeff4",
  },
  dark: {
    isDark: true,
    text: "#fff",
    card: "#000000",
    background: "#161618",
    border: "#212124",
  },
};

export default function useStyles() {
  const colorScheme = useColorScheme() || "light";
  const styles: Styles = useMemo(() => {
    return {
      colors: { ...theme[colorScheme] },
      spacing: spacingSizes,
    };
  }, [colorScheme]);

  return styles;
}
