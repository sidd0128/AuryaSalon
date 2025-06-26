import generateId from "../helpers/generateId";

export const buildReviewPayload = ({
    selectedSalon,
    selectedCategory,
    selectedServices,
    allServicesForCategory,
    rating,
    comment,
  }: {
    selectedSalon: any;
    selectedCategory: any;
    selectedServices: string[];
    allServicesForCategory: any[];
    rating: number;
    comment: string;
  }) => ({
    id: generateId(),
    salonId: selectedSalon.id,
    salonName: selectedSalon.name,
    categoryName: selectedCategory.name,
    services: allServicesForCategory
      .filter(s => selectedServices.includes(s.id))
      .map(s => ({ id: s.id, name: s.name })),
    rating,
    comment: comment.trim(),
    timestamp: Date.now(),
    userName: 'Customer Review',
    image: require('../assets/images/profile.png'),
  });
  