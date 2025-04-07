import { Property } from '../models/property.model';

// Création de dates pour les disponibilités et dates de création
const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);

const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

const lastMonth = new Date(today);
lastMonth.setMonth(today.getMonth() - 1);

/**
 * Données mockées de propriétés pour la démonstration
 */
export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Appartement lumineux avec balcon',
    description: 'Bel appartement rénové avec cuisine ouverte et grand balcon exposé sud. Proche des transports et commerces.',
    price: 1200,
    priceUnit: 'month',
    type: 'apartment',
    size: 65,
    rooms: 3,
    bathrooms: 1,
    furnished: true,
    location: {
      address: '24 Rue de la Paix',
      city: 'Paris',
      neighborhood: 'Opéra',
      postalCode: '75002',
      country: 'France',
      lat: 48.8698,
      lng: 2.3318
    },
    features: ['balcony', 'elevator', 'parking', 'securitySystem'],
    images: [
      'assets/images/properties/apt1-1.jpg',
      'assets/images/properties/apt1-2.jpg',
      'assets/images/properties/apt1-3.jpg'
    ],
    availableFrom: nextWeek,
    landlord: {
      id: 'landlord1',
      name: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      profileImage: 'assets/images/users/landlord1.jpg'
    },
    verified: true,
    createdAt: lastWeek,
    updatedAt: today
  },
  {
    id: '2',
    title: 'Studio moderne au cœur de Lyon',
    description: 'Studio entièrement rénové avec des finitions haut de gamme, idéalement situé au centre-ville de Lyon.',
    price: 680,
    priceUnit: 'month',
    type: 'studio',
    size: 30,
    rooms: 1,
    bathrooms: 1,
    furnished: true,
    location: {
      address: '15 Rue Mercière',
      city: 'Lyon',
      neighborhood: 'Presqu\'île',
      postalCode: '69002',
      country: 'France',
      lat: 45.7590,
      lng: 4.8329
    },
    features: ['elevator', 'securitySystem', 'airConditioning'],
    images: [
      'assets/images/properties/studio1-1.jpg',
      'assets/images/properties/studio1-2.jpg'
    ],
    availableFrom: today,
    landlord: {
      id: 'landlord2',
      name: 'Thomas Dubois',
      email: 'thomas.dubois@example.com',
      profileImage: 'assets/images/users/landlord2.jpg'
    },
    verified: true,
    createdAt: lastMonth,
    updatedAt: lastWeek
  },
  {
    id: '3',
    title: 'Maison familiale avec jardin',
    description: 'Belle maison avec jardin, idéale pour une famille. Quartier calme et résidentiel, proche des écoles et des commerces.',
    price: 1800,
    priceUnit: 'month',
    type: 'house',
    size: 120,
    rooms: 5,
    bathrooms: 2,
    furnished: false,
    location: {
      address: '8 Avenue des Fleurs',
      city: 'Bordeaux',
      neighborhood: 'Caudéran',
      postalCode: '33200',
      country: 'France',
      lat: 44.8423,
      lng: -0.6025
    },
    features: ['garden', 'parking', 'petsAllowed', 'terrace'],
    images: [
      'assets/images/properties/house1-1.jpg',
      'assets/images/properties/house1-2.jpg',
      'assets/images/properties/house1-3.jpg',
      'assets/images/properties/house1-4.jpg'
    ],
    availableFrom: nextMonth,
    landlord: {
      id: 'landlord3',
      name: 'Marie Lambert',
      email: 'marie.lambert@example.com',
      phone: '+33 6 12 34 56 78',
      profileImage: 'assets/images/users/landlord3.jpg'
    },
    verified: true,
    createdAt: lastMonth,
    updatedAt: lastMonth
  },
  {
    id: '4',
    title: 'Loft industriel à Marseille',
    description: 'Superbe loft industriel avec plafonds hauts et grandes fenêtres. Design contemporain et emplacement idéal.',
    price: 1500,
    priceUnit: 'month',
    type: 'loft',
    size: 90,
    rooms: 3,
    bathrooms: 1,
    furnished: true,
    location: {
      address: '42 Rue de la République',
      city: 'Marseille',
      neighborhood: 'Le Panier',
      postalCode: '13002',
      country: 'France',
      lat: 43.2972,
      lng: 5.3749
    },
    features: ['parking', 'airConditioning', 'petsAllowed', 'securitySystem'],
    images: [
      'assets/images/properties/loft1-1.jpg',
      'assets/images/properties/loft1-2.jpg'
    ],
    availableFrom: nextWeek,
    landlord: {
      id: 'landlord4',
      name: 'Nicolas Petit',
      email: 'nicolas.petit@example.com',
      profileImage: 'assets/images/users/landlord4.jpg'
    },
    verified: false,
    createdAt: today,
    updatedAt: today
  },
  {
    id: '5',
    title: 'Duplex avec vue panoramique',
    description: 'Magnifique duplex avec vue panoramique sur la ville. Grande terrasse, cuisine équipée et prestations haut de gamme.',
    price: 2200,
    priceUnit: 'month',
    type: 'duplex',
    size: 110,
    rooms: 4,
    bathrooms: 2,
    furnished: true,
    location: {
      address: '18 Boulevard des Alpes',
      city: 'Grenoble',
      neighborhood: 'Europole',
      postalCode: '38000',
      country: 'France',
      lat: 45.1952,
      lng: 5.7150
    },
    features: ['terrace', 'elevator', 'parking', 'airConditioning', 'securitySystem'],
    images: [
      'assets/images/properties/duplex1-1.jpg',
      'assets/images/properties/duplex1-2.jpg',
      'assets/images/properties/duplex1-3.jpg'
    ],
    availableFrom: nextMonth,
    landlord: {
      id: 'landlord5',
      name: 'Claire Dupont',
      email: 'claire.dupont@example.com',
      phone: '+33 6 98 76 54 32',
      profileImage: 'assets/images/users/landlord5.jpg'
    },
    verified: true,
    createdAt: lastWeek,
    updatedAt: lastWeek
  },
  {
    id: '6',
    title: 'Studio étudiant proche campus',
    description: 'Studio idéal pour étudiant, entièrement meublé et équipé. À proximité immédiate du campus universitaire.',
    price: 450,
    priceUnit: 'month',
    type: 'studio',
    size: 22,
    rooms: 1,
    bathrooms: 1,
    furnished: true,
    location: {
      address: '5 Rue des Étudiants',
      city: 'Lille',
      neighborhood: 'Vauban',
      postalCode: '59000',
      country: 'France',
      lat: 50.6292,
      lng: 3.0573
    },
    features: ['elevator', 'securitySystem'],
    images: [
      'assets/images/properties/studio2-1.jpg',
      'assets/images/properties/studio2-2.jpg'
    ],
    availableFrom: today,
    landlord: {
      id: 'landlord6',
      name: 'Henri Leroy',
      email: 'henri.leroy@example.com',
      profileImage: 'assets/images/users/landlord6.jpg'
    },
    verified: true,
    createdAt: lastMonth,
    updatedAt: today
  },
  {
    id: '7',
    title: 'Appartement avec vue mer',
    description: 'Superbe appartement avec vue imprenable sur la mer. Lumineux, spacieux et décoré avec goût.',
    price: 1750,
    priceUnit: 'month',
    type: 'apartment',
    size: 78,
    rooms: 3,
    bathrooms: 1,
    furnished: true,
    location: {
      address: '26 Promenade des Anglais',
      city: 'Nice',
      neighborhood: 'Promenade des Anglais',
      postalCode: '06000',
      country: 'France',
      lat: 43.6949,
      lng: 7.2661
    },
    features: ['balcony', 'elevator', 'airConditioning', 'securitySystem'],
    images: [
      'assets/images/properties/apt2-1.jpg',
      'assets/images/properties/apt2-2.jpg',
      'assets/images/properties/apt2-3.jpg'
    ],
    availableFrom: nextWeek,
    landlord: {
      id: 'landlord7',
      name: 'Isabelle Blanc',
      email: 'isabelle.blanc@example.com',
      phone: '+33 6 11 22 33 44',
      profileImage: 'assets/images/users/landlord7.jpg'
    },
    verified: true,
    createdAt: lastWeek,
    updatedAt: lastWeek
  },
  {
    id: '8',
    title: 'Maison de village avec piscine',
    description: 'Charmante maison de village avec piscine privée. Calme et authentique, idéale pour profiter du sud de la France.',
    price: 1600,
    priceUnit: 'month',
    type: 'house',
    size: 140,
    rooms: 4,
    bathrooms: 2,
    furnished: false,
    location: {
      address: '10 Rue du Vieux Bourg',
      city: 'Aix-en-Provence',
      neighborhood: 'Centre historique',
      postalCode: '13100',
      country: 'France',
      lat: 43.5297,
      lng: 5.4474
    },
    features: ['garden', 'pool', 'parking', 'petsAllowed', 'terrace'],
    images: [
      'assets/images/properties/house2-1.jpg',
      'assets/images/properties/house2-2.jpg',
      'assets/images/properties/house2-3.jpg'
    ],
    availableFrom: nextMonth,
    landlord: {
      id: 'landlord8',
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      profileImage: 'assets/images/users/landlord8.jpg'
    },
    verified: false,
    createdAt: lastMonth,
    updatedAt: lastMonth
  },
  {
    id: '9',
    title: 'T2 rénové proche transports',
    description: 'Appartement T2 entièrement rénové avec des matériaux de qualité. Idéalement situé à proximité des transports.',
    price: 850,
    priceUnit: 'month',
    type: 'apartment',
    size: 45,
    rooms: 2,
    bathrooms: 1,
    furnished: true,
    location: {
      address: '37 Avenue Jean Jaurès',
      city: 'Toulouse',
      neighborhood: 'Saint-Cyprien',
      postalCode: '31000',
      country: 'France',
      lat: 43.6018,
      lng: 1.4417
    },
    features: ['balcony', 'elevator'],
    images: [
      'assets/images/properties/apt3-1.jpg',
      'assets/images/properties/apt3-2.jpg'
    ],
    availableFrom: today,
    landlord: {
      id: 'landlord9',
      name: 'Antoine Garcia',
      email: 'antoine.garcia@example.com',
      phone: '+33 6 55 66 77 88',
      profileImage: 'assets/images/users/landlord9.jpg'
    },
    verified: true,
    createdAt: lastWeek,
    updatedAt: today
  },
  {
    id: '10',
    title: 'Grande maison avec garage',
    description: 'Spacieuse maison familiale avec grand jardin et garage. Quartier calme et résidentiel, proche de toutes commodités.',
    price: 1900,
    priceUnit: 'month',
    type: 'house',
    size: 160,
    rooms: 5,
    bathrooms: 2,
    furnished: false,
    location: {
      address: '12 Rue des Lilas',
      city: 'Nantes',
      neighborhood: 'Procé',
      postalCode: '44000',
      country: 'France',
      lat: 47.2185,
      lng: -1.5506
    },
    features: ['garden', 'parking', 'petsAllowed', 'terrace'],
    images: [
      'assets/images/properties/house3-1.jpg',
      'assets/images/properties/house3-2.jpg',
      'assets/images/properties/house3-3.jpg'
    ],
    availableFrom: nextMonth,
    landlord: {
      id: 'landlord10',
      name: 'Sylvie Robert',
      email: 'sylvie.robert@example.com',
      profileImage: 'assets/images/users/landlord10.jpg'
    },
    verified: true,
    createdAt: lastMonth,
    updatedAt: lastWeek
  }
]; 