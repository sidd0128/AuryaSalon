import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: colors.primary,
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
