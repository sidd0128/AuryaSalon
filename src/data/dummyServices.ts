import { TreatmentCategory } from "../navigation/types";

const dummyServices: Record<string, { men: TreatmentCategory[], women: TreatmentCategory[] }> = {
  'Treatments': {
    men: [
      {
        category: 'Hair',
        count: 2,
        services: [
          { id: 'm1', name: 'Ozone Dandruff Treatment', price: 5000 },
          { id: 'm2', name: 'Scalp Hydration', price: 4500 },
        ],
      },
      {
        category: 'Skin',
        count: 1,
        services: [{ id: 'm3', name: 'Skin Polishing', price: 3800 }],
      },
    ],
    women: [
      {
        category: 'Hair',
        count: 3,
        services: [
          { id: 'w1', name: 'Keratin Treatment', price: 6200 },
          { id: 'w2', name: 'Hair Spa', price: 2800 },
          { id: 'w3', name: 'Scalp Treatment', price: 4700 },
        ],
      },
      {
        category: 'Skin',
        count: 2,
        services: [
          { id: 'w4', name: 'Facial', price: 3200 },
          { id: 'w5', name: 'Skin Brightening', price: 4900 },
        ],
      },
    ]
  },
  'Massage & Spa': {
    men: [
      {
        category: 'Body Massage',
        count: 3,
        services: [
          { id: 'm4', name: 'Swedish Massage', price: 3600 },
          { id: 'm5', name: 'Deep Tissue Massage', price: 4200 },
          { id: 'm6', name: 'Sports Massage', price: 4600 },
        ],
      },
      {
        category: 'Aromatherapy',
        count: 1,
        services: [{ id: 'm7', name: 'Relaxation Aromatherapy', price: 3900 }],
      },
    ],
    women: [
      {
        category: 'Body Massage',
        count: 3,
        services: [
          { id: 'w6', name: 'Balinese Massage', price: 3700 },
          { id: 'w7', name: 'Hot Stone Massage', price: 5200 },
          { id: 'w8', name: 'Prenatal Massage', price: 4300 },
        ],
      },
      {
        category: 'Spa Packages',
        count: 2,
        services: [
          { id: 'w9', name: 'Detox Spa Package', price: 6400 },
          { id: 'w10', name: 'Bridal Spa Package', price: 8200 },
        ],
      },
    ]
  },
  'Laser Hair Reduction': {
    men: [
      {
        category: 'Face',
        count: 2,
        services: [
          { id: 'm8', name: 'Beard Shaping', price: 7300 },
          { id: 'm9', name: 'Full Face', price: 9800 },
        ],
      },
      {
        category: 'Body',
        count: 3,
        services: [
          { id: 'm10', name: 'Chest', price: 12200 },
          { id: 'm11', name: 'Back', price: 14900 },
          { id: 'm12', name: 'Arms', price: 8300 },
        ],
      },
    ],
    women: [
      {
        category: 'Face',
        count: 3,
        services: [
          { id: 'w11', name: 'Upper Lip', price: 3100 },
          { id: 'w12', name: 'Chin', price: 4100 },
          { id: 'w13', name: 'Sideburns', price: 5200 },
        ],
      },
      {
        category: 'Body',
        count: 4,
        services: [
          { id: 'w14', name: 'Underarms', price: 6300 },
          { id: 'w15', name: 'Full Arms', price: 9900 },
          { id: 'w16', name: 'Bikini Line', price: 8200 },
          { id: 'w17', name: 'Full Legs', price: 14800 },
        ],
      },
    ]
  },
  'Semi Permanent Make Up': {
    men: [],
    women: [
      {
        category: 'Eyebrows',
        count: 3,
        services: [
          { id: 'w18', name: 'Microblading', price: 14900 },
          { id: 'w19', name: 'Powder Brows', price: 12500 },
          { id: 'w20', name: 'Ombre Brows', price: 17700 },
        ],
      },
      {
        category: 'Eyes',
        count: 2,
        services: [
          { id: 'w21', name: 'Eyeliner', price: 10100 },
          { id: 'w22', name: 'Eyelash Enhancement', price: 8300 },
        ],
      },
      {
        category: 'Lips',
        count: 2,
        services: [
          { id: 'w23', name: 'Lip Blush', price: 14800 },
          { id: 'w24', name: 'Lip Liner', price: 12300 },
        ],
      },
    ]
  },
  'Dermatology': {
    men: [
      {
        category: 'Skin Treatments',
        count: 3,
        services: [
          { id: 'm13', name: 'Acne Treatment', price: 5200 },
          { id: 'm14', name: 'Scar Reduction', price: 7100 },
          { id: 'm15', name: 'Psoriasis Treatment', price: 6200 },
        ],
      },
    ],
    women: [
      {
        category: 'Skin Treatments',
        count: 4,
        services: [
          { id: 'w25', name: 'Acne Treatment', price: 5100 },
          { id: 'w26', name: 'Pigmentation Treatment', price: 8200 },
          { id: 'w27', name: 'Anti-Aging Consultation', price: 3100 },
          { id: 'w28', name: 'Melasma Treatment', price: 6900 },
        ],
      },
      {
        category: 'Hair Treatments',
        count: 2,
        services: [
          { id: 'w29', name: 'Hair Loss Consultation', price: 2800 },
          { id: 'w30', name: 'PRP Therapy', price: 11800 },
        ],
      },
    ]
  },
  'Slimming': {
    men: [
      {
        category: 'Body Contouring',
        count: 3,
        services: [
          { id: 'm16', name: 'Cavitation', price: 8100 },
          { id: 'm17', name: 'RF Fat Reduction', price: 10300 },
          { id: 'm18', name: 'Abdominal Slimming', price: 11900 },
        ],
      },
    ],
    women: [
      {
        category: 'Body Contouring',
        count: 4,
        services: [
          { id: 'w31', name: 'Ultrasonic Cavitation', price: 8200 },
          { id: 'w32', name: 'Vacuum Therapy', price: 6100 },
          { id: 'w33', name: 'Thigh Slimming', price: 10400 },
          { id: 'w34', name: 'Arm Sculpting', price: 9100 },
        ],
      },
      {
        category: 'Weight Management',
        count: 2,
        services: [
          { id: 'w35', name: 'Diet Consultation', price: 2900 },
          { id: 'w36', name: 'Detox Program', price: 14500 },
        ],
      },
    ]
  },
  'Anti Aging': {
    men: [
      {
        category: 'Face Treatments',
        count: 3,
        services: [
          { id: 'm19', name: 'Botox', price: 14800 },
          { id: 'm20', name: 'Dermal Fillers', price: 19900 },
          { id: 'm21', name: 'Thread Lift', price: 24500 },
        ],
      },
    ],
    women: [
      {
        category: 'Face Treatments',
        count: 4,
        services: [
          { id: 'w37', name: 'Botox', price: 15200 },
          { id: 'w38', name: 'Dermal Fillers', price: 20100 },
          { id: 'w39', name: 'Thread Lift', price: 25400 },
          { id: 'w40', name: 'Vampire Facial', price: 30200 },
        ],
      },
      {
        category: 'Skin Rejuvenation',
        count: 3,
        services: [
          { id: 'w41', name: 'Laser Resurfacing', price: 12300 },
          { id: 'w42', name: 'Chemical Peel', price: 8400 },
          { id: 'w43', name: 'Micro-needling', price: 10500 },
        ],
      },
    ]
  }
};

export default dummyServices;
