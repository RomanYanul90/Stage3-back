const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const Advert = require('../models/Advert');
const auth = require('../middleware/auth-middleware');

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
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: "Invalid user register data."})
            }
            const {title, description, category, price, created} = req.body
            // console.log(req.user.userId)
            const advert = new Advert({
                title, description, category, price, created, creator: req.user.userId
            })
            await advert.save()
            res.status(201).json({advert})
        } catch (e) {
            res.status(500).json({message: "Something went wrong."});
        }
    })

router.get('/', auth, async (req, res) => {
    try {
        const adverts = await Advert.find()
        res.json(adverts)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
})
//AUTH
router.get('/byId/:id', auth, async (req, res) => {
    try {
        const advert = await Advert.findById(req.params.id)
        res.json(advert)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
})

router.get('/userAdverts',auth, async (req, res) => {
    try {
        const adverts = await Advert.find({creator: req.user.userId})
        res.json(adverts)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})

module.exports = router