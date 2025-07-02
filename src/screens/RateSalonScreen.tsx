import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Salon, Service, RootStackParamList } from '../navigation/types';
import { useBottomSheetModal } from '../hooks/useBottomSheetModal';
import { colors } from '../theme/colors';
import { useSalonReviewState } from '../hooks/useSalonReviewState';

import HeaderBar from '../components/HeaderBar';
import StarRatingInput from '../components/StarRatingInput';
import PickerButton from '../components/PickerButton';
import CheckboxListItem from '../components/CheckboxListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateReviewFields } from '../helpers/validateReviewFields';
import { buildReviewPayload } from '../utils/buildReviewPayload';
import CustomAlert from '../components/CustomAlert';
import { AlertVariant } from '../components/CustomAlert/types';
import Typography from '../theme/typography';


type RateSalonNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RateSalon'>;

type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
};

const RateSalonScreen: React.FC = () => {
  const navigation = useNavigation<RateSalonNavigationProp>();

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Service | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [pickerMode, setPickerMode] = useState<'salon' | 'category' | null>(null);

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
        onConfirm: () => navigation.navigate('SearchSalons', {}),
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

  const openPicker = (mode: 'salon' | 'category') => {
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
      <HeaderBar title="Rate a Salon" onBackPress={() => navigation.goBack()}
      showOffers={false}
      showCart={false}
      showProfile={false} />

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
          ListHeaderComponent={
            <Text style={styles.pickerHeader}>Select a {pickerMode}</Text>
          }
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


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  scrollContent: { paddingBottom: 40 },
  label: {
    ...Typography.h3,
    marginBottom: 8,
    marginTop: 16,
  },
  genderSelection: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: colors.primary,
  },
  genderButtonText: {
    ...Typography.body,
    color: colors.textSecondary,
  },
  genderButtonTextSelected: {
    ...Typography.body,
    color: colors.textOnPrimary,
    fontWeight: 'bold',
  },
  ratingSection: {
    marginTop: 24,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  commentSection: { marginTop: 16 },
  commentInput: {
    ...Typography.body,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    color: colors.text,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    ...Typography.h2,
    color: colors.textOnPrimary,
  },
  pickerHeader: {
    ...Typography.h2,
    padding: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    color: colors.text,
  },
  pickerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerItemText: {
    ...Typography.body,
    color: colors.text,
  },
  emptyText: {
    ...Typography.label2,
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  genderHeader: {
    ...Typography.label1,
    fontWeight: 'bold',
    fontSize: 15, // Override for exact match
    color: colors.text,
    marginTop: 10,
    marginBottom: 4,
  },
  selectedServicesContainer: {
    marginTop: 16,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedServiceText: {
    ...Typography.label2,
    color: colors.text,
  },
});



export default RateSalonScreen;