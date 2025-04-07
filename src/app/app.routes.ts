import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./features/property-search/property-search.module').then(m => m.PropertySearchModule)
      },
      {
        path: 'properties/:id',
        loadChildren: () => import('./features/property-details/property-details.module').then(m => m.PropertyDetailsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
