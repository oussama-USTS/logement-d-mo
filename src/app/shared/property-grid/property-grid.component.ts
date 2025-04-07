import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectChange } from '@angular/material/select';
import { Property } from '../../core/models/property.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PropertyCardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    PropertyCardComponent
  ]
})
export class PropertyGridComponent implements OnInit {
  @Input() properties: Property[] = [];
  @Input() loading: boolean = false;
  @Input() title: string = '';
  @Input() totalProperties: number | undefined;
  @Input() showHeader: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() pageSize: number = 12;
  @Input() currentPage: number = 0;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Input() sortBy: string = 'date_desc';
  
  @Output() paginate = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() sort = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
  @Output() propertySaved = new EventEmitter<string>();
  @Output() propertyUnsaved = new EventEmitter<string>();
  @Output() propertyClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: PageEvent): void {
    this.paginate.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize
    });
  }

  changeViewMode(event: MatButtonToggleChange): void {
    this.viewMode = event.value;
    this.viewModeChange.emit(this.viewMode);
  }

  changeSortOrder(event: MatSelectChange): void {
    this.sortBy = event.value;
    this.sort.emit(this.sortBy);
  }

  onPropertySaved(propertyId: string): void {
    this.propertySaved.emit(propertyId);
  }

  onPropertyUnsaved(propertyId: string): void {
    this.propertyUnsaved.emit(propertyId);
  }

  onPropertyClicked(propertyId: string): void {
    this.propertyClicked.emit(propertyId);
  }
} 