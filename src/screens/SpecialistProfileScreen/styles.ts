import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme';

const { colors, spacing, fonts, fontSizes } = theme;
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  },

  profileImageContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  reviewsSection: {
    marginBottom: spacing.lg,
  },

  reviewsList: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
  },

  reviewCard: {
    width: screenWidth * 0.7,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginRight: spacing.md,
    shadowColor: colors.blackHole,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  reviewName: {
    fontFamily: fonts.Muli_Bold,
    fontSize: fontSizes.sm,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  reviewRating: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },

  reviewComment: {
    fontFamily: fonts.Muli,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },

  specialtyCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: colors.blackHole,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  specialtyText: {
    fontFamily: fonts.Muli_SemiBold,
    fontSize: fontSizes.lg,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  experienceText: {
    fontFamily: fonts.Muli,
    fontSize: fontSizes.base,
    color: colors.textSecondary,
  },

  

  availabilityTitle: {
    fontFamily: fonts.Muli_Bold,
    fontSize: fontSizes.lg,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  timeSlotList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  timeSlotItem: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    minWidth: '48%',
  },

  timeSlotText: {
    fontFamily: fonts.Muli,
    fontSize: fontSizes.sm,
    color: colors.textOnSecondary,
    textAlign: 'center',
  },
});
