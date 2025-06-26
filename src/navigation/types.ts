// ---------- Navigation Types ----------
export type RootStackParamList = {
  Splash: undefined;  
  Register: undefined;
  SearchSalons: { location?: string };
  Chat: { salonId: string; salonName: string };
  SalonInfo: { salon: Salon };
  Treatments: {
    categoriesFromSalon: Service[];
    activeCategoryServiceId: string;
  };
  Cart: undefined;
  Booking: {
    cart: Cart;
  };
  MyAppointments: undefined;
  ChangeLocation: undefined;
  MyAccount: undefined;
  CustomerReview: undefined;
  RateSalon: undefined;
};

// ---------- Core Models ----------

export interface Salon {
  id: string;
  name: string;
  location: string;
  imageKey: string;
  images?: string[];
  services: Service[];
  photos: {
    id: string;
    type: string;
    imageKey: string;
    count: number;
  }[];
  about: {
    description: string;
    amenities: string[];
    address: string;
  };

  rating: number;

  priceLevel: 'low' | 'medium' | 'high';

  type: 'unisex' | 'men' | 'women';

  hasDiscount?: boolean;

  isUnisex?: boolean;
}


// Represents a service provided by the salon (raw format from backend)
export interface Service {
  service_id: string;
  name: string;
  url?: string;
  salonId?: string;
  salonName?: string;
  price?: number;
  duration?: number;
}

// Transformed version used in UI or cart/booking (optional)
export type Treatment = {
  id: string;
  name: string;
  price: number;
  duration?: number;
};

// Category for treatments in Treatments screen
export type TreatmentCategory = {
  category: string;
  count: number;
  services: Treatment[];
};

// ---------- Cart & Booking ----------

export interface CartItem {
  id: string; // Corresponds to service_id
  name: string;
  price: number;
  duration: number;
}

export interface Cart {
  salonId: string;
  salonName: string;
  items: CartItem[];
  couponCode?: string;
}

// Past or upcoming booking record
export interface Booking {
  id: string;
  customerName: string;
  salonName: string;
  serviceName: string;
  date: string; // ISO format
  price: number; 
  duration: number; 
}

// ---------- Reviews ----------

export interface Review {
  id: string;
  salonId: string;
  salonName: string;
  serviceName: string;
  rating: number; // e.g., 1–5
  review: string;
  date: string; // ISO date
}
