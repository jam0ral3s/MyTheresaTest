export type SizesTheme = {
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export type DefaultSizes = {
  spacing: SizesTheme;
};

const spacing: DefaultSizes['spacing'] = {
  xxs: 8,
  xs: 14,
  s: 16,
  m: 20,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const BASIC_SIZES: DefaultSizes = {
  spacing,
};
