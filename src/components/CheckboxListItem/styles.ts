import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.surface,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  selectedLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});
