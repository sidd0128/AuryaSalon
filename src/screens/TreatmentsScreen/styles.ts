import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  container: { 
    flex: 1 
  },
  content: { 
    flex: 1, 
    flexDirection: 'row' 
  },
  categoryColumn: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    backgroundColor: colors.surface,
  },
  treatmentColumn: { 
    flex: 1, 
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  searchContainer: { 
    paddingTop: 8, 
    paddingBottom: 12 
  },
  genderSelection: { 
    flexDirection: 'row', 
    marginBottom: 12 
  },
  genderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  genderButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  genderButtonText: {
    ...Typography.body,
    color: colors.textSecondary,
  },
  genderButtonTextSelected: {
    ...Typography.body,
    color: colors.primary,
    fontWeight: 'bold',
  },
  divider: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginBottom: 12 
  },
  treatmentList: { 
    flex: 1 
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionHeaderText: { 
    ...Typography.h3,
  },
  treatmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  treatmentDetails: { 
    flex: 1 
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
    marginTop: 2,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  removeButton: {
    backgroundColor: colors.error,
  },
  addButtonText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
  },
  separator: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginLeft: 8 
  },
  sectionSeparator: { 
    height: 1, 
    backgroundColor: colors.border 
  },
});
