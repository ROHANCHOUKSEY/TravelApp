// Host Service Section -------------------------------------------------------------------------------------

export const savetodb = async ({
  image,
  locationName,
  country,
  state,
  rating,
  description,
  holeDescription,
  VisitorTips,
  history,
  timing,
  closing,
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host`,
      {
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
          VisitorTips,
          history,
          timing,
          closing,
        }),
      }
    );
    const newLocation = await response.json();
    return maplocalValueToserviseValue(newLocation);
  } catch (error) {
    console.log("data is not saved in database", error);
  }
};

export const hostlocation = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host/hostLocation`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },  
      }
    );
    console.log("hostlocationResponse: ", response);
    const data = await response.json();
    console.log("hostLocationData2: ", data);

    return Array.isArray(data) ? data.map(maplocalValueToserviseValue) : [];
  } catch (error) {
    console.log("host location is not fetch: ", error);
  }
};

export const locationFromServer = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const allLocation = await response.json();
    return allLocation.map(maplocalValueToserviseValue);
  } catch (error) {
    console.log("data is not fetch from server", error);
  }
};

export const stateLocation = async (locationData) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/host/stateLocation`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      }
    );
    const data = await response.json();
    return maplocalValueToserviseValue(data);
  } catch (error) {
    console.log("state wise location is not save", error);
    throw error;
  }
};

export const getStateLocation = async () => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/host/stateLocation`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const stateLocationWise = await response.json();
    return stateLocationWise;
  } catch (error) {
    console.log("StateLocation is not fetch", error);
    throw error;
  }
};

export const editFromServer = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host/edit/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const editLocation = await response.json();
    return maplocalValueToserviseValue(editLocation);
  } catch (error) {
    console.log("data is not edit", error);
  }
};

export const postEditFromServer = async (
  id,
  {
    image,
    locationName,
    country,
    state,
    rating,
    description,
    holeDescription,
    history,
    VisitorTips,
    timing,
    closing,
  }
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host/edit/${id}`,
      {
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
          VisitorTips,
          timing,
          closing,
        }),
      }
    );
    const updateLocation = await response.json();
    return maplocalValueToserviseValue(updateLocation);
  } catch (error) {
    console.log("edit data is not fetch from server", error);
  }
};

export const deleteFromServer = async (id) => {
  await fetch(
    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return id;
};

// User Service Section ---------------------------------------------------------------------------------------

export const locationDetails = async (id) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/user/details/${id}`,
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
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Locationid }),
      }
    );
    const favouriteLocation = await response.json();
    return maplocalValueToserviseValue(favouriteLocation);
  } catch (error) {
    console.log("data is not add in favourite", error);
  }
};

export const favouriteFromServer = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/favourites`,
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
    console.log("FavouriteLocation is not fetch from DB Error", error);
    return [];
  }
};

export const deleteFromFavourite = async (id) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/user/favourites/${id}`,
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

export const postReview = async (id, text, postuserName, createdAt) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
    }/api/user/reviewpost/${id}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, postuserName, createdAt }),
    }
  );
  const data = await response.json();
  return data;
};

export const getReview = async (id) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
    }/api/user/reviewpost/${id}`,
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
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/signup`,
      {
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
      }
    );
    const newuser = await response.json();

    if (!response.ok) {
      throw newuser;
    }

    return newuser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password, screenMode }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, screenMode }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const user = await response.json();
    if (!response.ok) {
      throw user;
    }
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const postsessionmode = async (mode) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/screenmode`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode }),
    }
  );
  const data = await response.json();
  // console.log("mode data", data);
  return data;
};

export const getsessionmode = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/screenmode`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error", error);
    throw error; // Re-throw to handle in the component
  }
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
    VisitorTips: serviseItem.VisitorTips,
    timing: serviseItem.timing,
    closing: serviseItem.closing,
    review: serviseItem.review,
  };
};
