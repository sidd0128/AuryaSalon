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
import styles from './styles';

export interface BaseSection<ItemT> {
  title: string;
  data: ItemT[];
  category?: string;
}

interface GroupedSectionListProps<ItemT, SectionT extends BaseSection<ItemT>> {
  sections: SectionListData<ItemT, SectionT>[];
  renderItem: SectionListRenderItem<ItemT, SectionT>;
  expandedCategories?: Record<string, boolean>;
  toggleCategory?: (category: string) => void;
  showToggleIcon?: boolean;
  emptyMessage?: string;
  itemSeparator?: React.ReactElement;
  sectionSeparator?: React.ReactElement;
}

function GroupedSectionList<ItemT, SectionT extends BaseSection<ItemT>>({
  sections,
  renderItem,
  expandedCategories,
  toggleCategory,
  showToggleIcon = false,
  emptyMessage = 'No items found.',
  itemSeparator,
  sectionSeparator,
}: GroupedSectionListProps<ItemT, SectionT>) {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => (item as any).id || index.toString()}
      renderItem={({ item, index, section }) => {
        const isExpanded =
          !showToggleIcon ||
          (expandedCategories && section.category && expandedCategories[section.category]);
        if (!showToggleIcon || isExpanded) {
          return renderItem({ item, index, section, separators: { highlight() {}, unhighlight() {}, updateProps() {} } });
        }
        return null;
      }}
      renderSectionHeader={({ section }) => {
        const showToggle = showToggleIcon && section.category && toggleCategory;
        return (
          <TouchableOpacity
            disabled={!showToggle}
            onPress={() => section.category && toggleCategory?.(section.category)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
            {showToggle && (
              <Icon
                name={expandedCategories?.[section.category!] ? 'expand-less' : 'expand-more'}
                size={20}
                color="#666"
              />
            )}
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      }
      ItemSeparatorComponent={() => itemSeparator || <View style={styles.separator} />}
      SectionSeparatorComponent={() => sectionSeparator || <View style={styles.sectionSeparator} />}
      stickySectionHeadersEnabled={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}

export default GroupedSectionList;
