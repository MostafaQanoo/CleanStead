import {
  serverError, clientError,
} from './errorHandle';
import { getCategories, getCategoryServices, postCategories } from './categories';
import { getContacts, addContact } from './contact';
import signup from './signup';
import logout from './logout';
import { checkAuth, checkAdmin } from './middlewares/auth';
import signin from './signin';
import { getBooks, getUserBooks, getBook } from './book';
import { postService, deleteService, putService } from './services';
import { validateLink } from './middlewares';

export {
  serverError,
  clientError,
  getCategories,
  getCategoryServices,
  getContacts,
  addContact,
  signup,
  logout,
  checkAuth,
  checkAdmin,
  signin,
  postCategories,
  getBooks,
  postService,
  putService,
  deleteService,
  getUserBooks,
  getBook,
  validateLink,
};
