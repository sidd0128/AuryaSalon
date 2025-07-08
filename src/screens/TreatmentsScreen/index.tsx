import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import HeaderBar from '../../components/HeaderBar';
import SearchBar from '../../components/SearchBar';
import VerticalCategoryList from '../../components/VerticalCategoryList';
import TreatmentListSection from '../../components/TreatmentListSection';
import CustomAlert from '../../components/CustomAlert';

import { useTreatments } from '../../hooks/useTreatments';
import { filterTreatmentsBySearch } from '../../helpers/filterTreatments';
import { useCart } from '../../context/CartContext';

import { TreatmentsScreenProps, AlertInfo } from './types';
import { createSwitchSalonAlert, addTreatmentToCart } from '../../helpers/treatment';
import { styles } from './styles';
import {  Treatment } from '../../navigation/types';

const TreatmentsScreen: React.FC<TreatmentsScreenProps> = ({ route, navigation }) => {
  const { categoriesFromSalon, activeCategoryServiceId } = route.params;

  const [selectedCategory, setSelectedCategory] = useState(categoriesFromSalon[0] || null);
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
      setAlertInfo(createSwitchSalonAlert(selectedCategory, item, dispatch, setAlertInfo));
    } else {
      addTreatmentToCart(selectedCategory, item, dispatch);
    }
  };

  const onRemoveTreatment = (item: Treatment) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id });
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

export default TreatmentsScreen;
