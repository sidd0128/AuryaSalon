import { StyleSheet } from 'react-native';
import theme from '../../theme';
import Typography from '../../theme/typography';

const { colors, spacing, fontSizes } = theme;

export const styles = StyleSheet.create({
  ratingSection: {
    marginBottom: spacing.md,
  },

  commentSection: {
    marginBottom: spacing.md,
  },

  label: {
    ...Typography.label1,
    marginBottom: spacing.xs,
  },

  commentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    padding: spacing.md,
    textAlignVertical: 'top',
    fontSize: fontSizes.base,
    color: colors.text,
    backgroundColor: colors.surface,
    fontFamily: theme.fonts.Muli,
    lineHeight: 22,
  },

  placeholderColor: {
    color: colors.placeholder,
  },

  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButtonText: {
    ...Typography.label1,
    color: colors.textOnPrimary,
  },
});
