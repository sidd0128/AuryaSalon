import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography';

export const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...Typography.link,
    marginLeft: 4,
    maxWidth: 150,
  },
  titleText: {
    ...Typography.h2,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  leftButton: {
    padding: 8,
  },
  leftPlaceholder: {
    width: 48,
  },
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    ...Typography.bottomNavActive,
    color: colors.textOnPrimary,
  },
});
