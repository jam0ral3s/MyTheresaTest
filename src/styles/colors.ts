export type ColorTheme = {
  name: string;
  basic: {
    text: string;
    bold: string;
    border: string;
    background: string;
    foreground: string;
  };
};

export const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#2E2C30',
  LIGHT_GRAY: '#ececec',
  DARK_GRAY: '#232223',
};

export const LIGHT_COLORS: ColorTheme = {
  name: 'light',
  basic: {
    text: COLORS.BLACK,
    bold: COLORS.DARK_GRAY,
    border: COLORS.LIGHT_GRAY,
    background: COLORS.LIGHT_GRAY,
    foreground: COLORS.WHITE,
  },
};

export const DARK_COLORS: ColorTheme = {
  name: 'dark',
  basic: {
    text: COLORS.WHITE,
    bold: COLORS.LIGHT_GRAY,
    border: COLORS.GRAY,
    background: COLORS.DARK_GRAY,
    foreground: COLORS.GRAY,
  },
};
