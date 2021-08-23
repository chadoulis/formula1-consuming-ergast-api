import { Directive, HostListener } from '@angular/core'
import { NavigationService } from '../services/navigation.service'

@Directive({
  selector: '[forwardButton]'
})
export class ForwardButtonDirective {

  constructor(private navigation: NavigationService) {}

  @HostListener('click')
  onClick(): void {
    this.navigation.forward()
  }
}