import Advert from '../models/Advert';

export const createAdvertService = async (title, description, category, price, created, userName, ownerId) => {
  const advert = new Advert({
    title, description, category, price, created, ownerId, ownerUserName: userName,
  });
  await advert.save();
  return advert;
};

export const getAllAdvertsService = async () => Advert.find();

export const getAdvertByIdService = async (id) => Advert.findById(id);

export const getCurrentUserAdvertsService = async (ownerId) => Advert.find({ ownerId });

export const getAdvertsByOwnerNameService = async (owner) => Advert.find({ ownerUserName: owner });

export const findAdvertByTitleService = async (title) => Advert.find({ title });

export const editAdvertService = async (id, updates) => Advert.findByIdAndUpdate(id, updates);

export const deleteAdvertService = async (id) => Advert.findByIdAndDelete(id);
