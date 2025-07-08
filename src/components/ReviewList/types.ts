import { Review } from '../../navigation/types';

export interface ReviewListProps {
  reviews: Review[];
  title?: string;
  limit?: number; // Optional max reviews to show before "View More"
}
