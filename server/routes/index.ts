import { Router } from 'express';
import {
  getCategories,
  getCategoryServices,
  postCategories,
  getContacts,
  addContact,
  signup,
  logout,
  signin,
  getBooks,
  postService,
  putCategories,
  putService,
  deleteService,
  archivedCategory,
  getUserBooks,
  getBook,
  postBook,
  validateLink,
  signinAdmin,
  // checkAdmin,
  checkAuth,
  getStatus,
  deleteBook,
} from '../controllers';

const router = Router();
router.get('/categories', getCategories);
router.get('/categories/:id/services', validateLink, getCategoryServices);
router.post('/services', postService);
router.delete('/categories/:id', validateLink, archivedCategory);
router.put('/services/:id', validateLink, checkAuth, putService);
router.delete('/services/:id', validateLink, checkAuth, deleteService);
router.route('/contact').get(getContacts).post(addContact);
router.post('/signup', signup);
router.get('/logout', logout);
router.put('/categories/:id', validateLink, putCategories);
router.delete('/book/:id', validateLink, deleteBook);
router.route('/contact').get(getContacts).post(addContact);
router.post('/signup', signup);
router.get('/logout', logout);
router.post('/signin', signin);
router.post('/admin/signin', signinAdmin);
router.get('/book/status', getStatus);
router.get('/book', getBooks);
router.get('/book/:id', validateLink, getBook);
router.get('/user/:id/book', validateLink, getUserBooks);
router.post('/book', checkAuth, postBook);
// router.use(checkAdmin);
router.post('/services', postService);
router.post('/categories', postCategories);
router.put('/services/:id', validateLink, putService);
router.delete('/services/:id', validateLink, deleteService);
router.put('/categories/:id', validateLink, putCategories);
export default router;
