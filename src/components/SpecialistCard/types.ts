import { Review } from "../../navigation/types";

export interface Specialist {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    experience: string;
    imageKey: string;
    reviews: Review[];
  }