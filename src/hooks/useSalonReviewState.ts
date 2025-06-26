import { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Salon, Service } from '../navigation/types';
import { useTreatments } from './useTreatments';

export const useSalonReviewState = (selectedCategory: Service | null) => {
  const [allSalons, setAllSalons] = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('men');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const { treatments: menTreatments } = useTreatments(selectedCategory, 'men');
  const { treatments: womenTreatments } = useTreatments(selectedCategory, 'women');

  useEffect(() => {
    const loadSalons = async () => {
      try {
        const data = await AsyncStorage.getItem('salons');
        const parsed: Salon[] = data ? JSON.parse(data) : [];
        setAllSalons(parsed);
      } catch (err) {
        console.error('Failed to load salons', err);
      }
    };
    loadSalons();
  }, []);

  const treatments = selectedGender === 'men' ? menTreatments : womenTreatments;

  const categoriesForSelectedSalon = useMemo(() => selectedSalon?.services || [], [selectedSalon]);

  const allServicesForCategory = useMemo(() => {
    const all = [...menTreatments, ...womenTreatments].flatMap(cat => cat.services);
    return Array.from(new Map(all.map(s => [s.id, s])).values());
  }, [menTreatments, womenTreatments]);

  const selectedServicesByGender = useMemo(() => {
    const filterServices = (treatments: typeof menTreatments) =>
      treatments.flatMap(cat => cat.services)
        .filter(service => selectedServices.includes(service.id))
        .map(service => service.name);

    return {
      men: filterServices(menTreatments),
      women: filterServices(womenTreatments),
    };
  }, [menTreatments, womenTreatments, selectedServices]);

  const servicesToDisplay = useMemo(
    () => treatments.flatMap(cat => cat.services),
    [treatments]
  );

  return {
    allSalons,
    selectedSalon,
    setSelectedSalon,
    selectedGender,
    setSelectedGender,
    selectedServices,
    setSelectedServices,
    categoriesForSelectedSalon,
    servicesToDisplay,
    allServicesForCategory,
    selectedServicesByGender,
  };
};
