import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  title: {
    ...Typography.body,
    color: colors.primary,
    flex: 1,
    marginLeft: 12,
  },
  imageIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  customIconContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
});
