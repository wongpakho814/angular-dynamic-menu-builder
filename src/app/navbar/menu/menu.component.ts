import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'div[app-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../navbar.component.css']
})
export class MenuComponent {
  @Input() isMenuCollapsed: boolean;
  @Output() isMenuCollapsedUpdated = new EventEmitter<boolean>();

  updateIsMenuCollapsed() {
    const updatedIsMenuCollapsed = true;
    this.isMenuCollapsedUpdated.emit(updatedIsMenuCollapsed);
  }
}
