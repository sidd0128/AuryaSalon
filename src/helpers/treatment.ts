import { Treatment, Service } from '../navigation/types';
import { AlertInfo } from '../screens/TreatmentsScreen/types';




export const createSwitchSalonAlert = (
  selectedCategory: Service | null,
  item: Treatment,
  dispatch: React.Dispatch<any>,
  setAlertInfo: React.Dispatch<React.SetStateAction<AlertInfo | null>>
): AlertInfo => ({
  variant: 'confirmation',
  title: 'Switch Salon?',
  message:
    'You are about to select treatments from a different salon. This will clear your current cart.',
  confirmText: 'Continue',
  cancelText: 'Cancel',
  onConfirm: () => {
    dispatch({ type: 'CLEAR_CART' });
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        salonId: selectedCategory?.salonId,
        salonName: selectedCategory?.salonName,
        item: {
          id: item.id,
          name: item.name,
          price: item.price || 0,
          duration: item.duration || 0,
        },
      },
    });
    setAlertInfo(null);
  },
  onCancel: () => setAlertInfo(null),
});

export const addTreatmentToCart = (
  selectedCategory: Service | null,
  item: Treatment,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: 'ADD_ITEM',
    payload: {
      salonId: selectedCategory?.salonId,
      salonName: selectedCategory?.salonName,
      item: {
        id: item.id,
        name: item.name,
        price: item.price || 0,
        duration: item.duration || 0,
      },
    },
  });
};
