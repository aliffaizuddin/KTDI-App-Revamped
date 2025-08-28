import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  AuthenticationPage,
  ElectricalAppliancePage,
  HallBookingPage,
  HomePage, ReportDamagePage, RoomRegistrationPage,
  StudentFeedbackPage
} from './shared/utils/page-enums';

export const AppPages = {
  Authentication: AuthenticationPage,
  Home: HomePage,
  HallBooking: HallBookingPage,
  ElectricalAppliance: ElectricalAppliancePage,
  RoomRegistration: RoomRegistrationPage,
  ReportDamage: ReportDamagePage,
  StudentFeedback: StudentFeedbackPage
} as const;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
  constructor() {}
}
