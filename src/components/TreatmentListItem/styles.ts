import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export default StyleSheet.create({
  treatmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  treatmentDetails: {
    flex: 1,
  },
  treatmentName: {
    ...Typography.label2,
    marginBottom: 4,
  },
  treatmentPrice: {
    ...Typography.caption2,
    color: colors.textSecondary,
  },
  treatmentDuration: {
    ...Typography.caption2,
    color: colors.textSecondary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: 80,
  },
  addButtonText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: 80,
  },
  removeButtonText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
});
