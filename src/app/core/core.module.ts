import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PropertyService } from './services/property.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    // Les composants standalone ne peuvent pas être déclarés ici
    // Ils doivent être importés
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    
    // Import des composants standalone
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UserService,
    PropertyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
