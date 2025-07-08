import { StyleSheet } from 'react-native';
import theme from '../../theme';
import Typography from '../../theme/typography';

const { colors, spacing } = theme;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: spacing.lg,
  },
  heading: {
    ...Typography.h2,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  emptyText: {
    ...Typography.label2,
    textAlign: 'center',
    color: colors.textSecondary,
    paddingVertical: spacing.xl,
  },
  viewMoreButton: {
    alignSelf: 'flex-start',
    marginLeft: spacing.md,
    marginTop: spacing.xs,
  },
  viewMoreText: {
    ...Typography.link,
  },
});
