import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import HeaderBar from '../../components/HeaderBar';
import StarRatingInput from '../../components/StarRatingInput';
import PickerButton from '../../components/PickerButton';
import CheckboxListItem from '../../components/CheckboxListItem';
import CustomAlert from '../../components/CustomAlert';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useBottomSheetModal } from '../../hooks/useBottomSheetModal';
import { useSalonReviewState } from '../../hooks/useSalonReviewState';
import { validateReviewFields } from '../../helpers/validateReviewFields';
import { buildReviewPayload } from '../../utils/buildReviewPayload';

import { RootStackParamList } from '../../navigation/types';
import { Salon, Service } from '../../navigation/types';
import { AlertInfo, PickerMode } from './types';
import { styles } from './styles';
import { colors } from '../../theme/colors';

const RateSalonScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'RateSalon'>>();

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Service | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [pickerMode, setPickerMode] = useState<PickerMode>(null);

  const {
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
  } = useSalonReviewState(selectedCategory);

  const { openSheet, closeSheet, BottomSheetModal } = useBottomSheetModal();

  const handleSelectService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const handleSubmit = async () => {
    const error = validateReviewFields(
      selectedSalon,
      selectedCategory,
      selectedServices,
      rating,
      comment
    );

    if (error) {
      setAlertInfo({
        variant: 'error',
        title: 'Incomplete Review',
        message: error,
      });
      return;
    }

    const review = buildReviewPayload({
      selectedSalon,
      selectedCategory,
      selectedServices,
      allServicesForCategory,
      rating,
      comment,
    });

    try {
      const existingReviews = await AsyncStorage.getItem('user_reviews');
      const reviews = existingReviews ? JSON.parse(existingReviews) : [];
      reviews.push(review);
      await AsyncStorage.setItem('user_reviews', JSON.stringify(reviews));

      setAlertInfo({
        variant: 'success',
        title: 'Thank you for your review',
        message: 'Your review has been submitted successfully.',
        onConfirm:() => navigation.navigate('SearchSalons', {}),
      });
    } catch (error) {
      console.error('Failed to save review', error);
      setAlertInfo({
        variant: 'error',
        title: 'Error',
        message: 'Could not submit your review. Please try again.',
      });
    }
  };

  const openPicker = (mode: PickerMode) => {
    setPickerMode(mode);
    setTimeout(() => {
      openSheet();
    }, 0);
  };

  const renderPickerItem = ({ item }: { item: Salon | Service }) => (
    <TouchableOpacity
      style={styles.pickerItem}
      onPress={() => {
        if (pickerMode === 'salon') {
          setSelectedSalon(item as Salon);
          setSelectedCategory(null);
        } else {
          setSelectedCategory(item as Service);
        }
        setSelectedServices([]);
        closeSheet();
      }}
    >
      <Text style={styles.pickerItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar
        title="Rate a Salon"
        onBackPress={() => navigation.goBack()}
        showOffers={false}
        showCart={false}
        showProfile={false}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <PickerButton
          label="Salon"
          value={selectedSalon?.name || null}
          onPress={() => openPicker('salon')}
        />

        <PickerButton
          label="Category"
          value={selectedCategory?.name || null}
          onPress={() => openPicker('category')}
          disabled={!selectedSalon}
        />

        {selectedCategory && (
          <>
            <Text style={styles.label}>Select Services to Rate</Text>

            <View style={styles.genderSelection}>
              {(['men', 'women'] as const).map(gender => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    selectedGender === gender && styles.genderButtonSelected,
                  ]}
                  onPress={() => setSelectedGender(gender)}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      selectedGender === gender && styles.genderButtonTextSelected,
                    ]}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {servicesToDisplay.length > 0 ? (
              servicesToDisplay.map(service => (
                <CheckboxListItem
                  key={service.id}
                  label={service.name}
                  isSelected={selectedServices.includes(service.id)}
                  onPress={() => handleSelectService(service.id)}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>No services found for this category/gender.</Text>
            )}
          </>
        )}

        {selectedServices.length > 0 && (
          <View style={styles.selectedServicesContainer}>
            <Text style={styles.label}>Selected Services:</Text>

            {selectedServicesByGender.men.length > 0 && (
              <>
                <Text style={styles.genderHeader}>Men</Text>
                {selectedServicesByGender.men.map((name, index) => (
                  <Text key={`men-${index}`} style={styles.selectedServiceText}>• {name}</Text>
                ))}
              </>
            )}

            {selectedServicesByGender.women.length > 0 && (
              <>
                <Text style={styles.genderHeader}>Women</Text>
                {selectedServicesByGender.women.map((name, index) => (
                  <Text key={`women-${index}`} style={styles.selectedServiceText}>• {name}</Text>
                ))}
              </>
            )}
          </View>
        )}

        <View style={styles.ratingSection}>
          <Text style={styles.label}>Your Rating</Text>
          <StarRatingInput rating={rating} setRating={setRating} />
        </View>

        <View style={styles.commentSection}>
          <Text style={styles.label}>Your Comment</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Tell us about your experience..."
            placeholderTextColor={colors.placeholder}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheetModal height={400}>
        <FlatList
          data={pickerMode === 'salon' ? allSalons : categoriesForSelectedSalon}
          keyExtractor={item =>
            pickerMode === 'salon' ? (item as Salon).id : (item as Service).service_id
          }
          renderItem={renderPickerItem}
          ListHeaderComponent={<Text style={styles.pickerHeader}>Select a {pickerMode}</Text>}
        />
      </BottomSheetModal>

      {alertInfo && (
        <CustomAlert
          visible={!!alertInfo}
          onClose={() => setAlertInfo(null)}
          {...alertInfo}
        />
      )}
    </SafeAreaView>
  );
};

export default RateSalonScreen;
