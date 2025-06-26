import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { useBottomSheetModal } from './useBottomSheetModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const useImagePickerModal = (onImageSelected: (uri: string) => void) => {
  const { openSheet, closeSheet, BottomSheetModal } = useBottomSheetModal();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const openCamera = async () => {
    closeSheet();
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const res = await launchCamera({ mediaType: 'photo', cameraType: 'back' });
    const asset = res.assets?.[0];
    if (asset?.uri) onImageSelected(asset.uri);
  };

  const openGallery = async () => {
    closeSheet();
    const res = await launchImageLibrary({ mediaType: 'photo' });
    const asset = res.assets?.[0];
    if (asset?.uri) onImageSelected(asset.uri);
  };

  const ImagePickerModal = () => (
    <BottomSheetModal>
      <View>
        <Text style={styles.title}>Select Image From</Text>
        <TouchableOpacity onPress={openCamera} style={styles.option}>
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery} style={styles.option}>
          <Text style={styles.optionText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeSheet} style={[styles.option, styles.cancel]}>
          <Text style={[styles.optionText, { color: 'red' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );

  return { showImagePickerModal: openSheet, ImagePickerModal };
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cancel: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});