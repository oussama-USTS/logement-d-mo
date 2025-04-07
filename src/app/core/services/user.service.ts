import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { User, UserNotification } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Get user profile information
   */
  getUserProfile(): Observable<User> {
    if (environment.useMockData) {
      const user = this.authService.getCurrentUser();
      if (user) {
        return of(user).pipe(delay(300));
      }
      return of({} as User);
    }
    
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  /**
   * Update user profile
   */
  updateProfile(profileData: Partial<User>): Observable<User> {
    if (environment.useMockData) {
      // In a real app, this would call API
      return of({} as User).pipe(delay(500));
    }
    
    return this.http.patch<User>(`${this.baseUrl}/me`, profileData);
  }

  /**
   * Get user notifications
   */
  getUserNotifications(): Observable<UserNotification[]> {
    if (environment.useMockData) {
      // Mock notifications
      const notifications: UserNotification[] = [
        {
          id: '1',
          userId: '1',
          title: 'Nouveau message',
          message: 'Vous avez reçu un nouveau message de Sophie Martin.',
          type: 'message',
          read: false,
          link: '/messages/1',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: '2',
          userId: '1',
          title: 'Rappel de visite',
          message: 'Rappel: Visite de l\'appartement demain à 14h.',
          type: 'property',
          read: true,
          link: '/properties/1',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          id: '3',
          userId: '1',
          title: 'Dossier en attente',
          message: 'Votre dossier est en cours d\'examen par le propriétaire.',
          type: 'application',
          read: false,
          link: '/dashboard/applications',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      ];
      return of(notifications).pipe(delay(300));
    }
    
    return this.http.get<UserNotification[]>(`${this.baseUrl}/me/notifications`);
  }

  /**
   * Get count of unread notifications
   */
  getUnreadNotificationsCount(): Observable<number> {
    if (environment.useMockData) {
      return this.getUserNotifications().pipe(
        map(notifications => notifications.filter(n => !n.read).length)
      );
    }
    
    return this.http.get<number>(`${this.baseUrl}/me/notifications/unread/count`);
  }

  /**
   * Mark notification as read
   */
  markNotificationAsRead(notificationId: string): Observable<boolean> {
    if (environment.useMockData) {
      return of(true).pipe(delay(200));
    }
    
    return this.http.patch<any>(`${this.baseUrl}/me/notifications/${notificationId}/read`, {}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Check if a property is saved by the current user
   */
  isPropertySaved(propertyId: string): Observable<boolean> {
    if (environment.useMockData) {
      const user = this.authService.getCurrentUser();
      if (user && user.savedProperties) {
        return of(user.savedProperties.includes(propertyId)).pipe(delay(100));
      }
      return of(false).pipe(delay(100));
    }
    
    return this.http.get<boolean>(`${this.baseUrl}/me/saved-properties/${propertyId}`);
  }

  /**
   * Save a property to user's favorites
   */
  saveProperty(propertyId: string): Observable<boolean> {
    if (environment.useMockData) {
      const user = this.authService.getCurrentUser();
      if (user) {
        if (!user.savedProperties) {
          user.savedProperties = [];
        }
        if (!user.savedProperties.includes(propertyId)) {
          user.savedProperties.push(propertyId);
          // In a real app, this would be persisted to a backend
        }
        return of(true).pipe(delay(300));
      }
      return of(false).pipe(delay(300));
    }
    
    return this.http.post<any>(`${this.baseUrl}/me/saved-properties`, { propertyId }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Remove a property from user's favorites
   */
  unsaveProperty(propertyId: string): Observable<boolean> {
    if (environment.useMockData) {
      const user = this.authService.getCurrentUser();
      if (user && user.savedProperties) {
        user.savedProperties = user.savedProperties.filter(id => id !== propertyId);
        // In a real app, this would be persisted to a backend
        return of(true).pipe(delay(300));
      }
      return of(true).pipe(delay(300));
    }
    
    return this.http.delete<any>(`${this.baseUrl}/me/saved-properties/${propertyId}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Get user's saved properties
   */
  getSavedProperties(): Observable<string[]> {
    if (environment.useMockData) {
      const user = this.authService.getCurrentUser();
      if (user && user.savedProperties) {
        return of(user.savedProperties).pipe(delay(300));
      }
      return of([]).pipe(delay(300));
    }
    
    return this.http.get<string[]>(`${this.baseUrl}/me/saved-properties`);
  }
}
