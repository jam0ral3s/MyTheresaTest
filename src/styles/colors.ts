export type ColorTheme = {
  basic: {
    normal: string;
    bold: string;
    border: string;
    background: {primary: string; secondary: string};
  };
};

export const COLORS = {
  WHITE: '#FFFFFF',
  GRAY: '#000000',
  DARK_GRAY: '#1D2026',
  LIGHT_GRAY: '#D7DCE4',
};

export const BASIC_COLORS: ColorTheme = {
  basic: {
    normal: COLORS.GRAY,
    bold: COLORS.DARK_GRAY,
    border: COLORS.LIGHT_GRAY,
    background: {primary: COLORS.WHITE, secondary: COLORS.GRAY},
  },
};
