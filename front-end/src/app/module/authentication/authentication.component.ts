import { Component } from '@angular/core';
import {ButtonComponent} from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-authentication',
  imports: [ButtonComponent],
  templateUrl: './authentication.component.html',
  standalone: true,
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

}
