import { UserModel } from "../../models/user.model";

export interface AuthState{
    user: UserModel | null
}

export const initialState:AuthState={
    user:null
}