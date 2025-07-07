import React from 'react';
import { View, Text, Image, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { SpecialistProfile, TimeSlot } from './types';
import { styles } from './styles';
import ReviewCard from '../../components/ReviewCard';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TimeSlots from '../../components/TimeSlots';
import HeaderBar from '../../components/HeaderBar';
import { renderStars } from '../../utils/renderStars';

type Props = NativeStackScreenProps<RootStackParamList, 'SpecialistProfileScreen'>;

const SpecialistProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { specialist: profile } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar title={'Specialist Profile'} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Circular Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={profile.profileImage}
            style={styles.profileImage}
            accessibilityLabel={`${profile.name} profile picture`}
          />
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <FlatList
            data={profile.reviews}
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
        </View>

        {/* Specialty and Experience Card */}
        <View style={[styles.specialtyCard, { marginTop: 0 }]}>
          <Text style={styles.specialtyText}>Specialty: {profile.specialty}</Text>
          <View style={styles.experienceRow}>
            <Text style={styles.experienceText}>
                Experience: {profile.experience} {profile.experience === 1 ? 'year' : 'years'}
            </Text>
            {renderStars(profile.rating.toString())}
            </View>
        </View>

        {/* Availability Time Slots */}
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
    </SafeAreaView>
  );
};

export default SpecialistProfileScreen;
