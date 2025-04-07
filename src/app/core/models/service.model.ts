export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  iconUrl: string;
  imageUrl: string;
  price?: number;
  priceUnit?: 'fixed' | 'month' | 'year' | 'percentage';
  discountPercentage?: number;
  isPromoted: boolean;
  partnerName: string;
  partnerLogo?: string;
  rating: number;
  reviewCount: number;
  features: string[];
}

export enum ServiceCategory {
  INSURANCE = 'insurance',
  DEPOSIT = 'deposit',
  CLEANING = 'cleaning',
  MOVING = 'moving',
  INTERNET = 'internet',
  UTILITIES = 'utilities',
  FURNITURE = 'furniture',
  HOME_SECURITY = 'home_security',
  OTHER = 'other'
}

export interface ServiceOrder {
  id: string;
  userId: string;
  serviceId: string;
  propertyId?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  createdAt: Date;
  scheduledDate?: Date;
  completedAt?: Date;
  notes?: string;
} 