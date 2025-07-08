import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingTop: 10,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  brandFrame: {
    height: height * 0.35,
    overflow: 'hidden',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  brandImage: {
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: colors.surface,
  },
  heading: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.surface,
    marginBottom: 20,
    height: 52,
  },
  countryCode: {
    ...Typography.body,
    marginRight: 10,
  },
  input: {
    ...Typography.body,
    flex: 1,
    letterSpacing: 0.5,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    ...Typography.h2,
    color: colors.textOnPrimary,
  },
  termsText: {
    ...Typography.caption1,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  link: {
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  supportText: {
    ...Typography.caption1,
    textAlign: 'center',
    marginBottom: 8,
  },
  guestText: {
    ...Typography.label2,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 10,
  },
});
