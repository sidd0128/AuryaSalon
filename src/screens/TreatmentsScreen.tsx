import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import { Cart, RootStackParamList, Service, Treatment } from '../navigation/types';
import VerticalCategoryList from '../components/VerticalCategoryList';
import { useTreatments } from '../hooks/useTreatments';
import { filterTreatmentsBySearch } from '../helpers/filterTreatments';
import TreatmentListSection from '../components/TreatmentListSection';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/colors';
import CustomAlert from '../components/CustomAlert';
import { AlertVariant } from '../components/CustomAlert/types';
import Typography from '../theme/Typography';

type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const TreatmentsScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Treatments'>> = ({
  route,
  navigation,
}) => {
  const { categoriesFromSalon, activeCategoryServiceId } = route.params;
  const [selectedCategory, setSelectedCategory] = useState<Service | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('men');
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const { cart, dispatch } = useCart();

  useEffect(() => {
    const found = categoriesFromSalon.find((cat) => cat.service_id === activeCategoryServiceId);
    setSelectedCategory(found || categoriesFromSalon[0]);
  }, [activeCategoryServiceId, categoriesFromSalon]);

  useEffect(() => {
    setSearchText('');
  }, [selectedCategory, selectedGender]);

  const { treatments, expandedCategories, toggleCategory } = useTreatments(
    selectedCategory,
    selectedGender
  );

  const onAddTreatment = (item: Treatment) => {
    if (cart.salonId && cart.salonId !== selectedCategory?.salonId) {
      setAlertInfo({
        variant: 'confirmation',
        title: 'Switch Salon?',
        message: 'You are about to select treatments from a different salon. This will clear your current cart.',
        confirmText: 'Continue',
        cancelText: 'Cancel',
        onConfirm: () => {
          dispatch({ type: 'CLEAR_CART' });
          dispatch({
            type: 'ADD_ITEM',
            payload: {
              salonId: selectedCategory?.salonId,
              salonName: selectedCategory?.salonName,
              item: {
                id: item.id,
                name: item.name,
                price: item.price || 0,
                duration: item.duration || 0,
              },
            },
          });
        },
        onCancel: () => setAlertInfo(null),
      });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          salonId: selectedCategory?.salonId,
          salonName: selectedCategory?.salonName,
          item: {
            id: item.id,
            name: item.name,
            price: item.price || 0,
            duration: item.duration || 0,
          },
        },
      });
    }
  };

  const onRemoveTreatment = (item: Treatment) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item.id,
    });
  };
  
  const filteredTreatments = filterTreatmentsBySearch(treatments, searchText);

  const renderTreatmentList = () => {
    const sections = filteredTreatments.map((categoryData) => ({
      title: `${categoryData.category} (${categoryData.count})`,
      data: searchText
        ? categoryData.services
        : expandedCategories[categoryData.category]
        ? categoryData.services
        : [],
      category: categoryData.category,
    }));

    return (
      <View style={styles.treatmentList}>
        <TreatmentListSection
          sections={sections}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          onAddTreatment={onAddTreatment}
          onRemoveTreatment={onRemoveTreatment}
          cartItems={cart.items}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderBar title="Treatments" onBackPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <View style={styles.categoryColumn}>
            <VerticalCategoryList
              categories={categoriesFromSalon}
              selectedCategoryId={selectedCategory?.service_id}
              onSelectCategory={setSelectedCategory}
            />
          </View>

          <View style={styles.treatmentColumn}>
            <View style={styles.searchContainer}>
              <SearchBar
                placeholder="Search for service..."
                onChangeText={setSearchText}
                value={searchText}
              />
            </View>

            <View style={styles.genderSelection}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === 'men' && styles.genderButtonSelected,
                ]}
                onPress={() => setSelectedGender('men')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    selectedGender === 'men' && styles.genderButtonTextSelected,
                  ]}
                >
                  Men
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === 'women' && styles.genderButtonSelected,
                ]}
                onPress={() => setSelectedGender('women')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    selectedGender === 'women' && styles.genderButtonTextSelected,
                  ]}
                >
                  Women
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.treatmentList}>{renderTreatmentList()}</View>
          </View>
        </View>

        {alertInfo && (
          <CustomAlert
            visible={!!alertInfo}
            onClose={() => setAlertInfo(null)}
            {...alertInfo}
          />
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  container: { 
    flex: 1 
  },
  content: { 
    flex: 1, 
    flexDirection: 'row' 
  },
  categoryColumn: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    backgroundColor: colors.surface,
  },
  treatmentColumn: { 
    flex: 1, 
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  searchContainer: { 
    paddingTop: 8, 
    paddingBottom: 12 
  },
  genderSelection: { 
    flexDirection: 'row', 
    marginBottom: 12 
  },
  genderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  genderButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  genderButtonText: {
    ...Typography.body,
    color: colors.textSecondary,
  },
  genderButtonTextSelected: {
    ...Typography.body,
    color: colors.primary,
    fontWeight: 'bold',
  },
  divider: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginBottom: 12 
  },
  treatmentList: { 
    flex: 1 
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionHeaderText: { 
    ...Typography.h3,
  },
  treatmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  treatmentDetails: { 
    flex: 1 
  },
  treatmentName: { 
    ...Typography.label2,
    marginBottom: 4,
  },
  treatmentPrice: { 
    ...Typography.caption2,
    color: colors.textSecondary,
  },
  treatmentDuration: { 
    ...Typography.caption2,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  removeButton: {
    backgroundColor: colors.error,
  },
  addButtonText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
  },
  separator: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginLeft: 8 
  },
  sectionSeparator: { 
    height: 1, 
    backgroundColor: colors.border 
  },
});

export default TreatmentsScreen;