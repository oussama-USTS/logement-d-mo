import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User, UserNotification } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';

// Imports nécessaires pour un composant standalone
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // Configuration comme composant standalone
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ]
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  isLoggedIn$: Observable<User | null>;
  currentUser$: Observable<User | null>;
  notifications$: Observable<UserNotification[]>;
  unreadNotificationsCount$: Observable<number>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.isLoggedIn$ = this.authService.currentUser$;
    this.currentUser$ = this.authService.currentUser$;
    this.notifications$ = this.userService.getUserNotifications();
    this.unreadNotificationsCount$ = this.userService.getUnreadNotificationsCount();
  }

  ngOnInit(): void {
  }

  toggleSideNav(): void {
    this.toggleSidebar.emit();
  }

  openLoginDialog(): void {
    // This would normally open a login dialog
    // For demo purposes, let's just log in with a test user
    this.authService.login('thomas.durand@example.com', 'password123').subscribe({
      next: () => {
        this.refreshUserData();
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }

  openRegisterDialog(): void {
    // In a real app, this would open a registration dialog
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  refreshUserData(): void {
    this.notifications$ = this.userService.getUserNotifications();
    this.unreadNotificationsCount$ = this.userService.getUnreadNotificationsCount();
  }

  openNotification(notification: UserNotification): void {
    // Mark as read
    this.userService.markNotificationAsRead(notification.id).subscribe(() => {
      // Refresh notifications count
      this.unreadNotificationsCount$ = this.userService.getUnreadNotificationsCount();
      
      // Navigate to linked content if available
      if (notification.link) {
        this.router.navigateByUrl(notification.link);
      }
    });
  }

  markAllAsRead(): void {
    // In a real app, this would call a service method to mark all as read
    // For demo purposes, let's refresh the data
    this.refreshUserData();
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'property':
        return 'home';
      case 'message':
        return 'chat';
      case 'application':
        return 'assignment';
      case 'service':
        return 'build';
      case 'system':
        return 'info';
      default:
        return 'notifications';
    }
  }

  getNotificationIconClass(type: string): string {
    return `notification-icon ${type}-icon`;
  }
}
