import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Property, PropertySearchParams, PropertySearchResponse } from '../models/property.model';
import { environment } from '../../../environments/environment';
import { MOCK_PROPERTIES } from '../mocks/properties.mock';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseUrl = `${environment.apiUrl}/properties`;
  
  constructor(private http: HttpClient) { }
  
  /**
   * Search for properties with filtering options
   */
  searchProperties(params: PropertySearchParams): Observable<PropertySearchResponse> {
    // In a real application, this would use HttpClient to call the API
    // For demo purposes, we'll filter the mock data
    if (environment.useMockData) {
      return this.mockSearchProperties(params);
    }
    
    let httpParams = new HttpParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => {
            httpParams = httpParams.append(`${key}[]`, item.toString());
          });
        } else if (value instanceof Date) {
          httpParams = httpParams.append(key, value.toISOString());
        } else {
          httpParams = httpParams.append(key, value.toString());
        }
      }
    });
    
    return this.http.get<PropertySearchResponse>(`${this.baseUrl}/search`, { params: httpParams })
      .pipe(
        catchError(error => {
          console.error('Error searching properties', error);
          return throwError(() => new Error('Failed to search properties. Please try again later.'));
        })
      );
  }
  
  /**
   * Get property details by ID
   */
  getPropertyById(id: string): Observable<Property> {
    if (environment.useMockData) {
      const property = MOCK_PROPERTIES.find(p => p.id === id);
      if (property) {
        return of(property).pipe(delay(300));
      }
      return throwError(() => new Error('Property not found'));
    }
    
    return this.http.get<Property>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error getting property details', error);
          return throwError(() => new Error('Failed to load property details. Please try again later.'));
        })
      );
  }
  
  /**
   * Get featured or recommended properties
   */
  getFeaturedProperties(limit: number = 6): Observable<Property[]> {
    if (environment.useMockData) {
      return of(MOCK_PROPERTIES.filter(p => p.verified).slice(0, limit))
        .pipe(delay(500));
    }
    
    return this.http.get<Property[]>(`${this.baseUrl}/featured`, {
      params: { limit: limit.toString() }
    }).pipe(
      catchError(error => {
        console.error('Error getting featured properties', error);
        return throwError(() => new Error('Failed to load featured properties. Please try again later.'));
      })
    );
  }
  
  /**
   * Get similar properties based on a reference property
   */
  getSimilarProperties(propertyId: string, limit: number = 4): Observable<Property[]> {
    if (environment.useMockData) {
      // For demo, just return random properties that aren't the same as the given ID
      return of(MOCK_PROPERTIES.filter(p => p.id !== propertyId)
        .sort(() => 0.5 - Math.random())
        .slice(0, limit))
        .pipe(delay(500));
    }
    
    return this.http.get<Property[]>(`${this.baseUrl}/${propertyId}/similar`, {
      params: { limit: limit.toString() }
    }).pipe(
      catchError(error => {
        console.error('Error getting similar properties', error);
        return throwError(() => new Error('Failed to load similar properties. Please try again later.'));
      })
    );
  }
  
  /**
   * Mock implementation of property search for demo purposes
   */
  private mockSearchProperties(params: PropertySearchParams): Observable<PropertySearchResponse> {
    const page = params.page || 0;
    const limit = params.limit || 12;
    
    // Apply filters
    let filteredProperties = [...MOCK_PROPERTIES];
    
    // Location filter
    if (params.location) {
      const locationLower = params.location.toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.location.city.toLowerCase().includes(locationLower) || 
        property.location.neighborhood.toLowerCase().includes(locationLower) ||
        property.location.address.toLowerCase().includes(locationLower)
      );
    }
    
    // Price range filter
    if (params.priceMin !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.price >= params.priceMin!
      );
    }
    
    if (params.priceMax !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.price <= params.priceMax!
      );
    }
    
    // Size range filter
    if (params.sizeMin !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.size >= params.sizeMin!
      );
    }
    
    if (params.sizeMax !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.size <= params.sizeMax!
      );
    }
    
    // Room count filter
    if (params.rooms && params.rooms.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        params.rooms!.includes(property.rooms)
      );
    }
    
    // Property type filter
    if (params.propertyTypes && params.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        params.propertyTypes!.includes(property.type)
      );
    }
    
    // Features filter
    if (params.features && params.features.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        params.features!.every(feature => property.features.includes(feature))
      );
    }
    
    // Furnished filter
    if (params.furnished !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.furnished === params.furnished
      );
    }
    
    // Availability date filter
    if (params.availableFrom !== undefined) {
      const availableFrom = new Date(params.availableFrom);
      filteredProperties = filteredProperties.filter(property => 
        new Date(property.availableFrom) <= availableFrom
      );
    }
    
    // Apply sorting
    if (params.sort) {
      filteredProperties = this.sortProperties(filteredProperties, params.sort);
    }
    
    // Paginate results
    const total = filteredProperties.length;
    const startIndex = page * limit;
    const paginatedProperties = filteredProperties.slice(startIndex, startIndex + limit);
    
    // Simulate network delay
    return of({
      properties: paginatedProperties,
      total,
      page,
      limit
    }).pipe(delay(800));
  }
  
  /**
   * Sort properties based on sort parameter
   */
  private sortProperties(properties: Property[], sortBy: string): Property[] {
    switch (sortBy) {
      case 'price_asc':
        return [...properties].sort((a, b) => a.price - b.price);
        
      case 'price_desc':
        return [...properties].sort((a, b) => b.price - a.price);
        
      case 'size_asc':
        return [...properties].sort((a, b) => a.size - b.size);
        
      case 'size_desc':
        return [...properties].sort((a, b) => b.size - a.size);
        
      case 'date_asc':
        return [...properties].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        
      case 'date_desc':
      default:
        return [...properties].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }
} 