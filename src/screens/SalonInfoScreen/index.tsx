import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Service } from '../../navigation/types';
import TabButton from '../../components/TabButton';
import ServiceCard from '../../components/ServiceCard';
import PhotoCard from '../../components/PhotoCard';
import ActionButton from '../../components/ActionButton';
import HeaderBar from '../../components/HeaderBar';
import SalonImageCarousel from '../../components/SalonImageCarousel';
import CustomerReviewScreen from './../CustomerReviewScreen';
import SpecialistCard from '../../components/SpecialistCard';
import { mapSpecialistToProfile } from '../../helpers/mapSpecialistToProfile';

import { colors } from '../../theme/colors';
import Typography from '../../theme/typography';
import { styles } from './styles';
import type { Props, TabType } from './types';
import { useMarqueeAnimation } from '../../hooks/useMarqueeAnimation';


const SalonInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { salon } = route.params;
  const [activeTab, setActiveTab] = useState<TabType>('Services');
  const salonImages = salon.photos.map(photo => photo.imageKey);

  const [textWidth, setTextWidth] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const animatedValue = useMarqueeAnimation(textWidth, containerWidth);

  const handleBookNow = (service: Service) => {
    navigation.navigate('Treatments', {
      categoriesFromSalon: salon.services,
      activeCategoryServiceId: service.service_id,
    });
  };

  const handleOpenChat = () => {
    navigation.navigate('Chat', {
      salonId: salon.id,
      salonName: salon.name,
    });
  };

  const tabs: TabType[] = ['Services', 'Photos', 'About', 'Reviews', 'Specialists'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderBar title={salon.name} onBackPress={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <SalonImageCarousel images={salonImages} />

          <Text style={styles.title}>{salon.name}</Text>
          <Text style={styles.location}>{salon.location}</Text>

          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Closed now | Opens Today at 10:00 AM</Text>
            <Icon name="arrow-drop-down" size={20} color={colors.text} />
          </View>

          <View style={styles.actionButtons}>
            <ActionButton icon="directions" label="Get Directions | 1.85 Kms" />
            <TouchableOpacity style={styles.contactButton}>
              <Icon name="phone" size={20} color={colors.text} />
              <Text>Contact</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.offerItem, { overflow: 'hidden' }]}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          >
            <Icon name="local-offer" size={20} color={colors.success} />
            <Animated.View
              style={{
                transform: [{ translateX: animatedValue }],
                marginLeft: 8,
              }}
            >
              <Text
                style={styles.offerText}
                numberOfLines={1}
                ellipsizeMode="clip"
                onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
              >
                Get 40% OFF via Aurya salons - 35% Discount + 5% Cashback
              </Text>
            </Animated.View>
          </View>

          <Text style={styles.offerTitle}>Offers available for you</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
            style={styles.tabContainer}
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onPress={() => setActiveTab(tab)}
              />
            ))}
          </ScrollView>

          {activeTab === 'Services' && (
            <FlatList
              data={salon.services}
              keyExtractor={(item) => item.service_id}
              numColumns={3}
              renderItem={({ item }) => (
                <ServiceCard item={item} onSelect={handleBookNow} />
              )}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
            />
          )}

          {activeTab === 'Photos' && (
            <FlatList
              data={salon.photos || []}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PhotoCard image={item.imageKey} type={item.type} count={item.count} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          )}

          {activeTab === 'About' && salon.about && (
            <View>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.aboutText}>{salon.about.description}</Text>

              <Text style={styles.sectionTitle}>Amenities</Text>
              {salon.about.amenities.map((amenity, i) => (
                <Text key={i} style={styles.amenityText}>
                  {'\u2022'} {amenity}
                </Text>
              ))}

              <Text style={styles.sectionTitle}>Address</Text>
              <Text style={styles.aboutText}>{salon.about.address}</Text>

              <TouchableOpacity style={styles.directionButton}>
                <Icon name="directions" size={20} color={colors.text} />
                <Text>Get directions</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'Reviews' && (
            <View style={{ marginTop: 12 }}>
              <CustomerReviewScreen />
            </View>
          )}

          {activeTab === 'Specialists' && (
            <FlatList
              data={salon.specialists || []}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <SpecialistCard
                  specialist={item}
                  onPress={() =>
                    navigation.navigate('SpecialistProfileScreen', {
                      specialist: mapSpecialistToProfile(item),
                    })
                  }
                />
              )}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 8,
                marginBottom: 16,
              }}
              contentContainerStyle={{
                paddingBottom: 20,
                paddingTop: 8,
              }}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No specialists available</Text>
                </View>
              }
            />
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              navigation.navigate('Treatments', {
                categoriesFromSalon: salon.services,
                activeCategoryServiceId: '',
              });
            }}
          >
            <Text style={styles.buttonText}>Book services</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Chat Icon */}
        <TouchableOpacity style={styles.floatingChatButton} onPress={handleOpenChat}>
          <Icon name="chat" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SalonInfoScreen;
