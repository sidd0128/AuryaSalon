import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...Typography.h2,
    textAlign: 'center',
    flex: 1,
  },
  currentLocationButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  currentLocationText: {
    ...Typography.label1,
    color: colors.textOnPrimary,
  },
  currentLocationSubText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
  },
  disabledButton: {
    opacity: 0.7,
  },
  recentSearchesTitle: {
    ...Typography.h3,
    marginBottom: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  recentText: {
    ...Typography.label2,
    marginLeft: 8,
  },
});
