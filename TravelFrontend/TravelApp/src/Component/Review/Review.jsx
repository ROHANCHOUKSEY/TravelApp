import React, { useContext, useEffect, useState } from "react";
import { getReview, postReview } from "../../service/locationService";
import { useParams } from "react-router-dom";
import { AppContext } from "../../CreateContext/Context";

const Review = () => {
  const [takeReview, setTakeReview] = useState("");
  const [printReview, setPrintReview] = useState([]);
  const { userName, userlastName } = useContext(AppContext);

  // Format date with month name
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Current date for new posts
  const currentDate = formatDate(new Date());

  // Get user name
  const user = `${userName} ${userlastName}`;
  const { id } = useParams();

  const handleReviewPost = async () => {
    if (!takeReview.trim()) return;
    
    try {
      await postReview(id, takeReview, user, currentDate);
      const data = await getReview(id);
      setPrintReview(data.LocationReview);
      setTakeReview("");
    } catch (error) {
      console.log("Error when posting review", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleReviewPost();
    }
  };

  useEffect(() => {
    async function getuserReview() {
      const data = await getReview(id);
      setPrintReview(data.LocationReview || []);
    }
    getuserReview();
  }, [id]);

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Customer Reviews
      </h2>
      
      {/* Review Input */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <textarea
              value={takeReview}
              onChange={(e) => setTakeReview(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-600 h-24 px-4 py-3 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share your experience..."
              rows="3"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {takeReview.length}/250 characters
              </span>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center"
                onClick={handleReviewPost}
                disabled={!takeReview.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                Post Review
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews List */}
      {printReview.length > 0 ? (
        <div className="space-y-4">
          {printReview.map((review, ind) => (
            <div key={ind} className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
              <div className="p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full h-10 w-10 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                    {review.postuserName?.charAt(0) || "U"}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {review.postuserName || "Anonymous"}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {review.text}
                    </p>
                    <div className="mt-3 flex space-x-4">
                      <button className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-xl shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">No reviews yet</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Be the first to share your thoughts about this place. Your review will help others make better decisions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Review;