import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography';

export const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...Typography.label2,
    color: colors.textSecondary,
  },
  activeTabText: {
    ...Typography.label1,
    color: colors.primary,
  },
  icon: {
    marginBottom: 4,
  },
});
