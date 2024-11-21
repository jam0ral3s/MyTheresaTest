import {TextStyle} from 'react-native';

export type FontTheme = {
  regular44: FontDetails;
  regular22: FontDetails;
  regular16: FontDetails;
};

export enum FontType {
  FONT_44_REGULAR,
  FONT_22_REGULAR,
  FONT_16_REGULAR,
}

export type FontDetails = Required<Pick<TextStyle, 'fontSize' | 'lineHeight'>> &
  Pick<TextStyle, 'textTransform'>;

export const fontDetails: Record<FontType, FontDetails> = {
  [FontType.FONT_44_REGULAR]: {
    fontSize: 44,
    lineHeight: 20,
  },
  [FontType.FONT_22_REGULAR]: {
    fontSize: 22,
    lineHeight: 20,
  },
  [FontType.FONT_16_REGULAR]: {
    fontSize: 16,
    lineHeight: 20,
  },
};

export const BASIC_FONTS: FontTheme = {
  regular44: fontDetails[FontType.FONT_44_REGULAR],
  regular22: fontDetails[FontType.FONT_22_REGULAR],
  regular16: fontDetails[FontType.FONT_16_REGULAR],
};
