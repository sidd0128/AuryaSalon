import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import BaseCard from '../BaseCard.tsx';

interface Treatment {
  name: string;
  price: string;
  image: string;
  onAdd?: () => void;
}

const TreatmentCard: React.FC<{ item: Treatment }> = ({ item }) => (
  <BaseCard>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
    <TouchableOpacity style={styles.addButton} onPress={item.onAdd}>
      <Text style={styles.addText}>ADD</Text>
    </TouchableOpacity>
  </BaseCard>
);

export default TreatmentCard;
