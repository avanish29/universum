import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { TokenService } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  loginUnsubscribe$: Subject<boolean> = new Subject();  
  firstName: String = "";
  lastName: String = "";
  avatar: String= "";
  
  @Input() showToggle = false;
  @Input() showBranding = false;

  isLoggedIn = false;  

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  constructor(private token: TokenService) {
  }

  ngOnInit() {
    this.token.change.pipe(takeUntil(this.loginUnsubscribe$))
      .subscribe(token => {
        if(token && Object.keys(token).length !== 0) {
          this.firstName = token.firstName;
          this.lastName = token.lastName;
          this.avatar = token.avatar;
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
    });
  }

  toggleFullscreen() {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }
}
