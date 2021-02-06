import Advert from '../models/Advert';

const createAdvert = async (title, description, category, price, created, userName, ownerId) => {
  const advert = new Advert({
    title, description, category, price, created, ownerId, ownerUserName: userName,
  });
  await advert.save();
  return advert;
};

const getAllAdverts = async () => Advert.find();

const getAdvertById = async (id) => Advert.findById(id);

const getCurrentUserAdverts = async (ownerId) => Advert.find({ ownerId });

const getAdvertsByOwnerName = async (owner) => Advert.find({ ownerUserName: owner });

const findAdvertByTitle = async (title) => Advert.find({ title });

const editAdvert = async (id, updates) => Advert.findByIdAndUpdate(id, updates);

const deleteAdvert = async (id) => Advert.findByIdAndDelete(id);

export default {
  createAdvert,
  getAllAdverts,
  getAdvertById,
  getCurrentUserAdverts,
  getAdvertsByOwnerName,
  findAdvertByTitle,
  editAdvert,
  deleteAdvert,
};
