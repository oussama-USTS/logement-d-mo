import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

// Imports nécessaires pour un composant standalone
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  // Configuration comme composant standalone
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class SidebarComponent implements OnInit {
  @Output() closeSidebar = new EventEmitter<void>();
  
  currentUser$: Observable<User | null>;
  currentYear: number = new Date().getFullYear();
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.closeSidebar.emit();
  }

  login(): void {
    // In a real app, this would redirect to a login page or open a dialog
    // For demo, we'll use the test user
    this.authService.login('thomas.durand@example.com', 'password123').subscribe({
      next: () => {
        this.close();
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }

  register(): void {
    this.router.navigate(['/register']);
    this.close();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      this.close();
    });
  }
}
