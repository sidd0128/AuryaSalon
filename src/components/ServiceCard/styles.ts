import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme';

const { width } = Dimensions.get('window');


const { spacing, colors, fontSizes, fonts } = theme;

export const styles = StyleSheet.create({
  serviceItem: {
    width: width / 3 - spacing.sm * 2.5,
    margin: spacing.xs,
  },
  serviceImage: {
    width: '100%',
    height: 100,
    borderRadius: spacing.xs,
  },
  serviceName: {
    fontSize: fontSizes.sm,
    textAlign: 'center',
    marginTop: spacing.xs,
    color: colors.primary,
    fontFamily: fonts.Muli_SemiBold,
  },
});

