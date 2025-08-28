import { Component } from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-toggle-language',
  imports: [],
  templateUrl: './toggle-language.component.html',
  standalone: true,
  styleUrl: './toggle-language.component.css'
})
export class ToggleLanguageComponent {
  constructor(private langService: LanguageService) {}

  changeLanguage(lang: string) {
    this.langService.changeLanguage(lang);
  }

  get currentLang(): string {
    return this.langService.currentLang || 'en';
  }
}
