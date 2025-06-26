import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontWeight: '600', marginBottom: 4, color: colors.primary },
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
    color: colors.primary,
  },
  selectedText: {
    color: '#fff',
  },
  unisexToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  unisexText: {
    marginLeft: 8,
    color: colors.primary,
  },
  resetButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
