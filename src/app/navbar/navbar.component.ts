import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { Store } from '@ngrx/store';
import { switchRole } from '../store/role.actions';
import { AppState } from '../store/app.state';
import { selectRole } from 'src/app/store/role.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css']
})
export class NavbarComponent {
  constructor(private store: Store<AppState>) {}

  roleId: number;

  isMenuCollapsed: boolean = true;
  onIsMenuCollapsedUpdated(updatedIsMenuCollapsed: boolean) {
    // Handle the updated isMenuCollapsed variable from the child component
    this.isMenuCollapsed = updatedIsMenuCollapsed;
  }

  menuDict = {
    menu_1: ["menu_1_1", "menu_1_2"],
    menu_2: ["menu_2_1", "menu_2_2", "menu_2_3", "menu_2_4"],
    menu_3: ["menu_3_1", "menu_3_2"],
    menu_4: ["menu_4_1", "menu_4_2", "menu_4_3"],
    menu_5: ["menu_5_1", "menu_5_2", "menu_5_3"],
    menu_6: ["menu_6_1", "menu_6_2"],
    menu_7: ["menu_7_1", "menu_7_2", "menu_7_3"]
  };

  permissionDict = {
    PERMISSION_1: ["menu_5_2", "menu_5_3"],
    PERMISSION_2: ["menu_7_1"],
    PERMISSION_3: ["menu_2_1"],
    PERMISSION_4: ["menu_2_2", "menu_6_2"],
    PERMISSION_6: ["menu_1_1", "menu_1_2"],
    PERMISSION_8: ["menu_3_1"],
    PERMISSION_12: ["menu_7_3"],
    PERMISSION_13: ["menu_5_1"],
    PERMISSION_14: ["menu_2_3"],
    PERMISSION_15: ["menu_2_4"],
    PERMISSION_16: ["menu_7_2"],
    PERMISSION_17: ["menu_6_1"],
    PERMISSION_18: ["menu_4_2"],
    PERMISSION_19: ["menu_4_3"],
    PERMISSION_26: ["menu_4_1"],
    PERMISSION_28: ["menu_3_2"],
  };

  systemStatusDict = {
    SYSTEM_CONTROL_1: ["menu_6_1", "menu_6_2"],
    SYSTEM_CONTROL_2: ["menu_1_1", "menu_1_2"],
    SYSTEM_CONTROL_3: ["menu_2_1"],
    SYSTEM_CONTROL_4: ["menu_2_3"],
    SYSTEM_CONTROL_5: ["menu_2_2"],
    SYSTEM_CONTROL_6: ["menu_7_1"],
    SYSTEM_CONTROL_7: ["menu_7_2"],
    SYSTEM_CONTROL_8: ["menu_3_2"],
    SYSTEM_CONTROL_9: ["menu_4_1"],
    SYSTEM_CONTROL_10: ["menu_7_3"],
    SYSTEM_CONTROL_12: ["menu_2_4"],
    SYSTEM_CONTROL_14: ["menu_5_1"],
    SYSTEM_CONTROL_15: ["menu_5_2"],
    SYSTEM_CONTROL_16: ["menu_5_3"],
  };
  
  // Menu which its corresponding System Control is null and only Permission is required
  menuWithoutSystemControl = ["menu_3_1", "menu_4_2", "menu_4_3"]

  // Call the fetchJSON() function in MenuComponent on switch role button click
  @ViewChild(MenuComponent, { static: false }) menuComponent: MenuComponent;

  callfetchJSON(roleId: number) {
    // Update the role id state according to which role id is clicked
    this.store.dispatch(switchRole({ newRoleId: roleId }));

    // Get the updated role id (state)
    this.store.select(selectRole).subscribe(state => {
      this.roleId = state;
    });

    // Call the fetchJSON() from MenuComponent (child component) with the new role id (state)
    this.menuComponent.fetchJSON(this.roleId);
  }
}
