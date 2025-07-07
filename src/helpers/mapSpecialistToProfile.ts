import { Specialist } from "../navigation/types";
import { SpecialistProfile } from "../screens/SpecialistProfileScreen/types";
import { generateRandomAvailability } from "../utils/generateRandomAvailability";
import { getSpecialistImage } from "./imageMapper";

export const mapSpecialistToProfile = (specialist: Specialist): SpecialistProfile => {
    return {
      id: specialist.id,
      name: specialist.name,
      rating: specialist.rating,
      profileImage: getSpecialistImage(specialist.imageKey),
      specialty: specialist.specialty,
      experience: parseInt(specialist.experience, 10) || 0,
      reviews: specialist.reviews,
      availability: generateRandomAvailability(),
    };
  };
