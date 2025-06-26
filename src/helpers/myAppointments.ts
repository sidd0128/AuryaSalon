import { Booking } from "../navigation/types";

export const getSortedBookings = (bookings: Booking[], order: 'asc' | 'desc' = 'desc') =>
  bookings.sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return order === 'asc' ? timeA - timeB : timeB - timeA;
  });

export const filterAndGroupBookings = (
  data: Booking[],
  searchText: string
): { title: string; data: Booking[] }[] => {
  const filtered = data.filter(b =>
    (b.salonName?.toLowerCase().includes(searchText.toLowerCase()) || b.serviceName.toLowerCase().includes(searchText.toLowerCase()))
  );

  const grouped: Record<string, Booking[]> = {};
  filtered.forEach(b => {
    const key = b.salonName || 'Unknown Salon';
    grouped[key] = [...(grouped[key] || []), b];
  });

  return Object.keys(grouped).map(title => ({
    title,
    category: title, 
    data: grouped[title],
  }));
};

export const canCancelBooking = (appointmentDate: Date): boolean =>
  (appointmentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60) > 4;
