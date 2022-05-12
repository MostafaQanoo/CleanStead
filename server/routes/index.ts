import { Router } from 'express';
import {
  getCategories,
  getCategoryServices,
  getContacts,
  addContact,
  signup,
  logout,
  signin,
  getBooks,
  postService,
  deleteService,
} from '../controllers';

const router = Router();
router.get('/categories', getCategories);
router.get('/categories/:id/services', getCategoryServices);
router.get('/book', getBooks);
router.post('/services', postService);
router.delete('/services/:id', deleteService);
router.route('/contact').get(getContacts).post(addContact);
router.post('/signup', signup);
router.get('/logout', logout);
router.post('/signin', signin);
export default router;
