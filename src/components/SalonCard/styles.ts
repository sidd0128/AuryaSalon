import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

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
    color: colors.textOnPrimary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  details: {
    padding: 12,
    position: 'relative',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: colors.text,
  },
  location: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  dot: {
    fontSize: 13,
    color: colors.textSecondary,
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
    color: colors.primary,
    fontSize: 14,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 13,
    color: colors.text,
  },
});
