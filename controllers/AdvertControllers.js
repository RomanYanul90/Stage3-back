import {validationResult} from "express-validator";
import {
    CreateAdvertService,
    GetAllAdvertsService,
    GetAdvertByIdService,
    GetCurrentUserAdvertsService,
    GetAdvertsByOwnerNameService,
    FindAdvertBytitleService,
    EditAdvertService,
    DeleteAdvertService
} from '../services/AdvertServices';

export const CreateAdvert = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid values in create advert fields."
            });
        }
        const {title, description, category, price, created, userName} = req.body;
        const ownerId = req.user.userId;
        const advert = await CreateAdvertService(title, description, category, price, created, userName, ownerId);
        res.status(201).json({advert});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}

export const GetAllAdverts = async (req, res) => {
    try {
        const adverts = await GetAllAdvertsService()
        res.json(adverts);
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
}

export const GetAdvertById = async (req, res) => {
    try {
        const id = req.params.id;
        const advert = await GetAdvertByIdService(id);
        res.json(advert);
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
}

export const GetCurrentUserAdverts = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const adverts = await GetCurrentUserAdvertsService(ownerId);
        res.json(adverts);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}

export const GetAdvertsByOwnerName = async (req, res) => {
    try {
        const owner = req.params.owner;
        const adverts = await GetAdvertsByOwnerNameService(owner);
        res.json(adverts);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}

export const FindAdvertBytitle = async (req, res) => {
    try {
        const title = req.params.title;
        const adverts = await FindAdvertBytitleService(title);
        res.json(adverts);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}

export const EditAdvert = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const advert = await EditAdvertService(id, updates);
        res.json(advert);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}

export const DeleteAdvert = async (req, res) => {
    try {
        const id = req.params.id;
        const advert = await DeleteAdvertService(id);
        res.json(advert);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}
