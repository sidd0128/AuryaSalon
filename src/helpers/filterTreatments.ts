import { TreatmentCategory } from '../navigation/types';

export const filterTreatmentsBySearch = (
  treatments: TreatmentCategory[],
  searchText: string
): TreatmentCategory[] => {
  const lowerText = searchText.trim().toLowerCase();

  return treatments
    .map((category) => {
      const filteredServices = category.services.filter((service) =>
        service.name.toLowerCase().includes(lowerText)
      );

      return {
        ...category,
        services: filteredServices,
        count: filteredServices.length,
      };
    })
    .filter((category) => category.services.length > 0);
};
