import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../theme/Typography';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    height: 160,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.primary + 'CC',
    paddingVertical: 6,
    alignItems: 'center',
  },
  bannerText: {
    ...Typography.label2,
    color: colors.textOnPrimary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  details: {
    padding: 12,
    position: 'relative',
  },
  name: {
    ...Typography.h3,
    marginBottom: 4,
  },
  location: {
    ...Typography.body,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...Typography.label2,
    color: colors.textSecondary,
    fontSize: 13,
  },
  dot: {
    ...Typography.label2,
    color: colors.textSecondary,
    fontSize: 13,
    marginHorizontal: 6,
  },
  ratingBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: colors.primary + '40',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  star: {
    ...Typography.label2,
    color: colors.primary,
    fontSize: 14,
  },
  ratingText: {
    ...Typography.label2,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
