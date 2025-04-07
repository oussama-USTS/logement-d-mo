import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Composants Standalone
import { PropertyCardComponent } from './property-card/property-card.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { PropertyMapComponent } from './property-map/property-map.component';

// Liste de tous les modules Material
const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatChipsModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTabsModule,
  MatExpansionModule,
  MatDividerModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatListModule,
  MatMenuModule,
  MatStepperModule,
  ClipboardModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [
    // Plus de composants déclarés ici, tous sont standalone
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    
    // Importer les composants standalone
    PropertyCardComponent,
    FilterPanelComponent,
    PropertyGridComponent,
    PropertyMapComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    
    // Exporter les composants standalone
    PropertyCardComponent,
    FilterPanelComponent,
    PropertyGridComponent,
    PropertyMapComponent
  ]
})
export class SharedModule { }
