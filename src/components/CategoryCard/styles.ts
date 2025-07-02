import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography';

export const styles = StyleSheet.create({
  container: { 
    marginBottom: 16, 
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  categoryImage: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryName: { 
    ...Typography.h3,
    flex: 1,
  },
  expandIcon: {
    marginLeft: 8,
  },
});
