import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'formula';
  
  private routerEventSubscription: Subscription;

  constructor(public router: Router){}
  
  ngOnInit (){
    this.routerEventSubscription = this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof RoutesRecognized:
          this.title = (<RoutesRecognized>event).state.root.firstChild.data['title'];
          //this.titleService.setTitle(`${this.title} - Quantified Self`);
          break;
        case event instanceof NavigationStart:
          //this.loading = true;
          break;
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          //this.loading = false;
          break;
        default: {
          break;
        }
      }
    });
  }
}
