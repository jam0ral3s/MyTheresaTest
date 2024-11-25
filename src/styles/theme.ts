import {ColorTheme, DARK_COLORS, LIGHT_COLORS} from './colors';
import {BASIC_FONTS, FontTheme} from './font';
import {BASIC_SIZES, DefaultSizes} from './sizes';

export type CustomTheme = {
  color: ColorTheme;
  size: DefaultSizes;
  font: FontTheme;
};

export const LIGHT_THEME: CustomTheme = {
  color: LIGHT_COLORS,
  size: BASIC_SIZES,
  font: BASIC_FONTS,
};

export const DARK_THEME: CustomTheme = {
  color: DARK_COLORS,
  size: BASIC_SIZES,
  font: BASIC_FONTS,
};
