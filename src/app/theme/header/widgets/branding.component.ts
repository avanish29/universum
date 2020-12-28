import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="universum-branding" href="#/">
      <img src="./assets/images/universum-logo.svg" class="universum-branding-logo-expanded" alt="logo" />
      <span class="universum-branding-name">Universum - Demo University</span>
    </a>
  `,
})
export class BrandingComponent {}
