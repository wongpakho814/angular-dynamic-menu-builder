# Angular Dynamic Menu Builder

**Objective**: Create a single-page application (SPA) showcasing a dynamic horizontal menu bar.

## Table of Contents

- [Requirements](#requirements)
- [Usage](#usage)
- [Dynamic Menu Generation](#dynamic-menu-generation)
- [Menu Rendering Rules](#menu-rendering-rules)
- [Instructions](#instructions)
- [Technologies Used](#technologies-used)
- [License](#license)

## Requirements

### Menu Structure

The menu bar consists of two types of items:

1. **Level 1 Menu Item**: Directly displayed on the menu bar.
2. **Level 2 Menu Item**: A submenu under a Level 1 item, visible only when the associated Level 1 item is active.

### Dynamic Menu Generation

Menu items in the bar are dynamically rendered based on user permissions and system control.

- `permissionList`: A list showing the permissions a logged-in user possesses.
- `systemStatus`: An object detailing the status of each system control, indicating if a feature is enabled.

### Menu Rendering Rules

- Each Level 2 menu item is governed by both a system control and a permission to determine its visibility.
- If the system control is `false`, the corresponding Level 2 item won't be visible, regardless of permission.
- If the system control is `true`, the Level 2 item will show if the user has the necessary permission.
- A missing system control defaults to `false`.
- If none of the Level 2 items are enabled, the parent Level 1 item should also not be visible.

## Usage 

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Deployed

You can access the deployed application at https://wongpakho814.github.io/angular-dynamic-menu-builder/

## Technologies Used

- Angular
= CSS

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.