import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    ...Typography.h1,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.starlight,
  },
  label: {
    ...Typography.h3,
    marginTop: 12,
  },
  value: {
    ...Typography.body,
    marginBottom: 8,
    color: colors.textSecondary,
  },
  input: {
    ...Typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  dateButton: {
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 6,
    marginTop: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonText: {
    ...Typography.body,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...Typography.h3,
  },
  cardDetail: {
    ...Typography.label2,
    color: colors.textSecondary,
    marginTop: 2,
  },
  slotButton: {
    flex: 1,
    margin: 6,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  slotButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  slotText: {
    ...Typography.label1,
    color: colors.text,
  },
  slotTextSelected: {
    ...Typography.label1,
    color: colors.textOnPrimary,
    fontWeight: '700',
  },
});