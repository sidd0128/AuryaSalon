import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Treatment } from '../../navigation/types';
import styles from './styles';

interface Props {
  item: Treatment;
  onAddPress?: (treatment: Treatment) => void;
  onRemovePress?: (treatment: Treatment) => void;
  isInCart: boolean;
}

const TreatmentListItem: React.FC<Props> = ({
  item,
  onAddPress,
  onRemovePress,
  isInCart
}) => {
  return (
    <View style={styles.treatmentItem}>
      <View style={styles.treatmentDetails}>
        <Text style={styles.treatmentName}>{item.name}</Text>
        {item.price ? <Text style={styles.treatmentPrice}>`₹ ${item.price}`</Text> : null}
        {item.duration !== undefined ? <Text style={styles.treatmentDuration}>{item.duration} min</Text> : null}
      </View>
      {item.price ? (
        isInCart ? (
          <TouchableOpacity
            style={[styles.addButton, styles.removeButton]}
            onPress={() => onRemovePress?.(item)}
          >
            <Text style={styles.addButtonText}>REMOVE</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddPress?.(item)}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
};

export default TreatmentListItem;
