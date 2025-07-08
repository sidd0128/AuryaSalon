import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { TimeSlot } from './types';
import { styles } from './styles';
import ReviewCard from '../../components/ReviewCard';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TimeSlots from '../../components/TimeSlots';
import HeaderBar from '../../components/HeaderBar';
import { renderStars } from '../../utils/renderStars';
import RatingModal from '../../components/RatingModal';
import { useBottomSheetModal } from '../../hooks/useBottomSheetModal';

type Props = NativeStackScreenProps<RootStackParamList, 'SpecialistProfileScreen'>;

const SpecialistProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { specialist: profile } = route.params;

  const {
    openSheet: openRatingSheet,
    closeSheet: closeRatingSheet,
    BottomSheetModal: RatingBottomSheet,
  } = useBottomSheetModal();
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar title={'Specialist Profile'} onBackPress={() => navigation.goBack()} />

      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={profile.profileImage}
              style={styles.profileImage}
              accessibilityLabel={`${profile.name} profile picture`}
            />
          </View>

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <FlatList
              data={profile.reviews.slice(0, 3)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ReviewCard
                  id={item.id}
                  timestamp={item.timestamp}
                  image={item.image}
                  name={item.name}
                  rating={item.rating}
                  comment={item.comment}
                />
              )}
              contentContainerStyle={styles.reviewsList}
            />
            {profile.reviews.length > 1 && (
               <TouchableOpacity
               style={styles.viewMoreButton}
               onPress={() => navigation.navigate('SpecialistReviewScreen', { reviews: profile.reviews })}
             >
                <Text style={styles.viewMoreText}>
                  {'View More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>


          {/* Specialty and Experience */}
          <View style={[styles.specialtyCard, { marginTop: 0 }]}>
            <Text style={styles.specialtyText}>Specialty: {profile.specialty}</Text>
            <View style={styles.experienceRow}>
              <Text style={styles.experienceText}>
                Experience: {profile.experience} {profile.experience === 1 ? 'year' : 'years'}
              </Text>
              {renderStars(profile.rating.toString())}
            </View>
          </View>

          {/* Availability */}
          <Text style={styles.availabilityTitle}>Available Time Slots</Text>
          <TimeSlots<TimeSlot>
            slots={profile.availability}
            selectedSlot={null}
            clickable={false}
            keyExtractor={(slot) => slot.id}
            labelExtractor={(slot) => slot.time}
            isSelected={() => false}
          />
        </ScrollView>

        {/* Rate Me Button - Fixed at Bottom */}
        <View style={styles.rateMeContainer}>
          <TouchableOpacity style={styles.rateMeButton} onPress={openRatingSheet}>
          <Text style={styles.rateMeText}>Rate Me</Text>
        </TouchableOpacity>
        <RatingBottomSheet height={360}>
          <RatingModal onClose={closeRatingSheet} />
        </RatingBottomSheet>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SpecialistProfileScreen;
