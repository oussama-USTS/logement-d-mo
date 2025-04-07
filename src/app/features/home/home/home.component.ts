import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  loading: boolean = false;
  isScrolled: boolean = false;
  cities: string[] = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice', 'Toulouse', 'Strasbourg', 'Montpellier', 'Nantes'];
  propertyTypes: string[] = ['Appartement', 'Maison', 'Studio', 'Loft', 'Villa', 'Duplex', 'Penthouse'];
  emailSubscription: string = '';
  
  // Propriétés fictives pour la démo
  featuredProperties = [
    {
      id: '1',
      title: 'Magnifique appartement lumineux avec vue panoramique',
      description: 'Superbe appartement de 3 pièces en plein cœur de Paris. Entièrement rénové avec des finitions haut de gamme, lumineux et spacieux.',
      price: 1350,
      type: 'Appartement',
      size: 75,
      rooms: 3,
      bathrooms: 1,
      location: {
        city: 'Paris',
        neighborhood: 'Le Marais'
      },
      features: ['Balcon', 'Ascenseur', 'Parking', 'Vue exceptionnelle'],
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
    },
    {
      id: '2',
      title: 'Studio moderne idéalement situé au cœur de Lyon',
      description: 'Studio fonctionnel et moderne, parfait pour étudiant ou jeune professionnel. Proche de toutes commodités et des transports.',
      price: 650,
      type: 'Studio',
      size: 35,
      rooms: 1,
      bathrooms: 1,
      location: {
        city: 'Lyon',
        neighborhood: 'Presqu\'île'
      },
      features: ['Meublé', 'Cuisine équipée', 'Internet fibre'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
    },
    {
      id: '3',
      title: 'Maison familiale avec jardin dans quartier résidentiel',
      description: 'Belle maison familiale avec jardin et terrasse dans un quartier calme et résidentiel. Idéale pour famille avec enfants.',
      price: 1800,
      type: 'Maison',
      size: 120,
      rooms: 5,
      bathrooms: 2,
      location: {
        city: 'Bordeaux',
        neighborhood: 'Caudéran'
      },
      features: ['Jardin', 'Terrasse', 'Garage', 'Climatisation'],
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
    },
    {
      id: '4',
      title: 'Loft industriel rénové au cœur de Marseille',
      description: 'Magnifique loft industriel entièrement rénové avec matériaux de qualité. Espace de vie ouvert et lumineux.',
      price: 1100,
      type: 'Loft',
      size: 90,
      rooms: 2,
      bathrooms: 1,
      location: {
        city: 'Marseille',
        neighborhood: 'Le Panier'
      },
      features: ['Hauteur sous plafond', 'Style industriel', 'Cuisine ouverte'],
      image: 'https://images.unsplash.com/photo-1574739782594-db4ead022697?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
    },
    {
      id: '5',
      title: 'Villa contemporaine avec piscine près de Nice',
      description: 'Magnifique villa contemporaine avec piscine et vue mer. Architecture moderne et prestations haut de gamme.',
      price: 2500,
      type: 'Villa',
      size: 180,
      rooms: 6,
      bathrooms: 3,
      location: {
        city: 'Nice',
        neighborhood: 'Mont Boron'
      },
      features: ['Piscine', 'Vue mer', 'Jardin', 'Terrasse', 'Parking'],
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
    },
    {
      id: '6',
      title: 'Penthouse luxueux avec terrasse panoramique',
      description: 'Somptueux penthouse avec terrasse offrant une vue à 360° sur la ville. Prestations exceptionnelles et finitions luxueuses.',
      price: 3200,
      type: 'Penthouse',
      size: 150,
      rooms: 4,
      bathrooms: 2,
      location: {
        city: 'Paris',
        neighborhood: 'Trocadéro'
      },
      features: ['Terrasse panoramique', 'Ascenseur privatif', 'Domotique', 'Sécurité'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
    }
  ];

  // Données pour les témoignages
  testimonials = [
    {
      content: "J'ai trouvé mon appartement parfait en moins d'une semaine grâce à cette plateforme incroyable. L'interface est intuitive et les filtres de recherche sont précis. Je recommande vivement !",
      userName: "Sophie Martin",
      location: "Paris, France",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      content: "En tant que propriétaire, j'ai pu louer mon appartement en un temps record. Le processus de mise en ligne est simple et l'équipe d'assistance est très réactive. Un service premium !",
      userName: "Thomas Dubois",
      location: "Lyon, France",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      content: "J'étais stressée à l'idée de chercher un logement dans une nouvelle ville, mais cette plateforme a rendu tout le processus agréable. Les photos HD et les visites virtuelles m'ont permis de faire un choix en toute confiance.",
      userName: "Camille Leroy",
      location: "Bordeaux, France",
      rating: 4.5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Simuler un chargement initial
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  search(): void {
    if (this.searchQuery.trim()) {
      // Simuler une recherche pour la démo
      this.snackBar.open(`Recherche en cours pour : ${this.searchQuery}`, 'Fermer', { 
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } else {
      this.snackBar.open('Veuillez entrer une destination', 'Fermer', { 
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  navigateToSearch(filter?: any): void {
    // Simuler la navigation pour la démo
    this.snackBar.open(`Navigation vers la recherche avec filtre: ${JSON.stringify(filter)}`, 'Fermer', { 
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  addToFavorites(propertyId: string, event: Event): void {
    event.stopPropagation();
    this.snackBar.open(`Propriété ${propertyId} ajoutée aux favoris`, 'Fermer', { 
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  subscribeToNewsletter(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (this.emailSubscription && emailRegex.test(this.emailSubscription)) {
      this.snackBar.open('Merci de vous être inscrit à notre newsletter !', 'Fermer', { 
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.emailSubscription = '';
    } else {
      this.snackBar.open('Veuillez entrer une adresse email valide', 'Fermer', { 
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
