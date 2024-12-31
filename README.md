# OptaCloudAssignment

This project is a full-stack application that includes a frontend built with React and a backend with Node.js. The frontend interacts with the backend via API calls to manage user data and addresses. Firebase authentication is also integrated for secure login and user management.

## GitHub Repository

To clone this repository, run:

```bash
git clone https://github.com/geek-nikhil/OptaCloudAssignment


Installation
Frontend
Navigate to the frontend directory:
npm install
npm run dev
 

Backend
Navigate to the backend directory:
npm install
npm start
  

the credentials for on of the user for testing purpose you can directly login
email  = nikhilraikwar846@gmail.com
password = 123456

 **User Authentication with Firebase**: 
  - Users can sign up, log in, and log out securely using Firebase Authentication.
 

**Address Management**: 
  - Users can search for locations and view address suggestions from Google Maps API.
  - Users can select and save their desired address to the backend database (MongoDB).
  - The application ensures users' addresses are saved securely, with each address linked to the authenticated user.

 **Responsive UI with React**: 
  - The frontend is built using React to provide a dynamic and responsive user experience.
  - The interface adjusts based on the device (mobile, tablet, desktop) to ensure the app is accessible on any screen size.

**Google Maps Integration**: 
  - Integrated with Google Maps API for geolocation and address auto-completion.
  - Provides real-time suggestions for places as the user types in the search input.

- **Backend API with Node.js**: 
  - The backend is built with Node.js and Express to handle API requests such as saving and retrieving user addresses.
  - The backend is connected to a MongoDB database where user addresses are stored securely.
  
- **Address Geocoding**: 
  - Uses Google Maps API’s Geocoding service to convert latitude and longitude coordinates into readable addresses.
  - Allows users to view and manage addresses based on their geographical location.


 **Easy to Set Up**: 
  - Simple installation instructions with detailed steps for both the frontend and backend setup.
  - Just run `npm install` and `npm run dev` (frontend) or `npm start` (backend) to get started quickly.

- **API Endpoints**:
  - Provides well-defined API endpoints for saving and fetching user data.
  - Integrates user management features using Firebase Authentication to ensure secure access to the addresses API.
