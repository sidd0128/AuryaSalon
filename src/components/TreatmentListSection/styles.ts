import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

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
    fontSize: 16, 
    fontWeight: 'bold',
    color: colors.text, 
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
