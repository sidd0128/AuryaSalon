import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    ...Typography.h1,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.body,
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    ...Typography.h2,
    marginBottom: 4,
  },
  itemDetails: {
    ...Typography.label2,
    color: colors.textSecondary,
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    ...Typography.label2,
    color: colors.error,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    ...Typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...Typography.label2,
    color: colors.text,
  },
  summaryPrice: {
    ...Typography.h2,
  },
  couponContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  couponInput: {
    ...Typography.body,
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    marginRight: 12,
    color: colors.text,
  },
  couponApplyButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  couponButtonText: {
    ...Typography.label1,
    color: colors.textOnPrimary,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '48%',
  },
  clearButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.error,
  },
  proceedButton: {
    backgroundColor: colors.primary,
  },
  clearButtonText: {
    ...Typography.label1,
    color: colors.error,
  },
  proceedButtonText: {
    ...Typography.label1,
    color: colors.textOnPrimary,
  },
});