import Advert from '../models/Advert';

export const CreateAdvertService = async (title, description, category, price, created, userName,ownerId) => {
    const advert = new Advert({
        title, description, category, price, created, ownerId, ownerUserName: userName
    })
    await advert.save()
    return advert
}
