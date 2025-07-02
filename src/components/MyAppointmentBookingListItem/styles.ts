import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography'; // Import Typography

export default StyleSheet.create({
  bookingCard: {
    backgroundColor: colors.surface, 
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: colors.primary, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderWidth: 1, 
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceName: {
    ...Typography.h2,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: colors.error, 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cancelButtonText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    ...Typography.label2,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border, 
  },
  priceLabel: {
    ...Typography.label2,
    color: colors.textSecondary,
  },
  priceValue: {
    ...Typography.label1,
  },
});
