import {Router} from 'express';
import {check, validationResult} from 'express-validator';
import auth from '../middleware/auth-middleware';
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

router.post(
    '/create',
    auth,
    [
        check('title', "Invalid title").isLength({min: 4, max: 50}),
        check('description', "Invalid description.").isAlpha(),
        check('category', "Invalid last name length.").isAlpha(),
        check('price', "Invalid last name length.").isNumeric(),
    ],
    CreateAdvert
);

router.get('/', auth, GetAllAdverts);

router.get('/byId/:id', auth, GetAdvertById);

router.get('/userAdverts', auth, GetCurrentUserAdverts);

router.get('/byOwnerName/:owner', auth, GetAdvertsByOwnerName);

router.get('/byTitle/:title', auth, FindAdvertBytitle);

router.patch('/editAdvert/:id', auth, EditAdvert);

router.delete('/deleteAdvert/:id', auth, DeleteAdvert);

module.exports = router