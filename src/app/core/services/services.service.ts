import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Service, ServiceCategory, ServiceOrder } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private services: Service[] = [
    {
      id: '1',
      name: 'Assurance habitation Settly',
      category: ServiceCategory.INSURANCE,
      description: 'Notre assurance habitation exclusive, conçue spécifiquement pour les locataires. Bénéficiez d\'une couverture complète à un tarif préférentiel avec une souscription simplifiée et une gestion 100% en ligne.',
      shortDescription: 'Assurance habitation à tarif préférentiel et souscription rapide',
      iconUrl: 'assets/icons/insurance.svg',
      imageUrl: 'assets/images/insurance-bg.jpg',
      price: 9.99,
      priceUnit: 'month',
      discountPercentage: 20,
      isPromoted: true,
      partnerName: 'MMA Assurances',
      partnerLogo: 'assets/logos/mma.png',
      rating: 4.7,
      reviewCount: 253,
      features: [
        'Responsabilité civile',
        'Dommages aux biens',
        'Vol et vandalisme',
        'Assistance 24/7',
        'Gestion 100% en ligne',
        'Résiliation facile'
      ]
    },
    {
      id: '2',
      name: 'Garantie Loyer Settly',
      category: ServiceCategory.DEPOSIT,
      description: 'Ne bloquez plus votre argent pour la caution ! Notre service de garantie loyer vous permet d\'emménager sans avancer le dépôt de garantie. Nous nous portons garant auprès de votre propriétaire, et vous remboursez la somme mensuellement à un taux avantageux.',
      shortDescription: 'Emménagez sans avancer la caution et payez mensuellement',
      iconUrl: 'assets/icons/deposit.svg',
      imageUrl: 'assets/images/deposit-bg.jpg',
      priceUnit: 'percentage',
      discountPercentage: 15,
      isPromoted: true,
      partnerName: 'Garantme',
      partnerLogo: 'assets/logos/garantme.png',
      rating: 4.5,
      reviewCount: 187,
      features: [
        'Pas d\'avance de caution',
        'Remboursement mensuel',
        'Pas de justificatif complexe',
        'Réponse sous 48h',
        'Accepté par la majorité des propriétaires',
        'Certification sécurisée'
      ]
    },
    {
      id: '3',
      name: 'Nettoyage professionnel',
      category: ServiceCategory.CLEANING,
      description: 'Service de nettoyage professionnel pour votre nouveau logement ou l\'ancien lors de votre départ. Nos équipes utilisent des produits écologiques et respectent un cahier des charges strict pour une propreté impeccable.',
      shortDescription: 'Nettoyage professionnel à l\'entrée ou à la sortie de votre logement',
      iconUrl: 'assets/icons/cleaning.svg',
      imageUrl: 'assets/images/cleaning-bg.jpg',
      price: 79.99,
      priceUnit: 'fixed',
      discountPercentage: 10,
      isPromoted: false,
      partnerName: 'CleanHome',
      partnerLogo: 'assets/logos/cleanhome.png',
      rating: 4.8,
      reviewCount: 321,
      features: [
        'Nettoyage complet du logement',
        'Produits écologiques',
        'Personnel qualifié',
        'Résultat garanti',
        'Réservation flexible',
        'Intervention rapide'
      ]
    },
    {
      id: '4',
      name: 'Déménagement tout compris',
      category: ServiceCategory.MOVING,
      description: 'Service de déménagement incluant l\'emballage, le transport et le déballage de vos affaires. Plusieurs formules disponibles selon vos besoins, avec une assurance complète pendant le transport.',
      shortDescription: 'Transport de vos biens avec emballage et déballage inclus',
      iconUrl: 'assets/icons/moving.svg',
      imageUrl: 'assets/images/moving-bg.jpg',
      price: 299.99,
      priceUnit: 'fixed',
      discountPercentage: 5,
      isPromoted: false,
      partnerName: 'Movinger',
      partnerLogo: 'assets/logos/movinger.png',
      rating: 4.6,
      reviewCount: 156,
      features: [
        'Devis personnalisé',
        'Emballage sécurisé',
        'Transport assuré',
        'Déballage et installation',
        'Équipe professionnelle',
        'Véhicules adaptés'
      ]
    },
    {
      id: '5',
      name: 'Internet Fibre Spécial Locataire',
      category: ServiceCategory.INTERNET,
      description: 'Offre internet fibre sans engagement, spécialement conçue pour les locataires. Installation rapide, service client dédié et possibilité de transférer votre abonnement en cas de déménagement sans frais.',
      shortDescription: 'Fibre optique sans engagement avec installation express',
      iconUrl: 'assets/icons/internet.svg',
      imageUrl: 'assets/images/internet-bg.jpg',
      price: 29.99,
      priceUnit: 'month',
      discountPercentage: 30,
      isPromoted: true,
      partnerName: 'Free',
      partnerLogo: 'assets/logos/free.png',
      rating: 4.3,
      reviewCount: 429,
      features: [
        'Fibre jusqu\'à 1 Gb/s',
        'Sans engagement',
        'Installation gratuite',
        'Modem dernière génération',
        'Transfert gratuit si déménagement',
        'Service client 7j/7'
      ]
    },
    {
      id: '6',
      name: 'Pack Énergie Verte',
      category: ServiceCategory.UTILITIES,
      description: 'Abonnement électricité et/ou gaz 100% vert et éthique, avec un tarif spécial pour les nouveaux emménagements. Mise en service rapide et gestion simplifiée de vos consommations via notre application.',
      shortDescription: 'Électricité et gaz 100% verts avec mise en service rapide',
      iconUrl: 'assets/icons/utilities.svg',
      imageUrl: 'assets/images/utilities-bg.jpg',
      price: 0,
      priceUnit: 'fixed',
      isPromoted: false,
      partnerName: 'Engie',
      partnerLogo: 'assets/logos/engie.png',
      rating: 4.4,
      reviewCount: 197,
      features: [
        'Énergie 100% renouvelable',
        'Mise en service sous 24h',
        'Gestion en ligne intuitive',
        'Prix compétitifs',
        'Facturation claire',
        'Service client réactif'
      ]
    },
    {
      id: '7',
      name: 'Location de meubles',
      category: ServiceCategory.FURNITURE,
      description: 'Louez des meubles de qualité pour votre logement sans engagement de durée. Livraison, montage et récupération inclus. Idéal pour les locations temporaires ou pour compléter votre mobilier existant.',
      shortDescription: 'Meubles en location avec livraison et montage inclus',
      iconUrl: 'assets/icons/furniture.svg',
      imageUrl: 'assets/images/furniture-bg.jpg',
      price: 89.99,
      priceUnit: 'month',
      discountPercentage: 10,
      isPromoted: false,
      partnerName: 'Rentomy',
      partnerLogo: 'assets/logos/rentomy.png',
      rating: 4.5,
      reviewCount: 112,
      features: [
        'Large choix de styles',
        'Livraison et montage inclus',
        'Sans engagement',
        'Meubles de qualité',
        'Échange possible',
        'Récupération gratuite'
      ]
    }
  ];

  private serviceOrders: ServiceOrder[] = [];

  constructor() { }

  getServices(): Observable<Service[]> {
    return of(this.services).pipe(
      delay(800)
    );
  }

  getServicesByCategory(category: ServiceCategory): Observable<Service[]> {
    const filteredServices = this.services.filter(s => s.category === category);
    return of(filteredServices).pipe(
      delay(600)
    );
  }

  getServiceById(id: string): Observable<Service | undefined> {
    const service = this.services.find(s => s.id === id);
    return of(service).pipe(
      delay(500)
    );
  }

  getPromotedServices(): Observable<Service[]> {
    const promotedServices = this.services.filter(s => s.isPromoted);
    return of(promotedServices).pipe(
      delay(700)
    );
  }

  orderService(userId: string, serviceId: string, propertyId?: string): Observable<ServiceOrder> {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    const newOrder: ServiceOrder = {
      id: `order-${Date.now()}`,
      userId,
      serviceId,
      propertyId,
      status: 'pending',
      price: service.price || 0,
      createdAt: new Date(),
      scheduledDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
    };

    this.serviceOrders.push(newOrder);
    return of(newOrder).pipe(
      delay(1000)
    );
  }

  getUserOrders(userId: string): Observable<ServiceOrder[]> {
    const userOrders = this.serviceOrders.filter(o => o.userId === userId);
    return of(userOrders).pipe(
      delay(800)
    );
  }
}
