import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule
  ],
  templateUrl: './button.component.html',
  standalone: true,
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() loading = false;
  @Output() onClick = new EventEmitter<Event>();
}
