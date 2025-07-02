import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography'; // Import Typography

export const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    ...Typography.label1,
    color: colors.primary, // Override for primary color
    marginBottom: 4,
  },
  optionsRow: { flexDirection: 'row', marginBottom: 8 },
  option: {
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: colors.surface,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    ...Typography.body,
    color: colors.primary,
  },
  selectedText: {
    ...Typography.label1,
    color: '#fff',
  },
  unisexToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  unisexText: {
    ...Typography.body,
    color: colors.primary,
    marginLeft: 8,
  },
  resetButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  resetButtonText: {
    ...Typography.label1,
    color: '#fff',
  },
});
