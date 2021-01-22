import Advert from '../models/Advert';

export const createAdvertService = async (title, description, category, price, created, userName, ownerId) => {
    const advert = new Advert({
        title, description, category, price, created, ownerId, ownerUserName: userName
    });
    await advert.save();
    return advert;
};

export const getAllAdvertsService = async () => {
    return Advert.find();
};

export const getAdvertByIdService = async (id) => {
    return Advert.findById(id);
};

export const getCurrentUserAdvertsService = async (ownerId) => {
    return Advert.find({ownerId: ownerId});
};

export const getAdvertsByOwnerNameService = async (owner) => {
    return Advert.find({ownerUserName: owner});
};

export const findAdvertByTitleService = async (title) => {
    return Advert.find({title: title});
};

export const editAdvertService = async (id, updates) => {
    return Advert.findByIdAndUpdate(id, updates);
};

export const deleteAdvertService = async (id) => {
    return Advert.findByIdAndDelete(id);
};
