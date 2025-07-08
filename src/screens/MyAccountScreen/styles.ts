import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingBottom: 32,
  },
  userSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitialsText: {
    ...Typography.h2,
    color: colors.textOnPrimary,
  },
  userName: {
    ...Typography.h3,
  },
  editText: {
    ...Typography.label2,
    color: colors.primary,
  },
  savingsBanner: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  savingsText: {
    ...Typography.label2,
    color: colors.textOnPrimary,
  },
  sectionTitle: {
    ...Typography.h3,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  versionText: {
    ...Typography.caption1,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
});
