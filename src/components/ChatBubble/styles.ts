import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

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
    fontSize: 16,
    color: colors.text,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 4,
  },
});
