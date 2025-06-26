import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';

// Explicit type for category item
export interface Category {
  service_id: string;
  name: string;
  url: string;
}

interface Props {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory: (category: Category) => void;
}

const VerticalCategoryList: React.FC<Props> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.service_id}
          activeOpacity={0.7}
          style={[
            styles.item,
            selectedCategoryId === category.service_id && styles.activeItem,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Image source={{ uri: category.url }} style={styles.image} />
          <Text style={styles.label} numberOfLines={2}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default VerticalCategoryList;
