import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Subject, debounceTime, takeUntil } from 'rxjs';

// Imports nécessaires pour un composant standalone
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PropertyFilter, PropertyType } from '../../core/models/property.model';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ]
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  @Output() filterChanged = new EventEmitter<PropertyFilter>();
  @Input() expanded = true;
  
  filterForm: FormGroup;
  
  // Liste des valeurs possibles pour les filtres
  propertyTypes = [
    { value: PropertyType.APARTMENT, label: 'Appartement' },
    { value: PropertyType.HOUSE, label: 'Maison' },
    { value: PropertyType.STUDIO, label: 'Studio' },
    { value: PropertyType.LOFT, label: 'Loft' },
    { value: PropertyType.VILLA, label: 'Villa' },
    { value: PropertyType.DUPLEX, label: 'Duplex' },
    { value: PropertyType.ROOM, label: 'Chambre' }
  ];
  
  features = [
    { value: 'balcony', label: 'Balcon' },
    { value: 'elevator', label: 'Ascenseur' },
    { value: 'parking', label: 'Parking' },
    { value: 'garden', label: 'Jardin' },
    { value: 'terrace', label: 'Terrasse' },
    { value: 'washing_machine', label: 'Lave-linge' },
    { value: 'dishwasher', label: 'Lave-vaisselle' },
    { value: 'air_conditioning', label: 'Climatisation' }
  ];
  
  roomOptions = [1, 2, 3, 4, 5];
  
  selectedRooms: number[] = [];
  selectedPropertyTypes: string[] = [];
  selectedFeatures: string[] = [];
  
  hasActiveFilters = false;
  private destroy$ = new Subject<void>();
  
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      location: [''],
      priceMin: [null],
      priceMax: [null],
      sizeMin: [null],
      sizeMax: [null],
      furnished: [false],
      availableFrom: [null]
    });
  }
  
  ngOnInit(): void {
    // Émettre les changements de filtre après un court délai pour éviter trop d'appels
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.emitFilterChanges();
        this.checkActiveFilters();
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private emitFilterChanges(): void {
    const formValues = this.filterForm.value;
    
    const filter: PropertyFilter = {
      ...formValues,
      rooms: this.selectedRooms.length > 0 ? this.selectedRooms : undefined,
      propertyTypes: this.selectedPropertyTypes.length > 0 ? this.selectedPropertyTypes as PropertyType[] : undefined,
      features: this.selectedFeatures.length > 0 ? this.selectedFeatures : undefined
    };
    
    // Nettoyer les propriétés non définies ou nulles
    Object.keys(filter).forEach(key => {
      if (filter[key as keyof PropertyFilter] === null || filter[key as keyof PropertyFilter] === undefined) {
        delete filter[key as keyof PropertyFilter];
      }
    });
    
    this.filterChanged.emit(filter);
  }
  
  clearFilters(): void {
    this.filterForm.reset({
      location: '',
      priceMin: null,
      priceMax: null,
      sizeMin: null,
      sizeMax: null,
      furnished: false,
      availableFrom: null
    });
    
    this.selectedRooms = [];
    this.selectedPropertyTypes = [];
    this.selectedFeatures = [];
    
    this.hasActiveFilters = false;
    this.emitFilterChanges();
  }
  
  checkActiveFilters(): void {
    const formValues = this.filterForm.value;
    
    this.hasActiveFilters = 
      !!formValues.location ||
      formValues.priceMin !== null ||
      formValues.priceMax !== null ||
      formValues.sizeMin !== null ||
      formValues.sizeMax !== null ||
      formValues.furnished ||
      formValues.availableFrom !== null ||
      this.selectedRooms.length > 0 ||
      this.selectedPropertyTypes.length > 0 ||
      this.selectedFeatures.length > 0;
  }
  
  toggleRoomFilter(event: MatChipSelectionChange, roomValue: number): void {
    if (event.selected) {
      if (!this.selectedRooms.includes(roomValue)) {
        this.selectedRooms.push(roomValue);
      }
    } else {
      this.selectedRooms = this.selectedRooms.filter(room => room !== roomValue);
    }
    this.checkActiveFilters();
    this.emitFilterChanges();
  }
  
  togglePropertyType(event: MatCheckboxChange, propertyType: PropertyType): void {
    if (event.checked) {
      if (!this.selectedPropertyTypes.includes(propertyType)) {
        this.selectedPropertyTypes.push(propertyType);
      }
    } else {
      this.selectedPropertyTypes = this.selectedPropertyTypes.filter(type => type !== propertyType);
    }
    this.checkActiveFilters();
    this.emitFilterChanges();
  }
  
  toggleFeature(event: MatCheckboxChange, feature: string): void {
    if (event.checked) {
      if (!this.selectedFeatures.includes(feature)) {
        this.selectedFeatures.push(feature);
      }
    } else {
      this.selectedFeatures = this.selectedFeatures.filter(f => f !== feature);
    }
    this.checkActiveFilters();
    this.emitFilterChanges();
  }
  
  isRoomSelected(roomValue: number): boolean {
    return this.selectedRooms.includes(roomValue);
  }
}
