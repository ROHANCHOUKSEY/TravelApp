import React, { useState } from "react";
import { signUp } from "../../service/locationService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigation = useNavigate();

  const [validationerror, setValidationerror] = useState([]);

  const [signUpUser, setSignUpUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    usertype: "",
    terms: "",
  });

  const handleChange = (e) => {
    setSignUpUser({
      ...signUpUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const newUser = await signUp(signUpUser);
      setSignUpUser(newUser);
      navigation("/login");
    } catch (error) {
      console.log("User is not signUp", error);
      setSignUpUser((prevUser) => ({
        ...prevUser, password: "", confirm_password: ""
      }))  
    
      if (error.errors) {
        setValidationerror(error.errors);
      } else {
        setValidationerror([{ msg: error.message || "Signup failed" }]);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-gray-300  w-100 h-auto m-10 rounded-lg">
          <div className="text-center p-5">
            <h1>Welcome Travel App</h1>
            {validationerror.length > 0 &&
              validationerror.map((err, index) => <p key={index}>{err.msg}</p>)
            }
          </div>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col p-5 gap-5">
              <input
                className="bg-white p-2 rounded"
                type="text"
                name="firstname"
                onChange={handleChange}
                placeholder="Enter First Name"
              />
              <input
                className="bg-white p-2 rounded"
                type="text"
                name="lastname"
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
              <input
                className="bg-white p-2 rounded"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter gmail"
              />
              <input
                className="bg-white p-2 rounded"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
              />
              <input
                className="bg-white p-2 rounded"
                type="password"
                name="confirm_password"
                onChange={handleChange}
                placeholder="Enter confirm password"
              />
              <h1>User Type</h1>
              <div className="flex row gap-5">
                <input
                  type="radio"
                  id="guest"
                  name="usertype"
                  value="guest"
                  onChange={handleChange}
                />
                <label for="guest">Guest</label>
                <input
                  type="radio"
                  id="host"
                  name="usertype"
                  value="host"
                  onChange={handleChange}
                />
                <label for="host">host</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={signUpUser.terms === "on"}
                  onChange={handleChange}
                />
                <label for="terms">check term and condition</label>
              </div>
              <button
                onClick={handleSignUp}
                className="bg-green-500 w-20 px-2.5 py-2.5 text-white rounded-lg"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
