import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export default StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,  
  },
  sectionHeaderText: { 
    ...Typography.h3,
  },
  separator: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginLeft: 8,
  },
  sectionSeparator: { 
    height: 1, 
    backgroundColor: colors.border, 
  },
});
