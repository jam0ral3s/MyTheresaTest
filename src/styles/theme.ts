import {BASIC_COLORS, ColorTheme} from './colors';
import {BASIC_FONTS, FontTheme} from './font';
import {BASIC_SIZES, DefaultSizes} from './sizes';

export type CustomTheme = {
  color: ColorTheme;
  size: DefaultSizes;
  font: FontTheme;
};

export const BAISC_THEME: CustomTheme = {
  color: BASIC_COLORS,
  size: BASIC_SIZES,
  font: BASIC_FONTS,
};
