import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  title: {
    ...Typography.h1,
    marginTop: 12,
  },
  location: {
    ...Typography.body,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    ...Typography.label2,
    color: colors.error,
    marginRight: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 12,
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    gap: 6,
  },
  offerTitle: {
    ...Typography.h2,
    marginBottom: 8,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: '100%',
  },
  offerText: {
    ...Typography.label2,
    color: colors.text,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 12,
  },
  tabScrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...Typography.h2,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  aboutText: {
    ...Typography.label2,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  amenityText: {
    ...Typography.label2,
    marginBottom: 4,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  bookButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  buttonText: {
    ...Typography.label1,
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
  floatingChatButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
