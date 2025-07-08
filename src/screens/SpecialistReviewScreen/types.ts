import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Review, RootStackParamList } from '../../navigation/types';

export interface SpecialistReviewScreenParams {
  reviews: Review[];
}

export interface Props {
  route: {
    params: SpecialistReviewScreenParams;
  };
  navigation: NativeStackNavigationProp<RootStackParamList, 'SpecialistReviewScreen'>;
}