import { Booking } from "../navigation/types";

export const generateAvailableSlots = (
    date: Date,
    bookings: Booking[],
    salonName: string,
    interval: number,
    startHour: number,
    endHour: number
  ): Date[] => {
    const slots: Date[] = [];
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
  
    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const slot = new Date(selectedDate);
        slot.setHours(hour, min, 0, 0);
        if (slot > new Date()) {
          slots.push(slot);
        }
      }
    }
  
    const busySlots = bookings
      .filter(
        (b) =>
          b.salonName === salonName &&
          new Date(b.date).toDateString() === selectedDate.toDateString()
      )
      .map((b) => new Date(b.date).getTime());
  
    return slots.filter((slot) => !busySlots.includes(slot.getTime()));
  };
  