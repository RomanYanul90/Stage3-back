import {Router} from 'express';
import auth from '../middleware/auth-middleware';
import {advertValidationParams} from '../middleware/validation-middleware';
import {
    CreateAdvert,
    GetAllAdverts,
    GetAdvertById,
    GetCurrentUserAdverts,
    GetAdvertsByOwnerName,
    FindAdvertBytitle,
    EditAdvert,
    DeleteAdvert
} from '../controllers/AdvertControllers'

const router = Router();

router.post('/create', auth, advertValidationParams, CreateAdvert);
router.get('/', auth, GetAllAdverts);
router.get('/byId/:id', auth, GetAdvertById);
router.get('/userAdverts', auth, GetCurrentUserAdverts);
router.get('/byOwnerName/:owner', auth, GetAdvertsByOwnerName);
router.get('/byTitle/:title', auth, FindAdvertBytitle);
router.patch('/editAdvert/:id', auth, EditAdvert);
router.delete('/deleteAdvert/:id', auth, DeleteAdvert);

export default router