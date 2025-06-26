import React from 'react';
import {
  SectionList,
  Text,
  TouchableOpacity,
  View,
  SectionListData,
  SectionListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TreatmentListItem from '../TreatmentListItem';
import styles from './styles';
import { Cart, Treatment } from '../../navigation/types';
import GroupedSectionList from '../GroupedSectionList';

interface Section {
  title: string;
  data: Treatment[];
  category: string;
}



interface Props {
  sections: SectionListData<Treatment, Section>[];
  expandedCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
  onAddTreatment?: (treatment: Treatment) => void;
  onRemoveTreatment?: (treatment: Treatment) => void;
  cartItems: Treatment[];
}

const TreatmentListSection: React.FC<Props> = ({
  sections,
  expandedCategories,
  toggleCategory,
  onAddTreatment,
  onRemoveTreatment,
  cartItems,
}) => {
  const renderItem: SectionListRenderItem<Treatment, Section> = ({ item }) => {
    const isInCart = cartItems.some(cartItem => cartItem.id=== item.id);
    return (
      <TreatmentListItem
        item={item}
        onAddPress={onAddTreatment}
        onRemovePress={onRemoveTreatment}
        isInCart={isInCart}
      />
    );
  };

  return (
    <GroupedSectionList
      sections={sections}
      renderItem={renderItem}
      expandedCategories={expandedCategories}
      toggleCategory={toggleCategory}
      showToggleIcon={true}
    />
  );
};

export default TreatmentListSection;

