import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Easing,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootStackParamList, Service } from '../navigation/types';
import TabButton from '../components/TabButton';
import ServiceCard from '../components/ServiceCard';
import PhotoCard from '../components/PhotoCard';
import ActionButton from '../components/ActionButton';
import HeaderBar from '../components/HeaderBar';
import SalonImageCarousel from '../components/SalonImageCarousel';
import { colors } from '../theme/colors';
import CustomerReviewScreen from './CustomerReviewScreen';

type TabType = 'Services' | 'Photos' | 'About' | 'Reviews';
type Props = NativeStackScreenProps<RootStackParamList, 'SalonInfo'>;


const SalonInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { salon } = route.params;
  const [activeTab, setActiveTab] = useState<TabType>('Services');
  const salonImages = salon.photos.map(photo => photo.imageKey);

  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (textWidth === 0 || containerWidth === 0) return;

    animatedValue.setValue(containerWidth);

    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: -textWidth,
        duration: 12000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [textWidth, containerWidth]);

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

  const tabs: TabType[] = ['Services', 'Photos', 'About', 'Reviews'];

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
                Get 40% OFF via Salon Veda - 35% Discount + 5% Cashback
              </Text>
            </Animated.View>
          </View>

          <Text style={styles.offerTitle}>Offers available for you</Text>

          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onPress={() => setActiveTab(tab)}
              />
            ))}
          </View>

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


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    color: colors.text,
  },
  location: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: colors.error,
    marginRight: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 12,
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    gap: 6,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: '100%',
  },
  offerText: {
    fontSize: 14,
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: colors.text,
  },
  aboutText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  bookButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  buttonText: {
    color: colors.textOnPrimary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  floatingChatButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default SalonInfoScreen;
