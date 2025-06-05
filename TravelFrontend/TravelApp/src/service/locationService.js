// Host Service Section -------------------------------------------------------------------------------------

export const savetodb = async ({
  image,
  locationName,
  country,
  state, 
  rating,
  description,
  holeDescription,
  history,
  timing,
  closing,
}) => {
  try {
    const response = await fetch("http://localhost:3002/api/host", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        locationName,
        country,
        state,
        rating,
        description,
        holeDescription,
        history,
        timing,
        closing,
      }),
    });
    const newLocation = await response.json();
    return maplocalValueToserviseValue(newLocation);
  } catch (error) {
    console.log("data is not saved in database", error);
  }
};

export const hostlocation = async () => {
  try {
    const response = await fetch(
      "http://localhost:3002/api/host/hostLocation",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.map(maplocalValueToserviseValue);
  } catch (error) {
    console.log("host location is not fetch: ", error);
  }
};

export const locationFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3002/api/host", {
      method: "GET",
      credentials: "include",
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
      credentials: "include",
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
  { image, locationName, country, state, rating, description, holeDescription, history, timing, closing}
) => {
  try {
    const response = await fetch(`http://localhost:3002/api/host/edit/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        locationName,
        country,
        state,
        rating,
        description,
        holeDescription,
        history, 
        timing,
        closing
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
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return id;
};

// User Service Section ---------------------------------------------------------------------------------------

export const locationDetails = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3002/api/user/details/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Details is not fetch: ", error);
  }
};

export const userFavourite = async (Locationid) => {
  try {
    const response = await fetch("http://localhost:3002/api/user", {
      method: "POST",
      credentials: "include",
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
      credentials: "include",
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
  try {
    const response = await fetch(
      `http://localhost:3002/api/user/favourites/${id}`,
      {
        method: "DELETE",
        credentials: "include",

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

export const signUp = async ({
  firstname,
  lastname,
  email,
  password,
  confirm_password,
  usertype,
  terms,
}) => {
  try {
    const response = await fetch("http://localhost:3002/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        confirm_password,
        usertype,
        terms,
      }),
    });
    const newuser = await response.json();

    if (!response.ok) {
      throw newuser;
    }

    return newuser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch("http://localhost:3002/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const user = await response.json();
  if (!response.ok) {
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
    state: serviseItem.state,
    rating: serviseItem.rating,
    description: serviseItem.description,
    holeDescription: serviseItem.holeDescription,
    history: serviseItem.history,
    timing: serviseItem.timing,
    closing: serviseItem.closing
  };
};
