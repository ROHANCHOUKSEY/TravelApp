import React, { useContext, useEffect, useState } from "react";
import { getReview, postReview } from "../../service/locationService";
import { useParams } from "react-router-dom";
import { AppContext } from "../../CreateContext/Context";

const Review = () => {
  const [takeReview, setTakeReview] = useState("");
  const [printReview, setPrintReview] = useState([]);
  const { userName, userlastName } = useContext(AppContext);


  //GOT DATE
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  console.log(formattedDate);

  //GOT USER NAME
  const user = userName + " " + userlastName;
  const { id } = useParams();

  const handleReviewPost = async () => {
    try {
      await postReview(id, takeReview, user, formattedDate);
      const data = await getReview(id);
      setPrintReview(data.LocationReview);
      setTakeReview("");
    } catch (error) {
      console.log("Error when post review", error);
    }
  };

  useEffect(() => {
    async function getuserReview() {
      const data = await getReview(id);
      console.log("data", data.LocationReview);
      setPrintReview(data.LocationReview);
    }
    getuserReview();
  }, [id]);

  return (
    <>
      <div className="flex gap-5">
        <input
          type="text"
          name="postreview"
          onChange={(e) => setTakeReview(e.target.value)}
          value={takeReview}
          className="bg-white dark:bg-blue-900/30  border-2 border-black dark:border-white w-full h-10 p-2 text-black dark:text-white rounded-sm"
          placeholder="Enter Your Review"
          required
        />
        <button
          className="dark:bg-blue dark:text-white w-20 border-2 border-blue-600 rounded"
          onClick={handleReviewPost}
        >
          POST
        </button>
      </div>
      {printReview.length > 0 ? (
        <ul>
          {printReview.map((review, ind) => (
            <div className="w-full h-20 border-2 border-white mt-10 p-2">
              <li key={ind} className="text-sm text-gray-700 dark:text-white">
                {review.postuserName}
                {review.text}
                 {review.createdAt}
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}
    </>
  );
};

export default Review;
