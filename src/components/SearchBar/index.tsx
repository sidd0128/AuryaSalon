import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.searchBar}>
      <Icon 
        name="search" 
        size={20} 
        color={colors.textSecondary} 
        style={styles.searchIcon} 
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        selectionColor={colors.primary}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchBar;
