import {Routes} from '@angular/router';
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
