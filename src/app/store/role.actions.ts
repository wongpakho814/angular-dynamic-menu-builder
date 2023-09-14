import { createAction, props } from "@ngrx/store";

export const switchRole = createAction("[Role] Switch Role", props<{ newRoleId: any }>());