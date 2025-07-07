import { ImageSourcePropType } from "react-native";
import { Review } from "../../navigation/types";

  
export interface TimeSlot {
    id: string;
    date: string;
    time: string;
  }
  
  export interface SpecialistProfile {
    id: string;
    name: string;
    rating: number;
    profileImage: ImageSourcePropType;
    specialty: string;
    experience: number;
    reviews: Review[];
    availability: TimeSlot[];
  }
  