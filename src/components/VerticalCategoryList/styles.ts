import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  item: {
    marginBottom: 16,
    alignItems: 'center',
    width: 80,
  },
  activeItem: {
    backgroundColor: colors.primary + '20',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    ...Typography.caption1,
    textAlign: 'center',
  },
});

export default styles;
