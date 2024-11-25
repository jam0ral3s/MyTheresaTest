import {TextStyle} from 'react-native';

export type FontTheme = {
  regular44: FontDetails;
  regular22: FontDetails;
  regular16: FontDetails;
  monospace16: FontDetails;
  serif18: FontDetails;
};

export enum FontType {
  FONT_44_REGULAR,
  FONT_22_REGULAR,
  FONT_16_REGULAR,
  FONT_16_MONO,
  FONT_18_SERIF,
}

export type FontDetails = Required<
  Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>
> &
  Pick<TextStyle, 'textTransform'>;

export const fontDetails: Record<FontType, FontDetails> = {
  [FontType.FONT_44_REGULAR]: {
    fontFamily: 'system',
    fontSize: 44,
    lineHeight: 20,
  },
  [FontType.FONT_22_REGULAR]: {
    fontFamily: 'system',
    fontSize: 22,
    lineHeight: 20,
  },
  [FontType.FONT_16_REGULAR]: {
    fontFamily: 'system',
    fontSize: 16,
    lineHeight: 20,
  },
  [FontType.FONT_16_MONO]: {
    fontFamily: 'monospace',
    fontSize: 16,
    lineHeight: 20,
  },
  [FontType.FONT_18_SERIF]: {
    fontFamily: 'serif',
    fontSize: 18,
    lineHeight: 20,
  },
};

export const BASIC_FONTS: FontTheme = {
  regular44: fontDetails[FontType.FONT_44_REGULAR],
  regular22: fontDetails[FontType.FONT_22_REGULAR],
  regular16: fontDetails[FontType.FONT_16_REGULAR],
  monospace16: fontDetails[FontType.FONT_16_MONO],
  serif18: fontDetails[FontType.FONT_18_SERIF],
};
