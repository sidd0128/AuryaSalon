import React from 'react';
import { Text, Image } from 'react-native';
import { Service } from '../../navigation/types';
import { styles } from './styles';
import BaseCard from '../BaseCard.tsx';

interface Props {
  item: Service;
  onSelect: (service: Service) => void;
}

const ServiceCard: React.FC<Props> = ({ item, onSelect }) => (
  <BaseCard onPress={() => onSelect(item)}>
    <Image source={{ uri: item.url }} style={styles.serviceImage} />
    <Text style={styles.serviceName}>{item.name}</Text>
  </BaseCard>
);

export default ServiceCard;
