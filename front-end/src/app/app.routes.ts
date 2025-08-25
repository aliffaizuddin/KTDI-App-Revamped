import { Routes } from '@angular/router';
import {featureTranslationResolver} from './shared/feature-translation-resolver';
import {AuthenticationComponent} from './module/authentication/authentication.component';
import {HomeComponent} from './module/home/home.component';
import {DashboardComponent} from './module/dashboard/dashboard.component';
import {FeedbackComponent} from './module/feedback/feedback.component';
import {HallBookingComponent} from './module/hall-booking/hall-booking.component';
import {ReportDamageComponent} from './module/report-damage/report-damage.component';
import {RoomBookingComponent} from './module/room-booking/room-booking.component';
import {authGuard} from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    resolve: {
      translations: featureTranslationResolver('authentication'),
    }
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    resolve: {
      translations: featureTranslationResolver('authentication')
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      translations: featureTranslationResolver('home')
    },
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      translations: featureTranslationResolver('dashboard')
    },
    canActivate: [authGuard]
  },
  {
    path: 'electrical-appliance',
    component: HomeComponent,
    resolve: {
      translations: featureTranslationResolver('electrical-appliance')
    },
    canActivate: [authGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    resolve: {
      translations: featureTranslationResolver('feedback')
    },
    canActivate: [authGuard]
  },
  {
    path: 'hall-booking',
    component: HallBookingComponent,
    resolve: {
      translations: featureTranslationResolver('hall-booking')
    },
    canActivate: [authGuard]
  },
  {
    path: 'report-damage',
    component: ReportDamageComponent,
    resolve: {
      translations: featureTranslationResolver('report-damage')
    },
    canActivate: [authGuard]
  },
  {
    path: 'room-booking',
    component: RoomBookingComponent,
    resolve: {
      translations: featureTranslationResolver('room-booking')
    },
    canActivate: [authGuard]
  }
];
