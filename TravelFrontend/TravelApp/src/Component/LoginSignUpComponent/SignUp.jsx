import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-gray-300  w-100 h-auto m-10 rounded-lg">
          <div className="text-center p-5">
            <h1>Welcome Travel App</h1>
          </div>
          <div className="flex flex-col p-5 gap-5">
            <input
              className="bg-white p-2 rounded"
              type="text"
              name="firstname"
              placeholder="Enter First Name"
            />
            <input
              className="bg-white p-2 rounded"
              type="text"
              name="lastname"
              placeholder="Enter Last Name"
            />
            <input
              className="bg-white p-2 rounded"
              type="email"
              name="gmail"
              placeholder="Enter gmail"
            />
            <input
              className="bg-white p-2 rounded"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <input
              className="bg-white p-2 rounded"
              type="password"
              name="confirmpassword"
              placeholder="Enter confirm password"
            />
            <h1>User Type</h1>
            <div className="flex row gap-5">
              <input type="radio" id="guest" name="usertype" value="guest" />
              <label for="guest">Guest</label>
              <input type="radio" id="host" name="usertype" value="host" />
              <label for="host">host</label>
            </div>
            <div>
              <input type="checkbox" id="terms" />
              <label for="terms">check term and condition</label>
            </div>
            <button className="bg-green-500 w-20 px-2.5 py-2.5 text-white rounded-lg">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
