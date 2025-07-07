import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../theme';

const { spacing, colors, fontSizes, fonts } = theme;

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width) / 2.5;

export const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    borderRadius: spacing.xs,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    shadowColor: colors.blackHole,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    padding: spacing.md,
  },
  name: {
    fontSize: fontSizes.base,
    fontFamily: fonts.Muli_Bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  specialty: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.Muli,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: spacing.xs,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  star: {
    color: colors.secondary,
    marginRight: spacing.xxs,
    fontSize: fontSizes.xs,
  },
  ratingText: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.Muli,
    color: colors.text,
  },
  experience: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.Muli,
    color: colors.textSecondary,
  },
  dot: {
    color: colors.placeholder,
    marginHorizontal: spacing.xs,
    fontSize: fontSizes.xs,
  },
});
