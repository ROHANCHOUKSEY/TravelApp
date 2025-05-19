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
