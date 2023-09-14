import { createReducer, on } from "@ngrx/store";
import { switchRole } from "./role.actions";
import { AppState } from "./app.state";

export const initialState: AppState = {
  roleId: 1
}; 

export const roleReducer = createReducer(
  initialState, 
  on(switchRole, (state: AppState, { newRoleId }) => {
    return state = newRoleId;
  })
)