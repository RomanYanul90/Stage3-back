import {validationResult} from "express-validator";
import {CreateAdvertService} from '../services/CreateAdvertServices'

export const CreateAdvert = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid values in create advert fields."
            })
        }
        const {title, description, category, price, created, userName} = req.body
        const ownerId = req.user.userId
        const advert = await CreateAdvertService(title, description, category, price, created, userName, ownerId)
        res.status(201).json({advert});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}