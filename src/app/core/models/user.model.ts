export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  phone?: string;
  role: 'tenant' | 'landlord' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  savedProperties?: string[];
}

export interface UserNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'property' | 'message' | 'application' | 'service' | 'system';
  read: boolean;
  link?: string;
  createdAt: Date;
}

export enum UserRole {
  TENANT = 'tenant',
  LANDLORD = 'landlord',
  ADMIN = 'admin'
}

export interface UserPreferences {
  preferredLocation?: string[];
  maxBudget?: number;
  minRooms?: number;
  propertyTypes?: string[];
  moveInDate?: Date;
  furnished?: boolean;
  notificationEnabled?: boolean;
}

export interface UserDocument {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt: Date;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export enum DocumentType {
  ID_CARD = 'id_card',
  PASSPORT = 'passport',
  PROOF_OF_INCOME = 'proof_of_income',
  PROOF_OF_ADDRESS = 'proof_of_address',
  GUARANTOR_FORM = 'guarantor_form'
} 