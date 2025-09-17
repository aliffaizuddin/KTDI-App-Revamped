import {Routes} from '@angular/router';
import {AuthenticationComponent} from './features/authentication/authentication.component';
import {HomeComponent} from './features/home/home.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {FeedbackComponent} from './features/feedback/feedback.component';
import {HallBookingComponent} from './features/hall-booking/hall-booking.component';
import {ReportDamageComponent} from './features/report-damage/report-damage.component';
import {RoomBookingComponent} from './features/room-booking/room-booking.component';
import {authGuard} from './core/interceptors/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'electrical-appliance',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [authGuard]
  },
  {
    path: 'hall-booking',
    component: HallBookingComponent,
    canActivate: [authGuard]
  },
  {
    path: 'report-damage',
    component: ReportDamageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'room-booking',
    component: RoomBookingComponent,
    canActivate: [authGuard]
  },
];
