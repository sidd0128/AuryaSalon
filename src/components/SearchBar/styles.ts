import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography';

export const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: { 
    marginRight: 8,
  },
  searchInput: { 
    ...Typography.body,
    flex: 1, 
    height: 40, 
    includeFontPadding: false,
  },
});
