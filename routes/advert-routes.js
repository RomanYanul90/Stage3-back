const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const Advert = require('../models/Advert');
const auth = require('../middleware/auth-middleware');
import {CreateAdvert} from '../controllers/AdvertControllers'

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
    )

router.get('/', auth, async (req, res) => {
    try {
        const adverts = await Advert.find()
        res.json(adverts)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
})
router.get('/byId/:id', auth, async (req, res) => {
    try {
        const advert = await Advert.findById(req.params.id)
        res.json(advert)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
})

router.get('/userAdverts', auth, async (req, res) => {
    try {
        const adverts = await Advert.find({ownerId: req.user.userId})
        res.json(adverts)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})

router.get('/byOwnerName/:owner', auth, async (req, res) => {
    try {
        const adverts = await Advert.find({ownerUserName: req.params.owner})
        res.json(adverts)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})

router.get('/byTitle/:title', auth, async (req, res) => {
    try {
        const adverts = await Advert.find({title: req.params.title})
        res.json(adverts)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})
router.patch('/editAdvert/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const updates = req.body
        const advert = await Advert.findByIdAndUpdate(id,updates)
        res.json(advert)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})

router.delete('/deleteAdvert/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const advert = await Advert.findByIdAndDelete(id)
        res.json(advert)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})

module.exports = router