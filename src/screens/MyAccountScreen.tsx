import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import HeaderBar from '../components/HeaderBar';
import ListItem from '../components/MyAccountListItem';
import Typography from '../theme/typography';


const MyAccountScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        <ListItem iconName="account-balance-wallet" title="Aurya salons Wallet" onPress={() => ("")} />
        <ListItem iconName="star" title="Rate a Salon" onPress={() => navigation.navigate('RateSalon')} />

        <Text style={styles.sectionTitle}>Gift Card</Text>
        <ListItem iconName="card-giftcard" title="Buy Gift Card" onPress={() => ("")} />
        <ListItem iconName="card-giftcard" title="Claim Gift Card" onPress={() => ("")} />
        <ListItem iconName="history" title="Purchase History" onPress={() => ("")} />

        <Text style={styles.sectionTitle}>Spread the love</Text>
        <ListItem iconName="people" title="Invite Friends & Family" onPress={() => ("")} />
        <ListItem iconName="share" title="Share App" onPress={() => ("")} />
        <ListItem iconName="favorite" title="Your Favourite Places" onPress={() => ("")} />

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
        <ListItem iconName="info" title="FAQ's" onPress={() => ("")} />
        <ListItem iconName="description" title="Terms & Conditions" onPress={() => ("")} />
        <ListItem iconName="lock" title="Privacy Policy" onPress={() => ("")} />
        <ListItem iconName="exit-to-app" title="Logout" onPress={() => ("")} />

        <Text style={styles.versionText}>App Version v3.2.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingBottom: 32,
  },
  userSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitialsText: {
    ...Typography.h2,
    color: colors.textOnPrimary,
  },
  userName: {
    ...Typography.h3,
  },
  editText: {
    ...Typography.label2,
    color: colors.primary,
  },
  savingsBanner: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  savingsText: {
    ...Typography.label2,
    color: colors.textOnPrimary,
  },
  sectionTitle: {
    ...Typography.h3,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  versionText: {
    ...Typography.caption1,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
});



export default MyAccountScreen;
