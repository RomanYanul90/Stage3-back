import {validationResult} from "express-validator";
import {
  createAdvertService,
  getAllAdvertsService,
  getAdvertByIdService,
  getCurrentUserAdvertsService,
  getAdvertsByOwnerNameService,
  findAdvertByTitleService,
  editAdvertService,
  deleteAdvertService
} from "../services/AdvertServices";

export const createAdvert = async (req, res) => {
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

    const advert = await createAdvertService(title, description, category, price, created, userName, ownerId);
    res.status(201).json({advert});
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const getAllAdverts = async (req, res) => {
  try {
    const adverts = await getAllAdvertsService();
    res.json(adverts);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const getAdvertById = async (req, res) => {
  try {
    const id = req.params.id;
    const advert = await getAdvertByIdService(id);
    res.json(advert);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const getCurrentUserAdverts = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const adverts = await getCurrentUserAdvertsService(ownerId);
    res.json(adverts);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const getAdvertsByOwnerName = async (req, res) => {
  try {
    const owner = req.params.owner;
    const adverts = await getAdvertsByOwnerNameService(owner);
    res.json(adverts);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const findAdvertByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const adverts = await findAdvertByTitleService(title);
    res.json(adverts);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const editAdvert = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const advert = await editAdvertService(id, updates);
    res.json(advert);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const deleteAdvert = async (req, res) => {
  try {
    const id = req.params.id;
    const advert = await deleteAdvertService(id);
    res.json(advert);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};
