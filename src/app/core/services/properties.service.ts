import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Property, PropertyFilter, PropertyType } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private properties: Property[] = [
    // Ces données seraient normalement chargées depuis une API
    {
      id: '1',
      title: 'Bel appartement lumineux à Paris',
      description: 'Magnifique appartement de 3 pièces en plein cœur de Paris. Lumineux et entièrement rénové.',
      price: 1200,
      priceUnit: 'month',
      type: PropertyType.APARTMENT,
      size: 65,
      rooms: 3,
      bathrooms: 1,
      furnished: true,
      location: {
        address: '15 Rue Saint-Honoré',
        city: 'Paris',
        neighborhood: 'Le Marais',
        postalCode: '75001',
        country: 'France',
        lat: 48.8566,
        lng: 2.3522
      },
      features: ['balcony', 'elevator', 'parking'],
      images: [
        'assets/images/property-1-1.jpg',
        'assets/images/property-1-2.jpg',
      ],
      availableFrom: new Date(2023, 6, 15),
      landlord: {
        id: 'L1',
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        profileImage: 'assets/images/landlord-1.jpg'
      },
      verified: true,
      createdAt: new Date(2023, 5, 1),
      updatedAt: new Date(2023, 5, 10)
    },
    {
      id: '2',
      title: 'Studio moderne à Lyon',
      description: 'Studio fonctionnel et moderne, idéal pour étudiant ou jeune professionnel.',
      price: 550,
      priceUnit: 'month',
      type: PropertyType.STUDIO,
      size: 30,
      rooms: 1,
      bathrooms: 1,
      furnished: true,
      location: {
        address: '10 Rue de la République',
        city: 'Lyon',
        neighborhood: 'Presqu\'île',
        postalCode: '69002',
        country: 'France',
        lat: 45.7640,
        lng: 4.8357
      },
      features: ['elevator', 'washing_machine'],
      images: [
        'assets/images/property-2-1.jpg',
        'assets/images/property-2-2.jpg',
      ],
      availableFrom: new Date(2023, 7, 1),
      landlord: {
        id: 'L2',
        name: 'Marie Martin',
        email: 'marie.martin@example.com'
      },
      verified: false,
      createdAt: new Date(2023, 6, 5),
      updatedAt: new Date(2023, 6, 5)
    },
    {
      id: '3',
      title: 'Maison avec jardin à Bordeaux',
      description: 'Belle maison familiale avec jardin et terrasse dans un quartier calme et résidentiel.',
      price: 1800,
      priceUnit: 'month',
      type: PropertyType.HOUSE,
      size: 120,
      rooms: 5,
      bathrooms: 2,
      furnished: false,
      location: {
        address: '25 Avenue du Parc',
        city: 'Bordeaux',
        neighborhood: 'Caudéran',
        postalCode: '33000',
        country: 'France',
        lat: 44.8378,
        lng: -0.5792
      },
      features: ['garden', 'parking', 'terrace'],
      images: [
        'assets/images/property-3-1.jpg',
        'assets/images/property-3-2.jpg',
        'assets/images/property-3-3.jpg',
      ],
      availableFrom: new Date(2023, 8, 1),
      landlord: {
        id: 'L3',
        name: 'Pierre Dubois',
        email: 'pierre.dubois@example.com',
        phone: '0612345678'
      },
      verified: true,
      createdAt: new Date(2023, 5, 15),
      updatedAt: new Date(2023, 6, 20)
    }
  ];

  constructor() { }

  getProperties(): Observable<Property[]> {
    return of([...this.properties]).pipe(
      delay(600)
    );
  }

  getFeaturedProperties(limit: number = 3): Observable<Property[]> {
    return of(this.properties.filter(p => p.verified).slice(0, limit)).pipe(
      delay(600)
    );
  }

  getPropertyById(id: string): Observable<Property | undefined> {
    const property = this.properties.find(p => p.id === id);
    return of(property).pipe(
      delay(300)
    );
  }

  getFilteredProperties(filter: PropertyFilter): Observable<Property[]> {
    let filteredProperties = [...this.properties];
    
    // Filter by price range
    if (filter.priceMin !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price >= filter.priceMin!);
    }
    
    if (filter.priceMax !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price <= filter.priceMax!);
    }
    
    // Filter by size range
    if (filter.sizeMin !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.size >= filter.sizeMin!);
    }
    
    if (filter.sizeMax !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.size <= filter.sizeMax!);
    }
    
    // Filter by rooms
    if (filter.rooms && filter.rooms.length > 0) {
      filteredProperties = filteredProperties.filter(p => filter.rooms!.includes(p.rooms));
    }
    
    // Filter by property type
    if (filter.propertyTypes && filter.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter(p => 
        filter.propertyTypes!.includes(p.type as PropertyType)
      );
    }
    
    // Filter by furnished
    if (filter.furnished !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.furnished === filter.furnished);
    }
    
    // Filter by availability date
    if (filter.availableFrom !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.availableFrom <= filter.availableFrom!);
    }
    
    // Filter by features
    if (filter.features && filter.features.length > 0) {
      filteredProperties = filteredProperties.filter(p => 
        filter.features!.every(feature => p.features.includes(feature))
      );
    }
    
    // Filter by location
    if (filter.location) {
      const locationLower = filter.location.toLowerCase();
      filteredProperties = filteredProperties.filter(p => 
        p.location.city.toLowerCase().includes(locationLower) || 
        p.location.neighborhood.toLowerCase().includes(locationLower)
      );
    }
    
    return of(filteredProperties).pipe(
      delay(800)
    );
  }
}
