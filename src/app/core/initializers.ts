import { APP_INITIALIZER } from '@angular/core';
import { MenuService } from './bootstrap/menu.service';

import { StartupService } from './bootstrap/startup.service';

export function StartupServiceFactory(startupService: StartupService, menu: MenuService ) {
  return () => startupService.loadConfiguration().then(() => menu.loadMenu());
}

export const AppInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService, MenuService],
    multi: true,
  },
];
