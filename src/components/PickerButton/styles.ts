import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...Typography.h3,
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
  valueText: {
    ...Typography.body,
  },
  placeholderText: {
    ...Typography.body,
    color: colors.placeholder,
  },
});
