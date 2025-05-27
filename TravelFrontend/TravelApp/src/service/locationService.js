// Host Service Section -------------------------------------------------------------------------------------

export const savetodb = async ({
  image,
  locationName,
  country,
  rating,
  description,
}) => {
  try {
    const response = await fetch("http://localhost:3002/api/host", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        locationName,
        country,
        rating,
        description,
      }),
    });
    const newLocation = await response.json();
    return maplocalValueToserviseValue(newLocation);
  } catch (error) {
    console.log("data is not saved in database", error);
  }
};

export const locationFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3002/api/host", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allLocation = await response.json();
    return allLocation.map(maplocalValueToserviseValue);
  } catch (error) {
    console.log("data is not fetch from server", error);
  }
};

export const editFromServer = async (id) => {
  try {
    const response = await fetch(`http://localhost:3002/api/host/edit/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const editLocation = await response.json();
    return maplocalValueToserviseValue(editLocation);
  } catch (error) {
    console.log("data is not edit", error);
  }
};

export const postEditFromServer = async (
  id,
  { image, locationName, country, rating, description }
) => {
  try {
    const response = await fetch(`http://localhost:3002/api/host/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        locationName,
        country,
        rating,
        description,
      }),
    });
    const updateLocation = await response.json();
    return maplocalValueToserviseValue(updateLocation);
  } catch (error) {
    console.log("edit data is not fetch from server", error);
  }
};

export const deleteFromServer = async (id) => {
  await fetch(`http://localhost:3002/api/host/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return id;
};

// User Service Section ---------------------------------------------------------------------------------------

export const userFavourite = async (Locationid) => {
  try {
    const response = await fetch("http://localhost:3002/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Locationid }),
    });
    const favouriteLocation = await response.json();
    return maplocalValueToserviseValue(favouriteLocation);
  } catch (error) {
    console.log("data is not add in favourite", error);
  }
};

export const favouriteFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3002/api/user/favourites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.map(maplocalValueToserviseValue);
  } catch (error) {
    console.log("FavouriteLocation is not fetch from DB Error", error);
    return [];
  }
};

export const deleteFromFavourite = async (id) => {
  console.log("Delete id", id);
  try {
    const response = await fetch(
      `http://localhost:3002/api/user/favourites/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return id;
  } catch (error) {
    console.log("favourite is not delete from server", error);
  }
};

// Authentication -----------------------------

export const signUp = async ({firstname, lastname, email, password, confirm_password, usertype, terms}) => {
  try{
  const response = await fetch("http://localhost:3002/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname, lastname, email, password, confirm_password, usertype, terms }),
  });
  const newuser = await response.json();

  if (!response.ok) { 
    throw newuser;
  }

  return newuser;
  }catch(error){
    throw error;
  }

};

export const loginUser = async ({ email, password }) => {
  const response = await fetch("http://localhost:3002/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }); 
  const user = await response.json();
  if(!response.ok){
    throw user;
  }
  return user; 
};

const maplocalValueToserviseValue = (serviseItem) => {
  return {
    id: serviseItem._id,
    image: serviseItem.image,
    locationName: serviseItem.locationName,
    country: serviseItem.country,
    rating: serviseItem.rating,
    description: serviseItem.description,
  };
};
