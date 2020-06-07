import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EnvironmentType } from '@shadow-arena-legends/shared/util-types';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.type === EnvironmentType.Production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
