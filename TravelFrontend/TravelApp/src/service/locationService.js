// Host Service Section -------------------------------------------------------------------------------------

export const savetodb = async ({
  image,
  locationName,
  country,
  rating,
  description,
}) => {
  const response = await fetch("http://localhost:3002/api/host", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, locationName, country, rating, description }),
  });
  const newLocation = await response.json();
  return maplocalValueToserviseValue(newLocation);
};

export const locationFromServer = async () => {
  const response = await fetch("http://localhost:3002/api/host", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const allLocation = await response.json();
  return allLocation.map(maplocalValueToserviseValue);
};

export const editFromServer = async (id) => {
  const response = await fetch(`http://localhost:3002/api/host/edit/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const editLocation = await response.json();
  return maplocalValueToserviseValue(editLocation);
};

export const postEditFromServer = async (
  id,
  { image, locationName, country, rating, description }
) => {
  const response = await fetch(`http://localhost:3002/api/host/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, locationName, country, rating, description }),
  });
  const updateLocation = await response.json();
  return maplocalValueToserviseValue(updateLocation);
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
  const response = await fetch("http://localhost:3002/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Locationid }),
  });
  const favouriteLocation = await response.json();
  return maplocalValueToserviseValue(favouriteLocation);
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
  } catch (err) {
    console.log("FavouriteLocation is not fetch from DB Error", err);
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
  } catch (err) {
    console.log("Location is not delete from Favourite", err);
  }
};

// Authentication -----------------------------

export const loginUser = async ({email, password}) => {
  const response = await fetch("http://localhost:3002/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  });
  const user = await response.json();
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
  