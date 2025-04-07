export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: 'month' | 'week' | 'day';
  type: string;
  size: number;
  rooms: number;
  bathrooms: number;
  furnished: boolean;
  location: PropertyLocation;
  features: string[];
  images: string[];
  availableFrom: Date;
  availableUntil?: Date;
  landlord: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    profileImage?: string;
  };
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyLocation {
  address: string;
  city: string;
  neighborhood: string;
  postalCode: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface PropertySearchParams {
  page?: number;
  limit?: number;
  sort?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  rooms?: number[];
  propertyTypes?: string[];
  features?: string[];
  furnished?: boolean;
  availableFrom?: Date;
}

export interface PropertySearchResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
}

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  STUDIO = 'studio',
  DUPLEX = 'duplex',
  LOFT = 'loft',
  VILLA = 'villa',
  ROOM = 'room'
}

export interface PropertyFilter {
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  rooms?: number[];
  propertyTypes?: PropertyType[];
  furnished?: boolean;
  availableFrom?: Date;
  location?: string;
  radius?: number; // in km
  features?: string[];
} 