import { useState, useEffect } from 'react';
import { Salon } from '../navigation/types';

type PriceRange = 'low' | 'medium' | 'high' | null;

export const useSalonFilters = (salons: Salon[], searchText: string) => {
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [onlyUnisex, setOnlyUnisex] = useState(false);
  const [filteredSalons, setFilteredSalons] = useState<Salon[]>([]);

  useEffect(() => {
    let filtered = [...salons];

    // Filter by search text in salon name or services' names (optional: extend if needed)
    if (searchText.trim() !== '') {
      filtered = filtered.filter((salon) =>
        salon.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by minimum rating
    if (minRating !== null) {
      filtered = filtered.filter((salon) => salon.rating >= minRating);
    }

    // Filter by price range - note: your salon has `priceLevel`, not `price`
    if (priceRange !== null) {
      filtered = filtered.filter((salon) => salon.priceLevel === priceRange);
    }

    // Filter by unisex only
    if (onlyUnisex) {
      filtered = filtered.filter((salon) => salon.isUnisex);
    }

    setFilteredSalons(filtered);
  }, [salons, searchText, minRating, priceRange, onlyUnisex]);

  // Reset filters helper function
  const resetFilters = () => {
    setMinRating(null);
    setPriceRange(null);
    setOnlyUnisex(false);
  };

  return {
    minRating,
    priceRange,
    onlyUnisex,
    setMinRating,
    setPriceRange,
    setOnlyUnisex,
    filteredSalons,
    resetFilters,
  };
};
