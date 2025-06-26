import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  serviceItem: { width: width / 3 - 20, margin: 4 },
  serviceImage: { width: '100%', height: 100, borderRadius: 8 },
  serviceName: { 
    fontSize: 14, 
    textAlign: 'center', 
    marginTop: 4, 
    color: colors.primary,
  },
});
