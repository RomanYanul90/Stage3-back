import Advert from '../models/Advert';

export const createAdvertService = async (title, description, category, price, created, userName, ownerId) => {
    const advert = new Advert({
        title, description, category, price, created, ownerId, ownerUserName: userName
    });
    await advert.save();
    return advert;
};

export const getAllAdvertsService = async () => {
    return await Advert.find();
};

export const getAdvertByIdService = async (id) => {
    return await Advert.findById(id);
};

export const getCurrentUserAdvertsService = async (ownerId) => {
    return await Advert.find({ownerId: ownerId});
};

export const getAdvertsByOwnerNameService = async (owner) => {
    return await Advert.find({ownerUserName: owner});
};

export const findAdvertByTitleService = async (title) => {
    return await Advert.find({title: title});
};

export const editAdvertService = async (id, updates) => {
    return await Advert.findByIdAndUpdate(id, updates);
};

export const deleteAdvertService = async (id) => {
    return await Advert.findByIdAndDelete(id);
};
