import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  bubble: {
    margin: 8,
    padding: 10,
    borderRadius: 12,
    maxWidth: '70%',
  },
  user: {
    backgroundColor: colors.tertiary,
    alignSelf: 'flex-end',
  },
  salon: {
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
  },
  text: {
    ...Typography.body,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 4,
  },
});
