import { Component } from '@angular/core';
import { NavMenuService } from '../nav-menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private navMenuService: NavMenuService) { }

  isMenuCollapsed = true;
  permissionList = [];
  systemStatusList = [];

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

  async fetchJSON(roleId: number) {
    try {
      const response = await this.navMenuService.fetchData(roleId);
      this.permissionList = response.permissionList;
      this.systemStatusList = response.systemStatus;

      // Process the data and update menuToBeRendered and other data accordingly
      // this.processData(response.systemStatus);
      // this.renderMenu();
      console.log(response, this.permissionList, this.systemStatusList);
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    // Default to roleId = 1
    this.fetchJSON(1);
  }
}
