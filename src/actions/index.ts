import { loginUser, loginWithGoogle, logout, registerUser } from './auth';
import * as auth from './auth/index';
import { editUser } from './auth/edit-user.action';
import { deleteUser } from './auth/delete-user.action';

export const server = {
  // actions

  // Auth
  registerUser,
  logout,
  loginUser,
  loginWithGoogle,
  auth,
  editUser,
  deleteUser,
};
