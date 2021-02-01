import { Router } from 'express';
import auth from '../middleware/auth-middleware';
import { advertValidationParams } from '../middleware/validation-middleware';
import {
  createAdvert,
  getAllAdverts,
  getAdvertById,
  getCurrentUserAdverts,
  getAdvertsByOwnerName,
  findAdvertByTitle,
  editAdvert,
  deleteAdvert,
} from '../controllers/AdvertControllers';

const router = Router();

router.post('/create', auth, advertValidationParams, createAdvert);
router.get('/', auth, getAllAdverts);
router.get('/byId/:id', auth, getAdvertById);
router.get('/userAdverts', auth, getCurrentUserAdverts);
router.get('/byOwnerName/:owner', auth, getAdvertsByOwnerName);
router.get('/byTitle/:title', auth, findAdvertByTitle);
router.patch('/editAdvert/:id', auth, editAdvert);
router.delete('/deleteAdvert/:id', auth, deleteAdvert);

export default router;
