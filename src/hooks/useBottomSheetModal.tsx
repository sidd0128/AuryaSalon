import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export const useBottomSheetModal = () => {
  const ref = useRef<any>(null);

  const BottomSheetModal = ({ children, height = 320 }: { children: React.ReactNode; height?: number }) => (
    <RBSheet
      ref={ref}
      closeOnPressMask
      height={height}
      customStyles={{
        container: styles.sheetContainer,
        draggableIcon: styles.draggableIcon,
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </RBSheet>
  );

  return {
    openSheet: () => ref.current?.open(),
    closeSheet: () => ref.current?.close(),
    BottomSheetModal,
  };
};

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  draggableIcon: {
    backgroundColor: '#ccc',
    width: 40,
    height: 5,
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 8,
  },
});
