import { TextStyle } from "react-native";
import theme from './index';

const { colors, fontSizes, fonts } = theme;


type Tags =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "label1"
  | "label2"
  | "callout"
  | "caption1"
  | "caption2"
  | "link"
  | "bottomNavActive"
  | "bottomNavInactive";

export type TypographyStyles = Required<
  Pick<TextStyle, "color" | "fontFamily" | "fontSize" | "letterSpacing" | "lineHeight">
>;

type TTypography = {
  [tag in Tags]: TypographyStyles;
};

const Typography: TTypography = {
  h1: {
    color: colors.text,
    fontFamily: fonts.Muli_SemiBold,
    fontSize: fontSizes.xxl,
    letterSpacing: 0.23,
    lineHeight: 48,
  },
  h2: {
    color: colors.text,
    fontFamily: fonts.Muli_SemiBold,
    fontSize: fontSizes.xl,
    letterSpacing: 0.17,
    lineHeight: 36,
  },
  h3: {
    color: colors.text,
    fontFamily: fonts.Muli_Bold,
    fontSize: fontSizes.lg,
    letterSpacing: 0.13,
    lineHeight: 26,
  },
  body: {
    color: colors.text,
    fontFamily: fonts.Muli,
    fontSize: fontSizes.base,
    letterSpacing: 0.11,
    lineHeight: 24,
  },
  label1: {
    color: colors.text,
    fontFamily: fonts.Muli_Bold,
    fontSize: fontSizes.base,
    letterSpacing: 0.11,
    lineHeight: 24,
  },
  label2: {
    color: colors.text,
    fontFamily: fonts.Muli_SemiBold,
    fontSize: fontSizes.sm,
    letterSpacing: 0.1,
    lineHeight: 18,
  },
  callout: {
    color: colors.text,
    fontFamily: fonts.Muli,
    fontSize: fontSizes.sm,
    letterSpacing: 0.1,
    lineHeight: 18,
  },
  caption1: {
    color: colors.text,
    fontFamily: fonts.Muli_Bold,
    fontSize: fontSizes.xs,
    letterSpacing: 0.09,
    lineHeight: 16,
  },
  caption2: {
    color: colors.text,
    fontFamily: fonts.Muli,
    fontSize: fontSizes.xs,
    letterSpacing: 0.09,
    lineHeight: 16,
  },
  link: {
    color: colors.primary,
    fontFamily: fonts.Muli_Bold,
    fontSize: fontSizes.sm,
    letterSpacing: 0.09,
    lineHeight: 18,
  },
  bottomNavActive: {
    color: colors.primary,
    fontFamily: fonts.Muli_Bold,
    fontSize: fontSizes.xxs,
    letterSpacing: 0.086,
    lineHeight: 13,
  },
  bottomNavInactive: {
    color: colors.textSecondary,
    fontFamily: fonts.Muli,
    fontSize: fontSizes.xxs,
    letterSpacing: 0.086,
    lineHeight: 13,
  },
};

export default Typography;
