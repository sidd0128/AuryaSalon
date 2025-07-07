import { Review, Salon } from '../navigation/types';



const SERVICE_CATEGORIES = [
  { service_id: 'svc1', name: 'Treatments', url: 'https://cdn.pixabay.com/photo/2020/05/24/02/00/barber-shop-5212059_1280.jpg' },
  { service_id: 'svc2', name: 'Massage & Spa', url: 'https://cdn.pixabay.com/photo/2019/03/08/20/17/beauty-salon-4043096_1280.jpg' },
  { service_id: 'svc3', name: 'Laser Hair Reduction', url: 'https://cdn.pixabay.com/photo/2016/07/17/10/31/living-room-1523480_1280.jpg' },
  { service_id: 'svc4', name: 'Semi Permanent Make Up', url: 'https://cdn.pixabay.com/photo/2018/03/31/04/48/beauty-salon-3277314_1280.jpg' },
  { service_id: 'svc5', name: 'Dermatology', url: 'https://cdn.pixabay.com/photo/2020/01/06/15/51/interior-4745598_1280.jpg' },
  { service_id: 'svc6', name: 'Slimming', url: 'https://cdn.pixabay.com/photo/2016/06/12/21/41/barber-1453064_1280.jpg' },
  { service_id: 'svc7', name: 'Anti Aging', url: 'https://cdn.pixabay.com/photo/2017/05/26/10/25/barber-2345701_1280.jpg' },
];

const IMAGE_POOL = [
  'https://cdn.pixabay.com/photo/2020/05/24/02/00/barber-shop-5212059_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/03/08/20/17/beauty-salon-4043096_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/07/17/10/31/living-room-1523480_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/03/31/04/48/beauty-salon-3277314_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/01/06/15/51/interior-4745598_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/06/12/21/41/barber-1453064_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/05/26/10/25/barber-2345701_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/11/01/19/43/barber-1017457_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/11/23/13/40/barber-6818698_1280.jpg',
];

const getRandomImages = (count: number): string[] =>
  [...IMAGE_POOL].sort(() => 0.5 - Math.random()).slice(0, count);

const getRandomFrom = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];


const SALON_NAMES = [
  'Glamour Salon', 'Beauty Hub', 'Chic Cuts', 'The Style Bar', 'Urban Oasis Spa',
  'Serene Escapes', 'Nail Perfection', 'Hair & Harmony', 'The Glow Up Studio',
  'Elegance Lounge', 'Refresh & Revive',
];

const IMAGE_KEYS = [
  'salon_one', 'salon_two', 'salon_three', 'salon_four', 'salon_five',
  'salon_six', 'salon_seven', 'salon_eight', 'salon_nine', 'salon_ten', 'salon_eleven',
];

const LOCATIONS = [
  'Downtown LA', 'Midtown', 'Beverly Hills', 'Santa Monica', 'West Hollywood',
  'Pasadena', 'Glendale', 'Burbank', 'Culver City', 'Long Beach', 'Malibu',
];

const DESCRIPTIONS = [
  'Oasis - Wave of Wellness offers advanced skin, hair, and weight-loss treatments backed by science and innovation...',
  'Experience indulgent beauty care at Beauty Hub – your sanctuary for pampering and relaxation.',
  'Chic Cuts is renowned for its modern styling and premium beauty services in Beverly Hills.',
  'Santa Monica’s best-kept grooming secret, where comfort meets cutting-edge beauty solutions.',
  'Escape into luxury with soothing spa treatments designed to heal, relax and rejuvenate your body and soul.',
  'Serene Escapes offers wellness rituals and spa indulgence in the peaceful surroundings of Pasadena.',
  'Nail Perfection brings you expert nail artistry with the latest designs and finest hygiene standards.',
  'At Hair & Harmony, find balance through personalized hair care and expert styling.',
  'Glow Up Studio helps you radiate confidence with modern skin therapies and makeup artistry.',
  'Elegance Lounge offers premium bridal and party-ready beauty services with finesse.',
  'Revitalize your senses with tranquil treatments at Malibu’s most serene wellness destination.',
];

const ADDRESSES = [
  'A27, 4th Floor, Golf Crse Rd, above Tata motors, DLF Phase 1, Gurgram, Haryana 122002',
  '2nd Floor, Midtown Towers, New Street, Midtown, CA 90210',
  'Sunset Blvd, Beverly Hills, Los Angeles, CA 90210',
  'Main Street, Santa Monica, CA 90401',
  'Melrose Ave, West Hollywood, CA 90046',
  'Colorado Blvd, Pasadena, CA 91101',
  'Broadway Ave, Glendale, CA 91210',
  'Olive Ave, Burbank, CA 91506',
  'Venice Blvd, Culver City, CA 90232',
  'Ocean Blvd, Long Beach, CA 90802',
  'Pacific Coast Hwy, Malibu, CA 90265',
];

