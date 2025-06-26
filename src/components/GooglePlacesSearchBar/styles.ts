import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    maxHeight: 300 
  },
  input: {
    height: 42,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  list: {
    marginTop: 4,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.surface,
    maxHeight: 200,
  },
  item: {
    padding: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  selectedItem: {
    backgroundColor: colors.primary + '40',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  itemText: {
    color: colors.text,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: '600',
  },
  errorContainer: {
    padding: 8,
    backgroundColor: colors.error + '20',
    marginTop: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  },
});
