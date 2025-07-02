import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography'; // Import Typography

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
    ...Typography.body,
    marginLeft: 12,
    flex: 1,
  },
  selectedLabel: {
    ...Typography.link,
  },
});
