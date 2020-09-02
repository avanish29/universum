import { APP_INITIALIZER } from '@angular/core';

import { StartupService } from './bootstrap/startup.service';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.loadConfiguration();
}

export const AppInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
