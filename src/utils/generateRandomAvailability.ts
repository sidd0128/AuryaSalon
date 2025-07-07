import { TimeSlot } from "../screens/SpecialistProfileScreen/types";

export const generateRandomAvailability = (days: number = 5): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const timeOptions = ['10:00 AM - 11:00 AM', '12:00 PM - 1:00 PM', '2:00 PM - 3:00 PM', '4:00 PM - 5:00 PM'];
  
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const isoDate = date.toISOString().split('T')[0];
  
      const timeSlotCount = Math.floor(Math.random() * 2) + 1; // 1-2 slots per day
      const usedIndices = new Set<number>();
  
      for (let j = 0; j < timeSlotCount; j++) {
        let index;
        do {
          index = Math.floor(Math.random() * timeOptions.length);
        } while (usedIndices.has(index));
        usedIndices.add(index);
  
        slots.push({
          id: `${isoDate}-${index}`,
          date: isoDate,
          time: timeOptions[index],
        });
      }
    }
  
    return slots;
  };