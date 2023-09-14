import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavMenuService } from '../../nav-menu.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectRole } from 'src/app/store/role.selectors';

@Component({
  selector: 'div[app-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../navbar.component.css']
})
export class MenuComponent {
  constructor(private navMenuService: NavMenuService, private store: Store<AppState>) { }

  roleId: number;

  @Input() menuDict: { [key: string]: string[]; };
  @Input() permissionDict: { [key: string]: string[]; };
  @Input() systemStatusDict: { [key: string]: string[]; };
  @Input() menuWithoutSystemControl: string[];
  @Input() isMenuCollapsed: boolean;
  @Output() isMenuCollapsedUpdated = new EventEmitter<boolean>();

  updateIsMenuCollapsed() {
    const updatedIsMenuCollapsed = true;
    this.isMenuCollapsedUpdated.emit(updatedIsMenuCollapsed);
  }

  menuToBeRendered: { [key: string]: string[]; } = {};

  async fetchJSON(roleId: number) {
    // Reset the menu currently rendered 
    this.menuToBeRendered = {};

    let permissionList: string[] = [];
    let systemStatusList: string[] = [];

    try {
      const response = await this.navMenuService.fetchData(roleId);
      permissionList = response.permissionList;
      const systemStatus: {} = response.systemStatus;

      // Push the system status returning true to the systemStatusList array
      for (const [key, value] of Object.entries(systemStatus)) {
        if (value === true) {
          systemStatusList.push(key);
        }
      }

      // Process and render the data 
      this.processData(permissionList, systemStatusList);
    } catch (error) {
      console.error(error);
    }
  }

  // Process the data to determine which menu should be rendered
  processData(permissionList: string[], systemStatusList: string[]) {
    let permissionMenu: string[] = [];

    // Look up permissionDict and add the menu with permission in permissionList to permissionMenu
    permissionList.forEach((item) => {
      if (this.permissionDict[item] !== undefined) {
        permissionMenu = permissionMenu.concat(this.permissionDict[item]);
        // If the menu is one of the menu that doesn't require System Control to be rendered, push it 
        // to menuToBeRendered directly
        this.permissionDict[item].forEach((menu) => {
          if (this.menuWithoutSystemControl.includes(menu)) {
            this.addToMenuToBeRendered(menu);
          }
        })
      }
    });

    // Add menu to menuToBeRendered if it is present in both permissionMenu AND corresponding column in systemStatusDict
    systemStatusList.forEach((status) => {
      this.systemStatusDict[status].forEach((menu) => {
        if (permissionMenu.includes(menu)) {
          this.addToMenuToBeRendered(menu);
        }
      });
    });
  }

  // Find the key in a dictionary by providing a value, the dictionary syntax has to be { string, [string. string] }
  findKeyByValue(dictionary: { [key: string]: string[]; }, targetValue: string): string | null {
    for (const key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
        if (dictionary[key].includes(targetValue)) {
          return key;
        }
      }
    }
    return null; // Key not found
  }

  // Add a level 2 menu to menuToBeRendered, if the corresponding level 1 menu doesn't exist create that too
  addToMenuToBeRendered(menu: string) {
    const key = this.findKeyByValue(this.menuDict, menu);
    const doesKeyExist = key && (key in this.menuToBeRendered);

    // Create a level 1 menu as key if it doesn't exist by looking up menuDict
    if (doesKeyExist === false) {
      key && (this.menuToBeRendered[key] = [menu]);
    } else { // If not, add the level 2 menu to the corresponding key (level 1 menu)  
      key && this.menuToBeRendered[key].push(menu);
    }
  }

  ngOnInit() {
    // Get default role id (1) and render it on init
    this.store.select(selectRole).subscribe(state => {
      this.roleId = state;
    });

    this.fetchJSON(Object.values(this.roleId)[0]);
  }
}
