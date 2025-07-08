import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  scrollContent: { paddingBottom: 40 },
  label: {
    ...Typography.h3,
    marginBottom: 8,
    marginTop: 16,
  },
  genderSelection: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: colors.primary,
  },
  genderButtonText: {
    ...Typography.body,
    color: colors.textSecondary,
  },
  genderButtonTextSelected: {
    ...Typography.body,
    color: colors.textOnPrimary,
    fontWeight: 'bold',
  },
  ratingSection: {
    marginTop: 24,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  commentSection: { marginTop: 16 },
  commentInput: {
    ...Typography.body,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    color: colors.text,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    ...Typography.h2,
    color: colors.textOnPrimary,
  },
  pickerHeader: {
    ...Typography.h2,
    padding: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    color: colors.text,
  },
  pickerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerItemText: {
    ...Typography.body,
    color: colors.text,
  },
  emptyText: {
    ...Typography.label2,
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  genderHeader: {
    ...Typography.label1,
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.text,
    marginTop: 10,
    marginBottom: 4,
  },
  selectedServicesContainer: {
    marginTop: 16,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedServiceText: {
    ...Typography.label2,
    color: colors.text,
  },
});
