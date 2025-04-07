import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Property } from '../../core/models/property.model';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

// Imports nécessaires pour un composant standalone
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
  // Configuration comme composant standalone
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class PropertyCardComponent implements OnInit, OnChanges {
  @Input() property!: Property;
  @Input() horizontal: boolean = false;
  @Input() savedStatus?: boolean;
  
  @Output() saved = new EventEmitter<string>();
  @Output() unsaved = new EventEmitter<string>();
  @Output() clicked = new EventEmitter<string>();

  isSaved: boolean = false;
  displayedFeatures: string[] = [];
  remainingFeatures: string[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.processFeatures();
    this.checkSavedStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property']) {
      this.processFeatures();
    }
    if (changes['savedStatus'] && changes['savedStatus'].currentValue !== undefined) {
      this.isSaved = changes['savedStatus'].currentValue;
    }
  }

  processFeatures(): void {
    if (this.property && this.property.features) {
      this.displayedFeatures = this.property.features.slice(0, 3);
      this.remainingFeatures = this.property.features.slice(3);
    }
  }

  checkSavedStatus(): void {
    if (this.savedStatus !== undefined) {
      this.isSaved = this.savedStatus;
      return;
    }

    this.userService.isPropertySaved(this.property.id).subscribe(saved => {
      this.isSaved = saved;
    });
  }

  getPriceUnitLabel(unit: 'month' | 'week' | 'day'): string {
    switch (unit) {
      case 'month': return 'mois';
      case 'week': return 'semaine';
      case 'day': return 'jour';
      default: return 'mois';
    }
  }

  viewDetails(event: Event): void {
    event.stopPropagation();
    this.clicked.emit(this.property.id);
    this.router.navigate(['/properties', this.property.id]);
  }

  toggleSave(event: Event): void {
    event.stopPropagation();
    
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Veuillez vous connecter pour ajouter ce logement à vos favoris.', 'Se connecter', {
        duration: 5000
      }).onAction().subscribe(() => {
        // Open login dialog or redirect to login page
        this.router.navigate(['/login']);
      });
      return;
    }

    if (this.isSaved) {
      this.userService.unsaveProperty(this.property.id).subscribe(success => {
        if (success) {
          this.isSaved = false;
          this.unsaved.emit(this.property.id);
          this.snackBar.open('Logement retiré de vos favoris.', 'Fermer', {
            duration: 3000
          });
        }
      });
    } else {
      this.userService.saveProperty(this.property.id).subscribe(success => {
        if (success) {
          this.isSaved = true;
          this.saved.emit(this.property.id);
          this.snackBar.open('Logement ajouté à vos favoris !', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  share(event: Event): void {
    event.stopPropagation();
    
    // In a real app, this would open a share dialog with options
    // For demo purposes, simulate copy to clipboard
    const url = `${window.location.origin}/properties/${this.property.id}`;
    
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Lien copié dans le presse-papier !', 'Fermer', {
        duration: 3000
      });
    }).catch(() => {
      this.snackBar.open('Impossible de copier le lien. URL: ' + url, 'Fermer', {
        duration: 5000
      });
    });
  }
}
