import Advert from '../models/Advert';

export const CreateAdvertService = async (title, description, category, price, created, userName, ownerId) => {
    const advert = new Advert({
        title, description, category, price, created, ownerId, ownerUserName: userName
    });
    await advert.save()
    return advert;
}

export const GetAllAdvertsService = async () => {
    const adverts = await Advert.find();
    return adverts;
}

export const GetAdvertByIdService = async (id) => {
    const advert = await Advert.findById(id);
    return advert;
}

export const GetCurrentUserAdvertsService = async (ownerId) => {
    const adverts = await Advert.find({ownerId: ownerId});
    return adverts;
}

export const GetAdvertsByOwnerNameService = async (owner) => {
    const adverts = await Advert.find({ownerUserName: owner});
    return adverts;
}

export const FindAdvertBytitleService = async (title) => {
    const adverts = await Advert.find({title: title});
    return adverts;
}

export const EditAdvertService = async (id,updates) => {
    const advert = await Advert.findByIdAndUpdate(id, updates);
    return advert;
}

export const DeleteAdvertService = async (id) => {
    const advert = await Advert.findByIdAndDelete(id);
    return advert;
}
