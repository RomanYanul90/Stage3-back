export const getUserById = async (userId, token, body = null) => {
  try {
    const response = await fetch(`/api/auth/user/${userId}`, {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const createAdvert = async (body = null, token, headers = {Authorization: `Bearer ${token}`}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch("/api/advert/create", {
      method: "POST",
      body,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getAdvertById = async (advertId, token, body = null) => {
  try {
    const response = await fetch(`/api/advert/byId/${advertId}`, {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const editAdvert = async (advertID, body = null, token, headers = {Authorization: `Bearer ${token}`}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`/api/advert/editAdvert/${advertID}`, {
      method: "PATCH",
      body,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getAllAdverts = async (token, body = null) => {
  try {
    const response = await fetch("/api/advert/", {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getAdvertByTitle = async (advertTitle, token, body = null) => {
  try {
    const response = await fetch(`/api/advert/byTitle/${advertTitle}`, {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getAllUsers = async (token, body = null) => {
  try {
    const response = await fetch("/api/auth/", {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const findUserByUserName = async (userName, token, body = null) => {
  try {
    const response = await fetch(`/api/auth/byUserName/${userName}`, {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const chosenUserAdverts = async (ownerName, token, body = null) => {
  try {
    const response = await fetch(`/api/advert/byOwnerName/${ownerName}`, {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const createUser = async (body = null, token, headers = {}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const editUser = async (userId, body = null, token, headers = {Authorization: `Bearer ${token}`}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`/api/auth/editUser/${userId}`, {
      method: "PATCH",
      body,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (body = null, token, headers = {}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const removeAdvertById = async (advertId, token, body = null, headers = {Authorization: `Bearer ${token}`}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`/api/advert/deleteAdvert/${advertId}`, {
      method: "DELETE",
      body,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const removeUserById = async (userId, token, body = null, headers = {Authorization: `Bearer ${token}`}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`/api/auth/deleteUser/${userId}`, {
      method: "DELETE",
      body,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getCurrentUserAdverts = async ( token, body = null) => {
  try {
    const response = await fetch("/api/advert/userAdverts", {
      method: "GET",
      body,
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }
    return data;
  } catch (e) {
    throw e;
  }
};
