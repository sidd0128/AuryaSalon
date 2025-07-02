import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border, 
  },
  details: { 
    flex: 1 
  },
  name: { 
    ...Typography.body,
  },
  price: { 
    ...Typography.label2,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addButton: { 
    backgroundColor: colors.primary, 
    padding: 8, 
    borderRadius: 8,
    minWidth: 60,
  },
  addText: { 
    ...Typography.label1,
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
});
