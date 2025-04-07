import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  // Observable stream of the current user
  currentUser$ = this.currentUserSubject.asObservable();
  
  // Mock user for demo purposes
  private mockUser: User = {
    id: 'user1',
    email: 'thomas.durand@example.com',
    firstName: 'Thomas',
    lastName: 'Durand',
    profileImage: 'assets/images/users/user1.jpg',
    phone: '+33 6 12 34 56 78',
    role: 'tenant',
    savedProperties: ['1', '3', '5'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-20')
  };

  constructor(private http: HttpClient) {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  /**
   * Login user with email and password
   */
  login(email: string, password: string): Observable<User> {
    if (environment.useMockData) {
      // Simulate login with mock user
      if (email === this.mockUser.email && password) {
        localStorage.setItem('currentUser', JSON.stringify(this.mockUser));
        this.currentUserSubject.next(this.mockUser);
        return of(this.mockUser).pipe(delay(800));
      }
      return throwError(() => new Error('Invalid email or password')).pipe(delay(800));
    }
    
    return this.http.post<{ user: User; token: string }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map(response => {
          const user = response.user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          console.error('Login failed', error);
          return throwError(() => new Error('Failed to login. Please check your credentials.'));
        })
      );
  }

  /**
   * Register a new user
   */
  register(user: Partial<User>, password: string): Observable<User> {
    if (environment.useMockData) {
      // For demo, just return mock user with a delay
      return of(this.mockUser).pipe(delay(1000));
    }
    
    return this.http.post<{ user: User; token: string }>(`${this.baseUrl}/register`, { ...user, password })
      .pipe(
        map(response => {
          const newUser = response.user;
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(newUser);
          return newUser;
        }),
        catchError(error => {
          console.error('Registration failed', error);
          return throwError(() => new Error('Failed to register. Please try again later.'));
        })
      );
  }

  /**
   * Logout the current user
   */
  logout(): Observable<boolean> {
    if (environment.useMockData) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      return of(true).pipe(delay(200));
    }
    
    return this.http.post<void>(`${this.baseUrl}/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
        }),
        map(() => true),
        catchError(() => {
          // Even if API call fails, we'll still log out on the client
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
          return of(true);
        })
      );
  }

  /**
   * Get the currently logged in user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if a user is currently logged in
   */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Check if current user has a specific role
   */
  hasRole(role: 'tenant' | 'landlord' | 'admin'): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }

  /**
   * Update user profile - for demo purposes
   */
  updateUserProfile(updates: Partial<User>): Observable<User> {
    if (environment.useMockData) {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return throwError(() => new Error('No user logged in'));
      }
      
      // Update the mock user
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
      
      return of(updatedUser).pipe(delay(500));
    }
    
    return this.http.patch<User>(`${environment.apiUrl}/users/me`, updates)
      .pipe(
        tap(updatedUser => {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        }),
        catchError(error => {
          console.error('Profile update failed', error);
          return throwError(() => new Error('Failed to update profile. Please try again later.'));
        })
      );
  }
}