const SPECIALIST_NAMES = [
  'Dr. Priya Sharma', 'Dr. Ananya Patel', 'Dr. Rohan Kapoor', 
  'Dr. Neha Gupta', 'Dr. Arjun Singh', 'Dr. Meera Joshi',
  'Dr. Vikram Malhotra', 'Dr. Sunita Reddy', 'Dr. Karan Verma',
  'Dr. Shreya Choudhary', 'Dr. Rajat Khanna'
];

const SPECIALTIES = [
  'Dermatologist', 'Cosmetologist', 'Hair Specialist',
  'Aesthetic Physician', 'Laser Specialist', 'Spa Therapist',
  'Makeup Artist', 'Massage Therapist', 'Nail Technician',
  'Anti-Aging Expert', 'Weight Loss Consultant'
];

const EXPERIENCE = [
  '5 years', '7 years', '10 years', '12 years', '15 years',
  '8 years', '6 years', '9 years', '11 years', '14 years'
];

const SPECIALIST_IMAGES = [
  'specialist_one', 'specialist_two', 'specialist_three', 
  'specialist_four', 'specialist_five', 'specialist_six',
];

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'r1',
    image: require('../assets/images/profile.png'),
    name: 'Alice Johnson',
    rating: '4.5',
    comment: 'Excellent specialist, very professional and caring.',
    timestamp: new Date('2025-07-01T14:20:00Z').getTime(),
  },
  {
    id: 'r2',
    image: require('../assets/images/profile.png'),
    name: 'Bob Smith',
    rating: '4.0',
    comment: 'Good experience, would recommend to friends.',
    timestamp: new Date('2025-06-15T09:10:00Z').getTime(),
  },
  {
    id: 'r3',
    image: require('../assets/images/profile.png'),
    name: 'Catherine Lee',
    rating: '5.0',
    comment: 'Highly skilled and friendly service!',
    timestamp: new Date('2025-06-25T18:45:00Z').getTime(),
  },
];


const TYPES = ['unisex', 'men', 'women'] as const;

export const salons: Salon[] = Array.from({ length: 11 }, (_, i) => {
  const photoCount = getRandomFrom([1, 2, 3, 5, 6, 8]);
  const priceLevel = getRandomFrom(['low', 'medium', 'high'] as const);
  const type = getRandomFrom(TYPES);

  const specialistCount = getRandomFrom([2, 3, 4]);
  const specialists = Array.from({ length: specialistCount }, (_, j) => ({
    id: `spc-${i}-${j}`,
    name: SPECIALIST_NAMES[(i + j) % SPECIALIST_NAMES.length],
    specialty: SPECIALTIES[(i + j) % SPECIALTIES.length],
    rating: +(4.0 + Math.random() * 1.0).toFixed(1),
    experience: EXPERIENCE[(i + j) % EXPERIENCE.length],
    imageKey: SPECIALIST_IMAGES[(i + j) % SPECIALIST_IMAGES.length],
    reviews: SAMPLE_REVIEWS.slice(0, Math.floor(Math.random() * SAMPLE_REVIEWS.length) + 1)
  }));

  return {
    id: (i + 1).toString(),
    name: SALON_NAMES[i],
    location: LOCATIONS[i],
    imageKey: IMAGE_KEYS[i],
    rating: +(4.3 + Math.random() * 0.7).toFixed(1),
    priceLevel,
    type,
    isUnisex: type === 'unisex',
    hasDiscount: Math.random() < 0.5,
    services: SERVICE_CATEGORIES.map((service) => ({
      ...service,
      salonId: (i + 1).toString(),
      salonName: SALON_NAMES[i],
      duration: getRandomFrom([30, 45, 60, 75, 90, 120]),
    })),
    photos: getRandomImages(photoCount).map((img, idx) => ({
      id: `p${idx + 1}`,
      type: getRandomFrom(['All Photos', 'Ambiance']),
      imageKey: img,
      count: getRandomFrom([1, 2, 5, 6]),
    })),
    about: {
      description: DESCRIPTIONS[i],
      amenities: getRandomImages(2).map((_, j) =>
        ['Air Conditioned', 'Credit Card', 'WiFi', 'Online Booking', 'Spa Packages'][j]
      ),
      address: ADDRESSES[i],
    },
    specialists,
  };
});
