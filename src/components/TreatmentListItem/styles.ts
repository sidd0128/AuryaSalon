import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

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
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: colors.text,
  },
  treatmentPrice: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  treatmentDuration: {
    fontSize: 12,
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
    color: colors.textOnPrimary,
    fontWeight: 'bold',
    fontSize: 12,
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
    color: colors.textOnPrimary,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});