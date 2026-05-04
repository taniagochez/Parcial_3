import { loginUser, loginWithGoogle, logout, registerUser } from './auth';
import * as auth from './auth/index';

export const server = {
  // actions

  // Auth
  registerUser,
  logout,
  loginUser,
  loginWithGoogle,
  auth,
};
