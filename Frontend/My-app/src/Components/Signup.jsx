import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Importing Firebase auth instance
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setEmail } from "../utilities/emailReducer"; // Import setEmail from your user slice

function Signup() {
  const dispatch = useDispatch();
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between sign-up and login form
  const navigate = useNavigate(); // Navigation hook for routing

  // Handle Sign Up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const response = await fetch("http://localhost:5000/user/create-user", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("User created successfully:", data);

      // Dispatch the email to Redux store
      dispatch(setEmail(email));

      alert("User created successfully");
      navigate("/user-info"); // Redirect to user-info page after successful signup
    } catch (err) {
      setError(err.message); // Set error message if signup fails
    }
  };

  // Handle Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setEmail(email));
      alert("User logged in successfully");
      navigate("/user-info"); // Redirect to user-info page after successful login
    } catch (err) {
      setError(err.message); // Set error message if login fails
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)} // Update input state
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Signup;
