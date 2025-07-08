import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderBar from '../../components/HeaderBar';
import ListItem from '../../components/MyAccountListItem';
import { styles } from './styles';
import { Navigation } from './types';
import { colors } from '../../theme/colors';

const MyAccountScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="My Account"
          onBackPress={() => navigation.goBack()}
          showOffers={false}
          showCart={false}
          showProfile={false}
        />

        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <View style={styles.userInitials}>
              <Text style={styles.userInitialsText}>AA</Text>
            </View>
            <View>
              <Text style={styles.userName}>90416863XX</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>EDIT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.savingsBanner}>
            <Text style={styles.savingsText}>You saved ₹25 with Aurya 😊</Text>
          </View>
        </View>

        <ListItem iconName="event" title="My Appointments" onPress={() => navigation.navigate('MyAppointments')} />
        <ListItem iconName="account-balance-wallet" title="Aurya salons Wallet" onPress={() => {}} />
        <ListItem iconName="star" title="Rate a Salon" onPress={() => navigation.navigate('RateSalon')} />

        <Text style={styles.sectionTitle}>Gift Card</Text>
        <ListItem iconName="card-giftcard" title="Buy Gift Card" onPress={() => {}} />
        <ListItem iconName="card-giftcard" title="Claim Gift Card" onPress={() => {}} />
        <ListItem iconName="history" title="Purchase History" onPress={() => {}} />

        <Text style={styles.sectionTitle}>Spread the love</Text>
        <ListItem iconName="people" title="Invite Friends & Family" onPress={() => {}} />
        <ListItem iconName="share" title="Share App" onPress={() => {}} />
        <ListItem iconName="favorite" title="Your Favourite Places" onPress={() => {}} />

        <Text style={styles.sectionTitle}>More</Text>
        <ListItem
          iconSource={{ uri: 'https://via.placeholder.com/24' }}
          title="Contact Us"
          onPress={() => {}}
        />
        <ListItem title="Follow Us" onPress={() => {}}>
          <>
            <Icon name="facebook" size={24} color={colors.facebook} />
            <Icon name="twitter" size={24} color={colors.twitter} />
            <Icon name="instagram" size={24} color={colors.instagram} />
          </>
        </ListItem>
        <ListItem iconName="info" title="FAQ's" onPress={() => {}} />
        <ListItem iconName="description" title="Terms & Conditions" onPress={() => {}} />
        <ListItem iconName="lock" title="Privacy Policy" onPress={() => {}} />
        <ListItem iconName="exit-to-app" title="Logout" onPress={() => {}} />

        <Text style={styles.versionText}>App Version v3.2.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccountScreen;
