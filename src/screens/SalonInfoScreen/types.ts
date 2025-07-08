import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

export type TabType = 'Services' | 'Photos' | 'About' | 'Reviews' | 'Specialists';

export type Props = NativeStackScreenProps<RootStackParamList, 'SalonInfo'>;
