import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {firstValueFrom} from 'rxjs';

export function featureTranslationResolver(featureName: string): ResolveFn<Promise<void>> {
  return async () => {
    const http = inject(HttpClient);
    const translate = inject(TranslateService);

    const lang = translate.getCurrentLang() || 'en';
    const path = `/assets/i18n/${featureName}/${lang}.json`;

    const translations = await firstValueFrom(http.get<Record<string, string>>(path));
    translate.setTranslation(lang, translations, true);
  }
}
