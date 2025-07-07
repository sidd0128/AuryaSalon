import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 10,
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

