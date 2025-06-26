import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface, 
  },
  navItem: { 
    alignItems: 'center',
  },
  navText: { 
    fontSize: 12, 
    color: colors.textSecondary,
  },
});
