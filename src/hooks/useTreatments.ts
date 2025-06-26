import { useState, useEffect } from 'react';
import { TreatmentCategory, Service } from '../navigation/types';
import dummyServices from '../data/dummyServices';

export const useTreatments = (
  selectedCategory: Service | null,
  selectedGender: 'men' | 'women'
) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [treatments, setTreatments] = useState<TreatmentCategory[]>([]);

  useEffect(() => {
    if (!selectedCategory) return;

    const categoryTreatments = dummyServices[selectedCategory.name]?.[selectedGender] || [];

    setTreatments(categoryTreatments);

    const initialExpanded = categoryTreatments.reduce((acc, item) => {
      acc[item.category] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedCategories(initialExpanded);
  }, [selectedCategory, selectedGender]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return { treatments, expandedCategories, toggleCategory };
};
