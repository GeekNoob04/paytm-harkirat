# 🧠 Paytm Clone Cohort Project

This project is a full-stack application designed to mimic the functionality of Paytm, a popular digital payment platform. It includes features for user authentication, account management, and money transfer between users.

## 🚀 Features

-   **User Authentication:** Secure sign-in and sign-up functionality with password hashing and token-based authentication.
-   **Account Management:** Users can view their account balance and manage their accounts.
-   **Money Transfer:** Users can send money to other users, with validation for sufficient balance and correct recipient details.
-   **API Integration:** The application uses REST API endpoints for communication between the frontend and backend.
-   **Database Integration:** MongoDB is used as the database to store user and account information.

## 🛠️ Tech Stack

-   **Frontend:**
    -   React for building the user interface
    -   Vite as the development server and bundler
    -   Tailwind CSS for styling
    -   Axios for making API requests
-   **Backend:**
    -   Node.js with Express as the web framework
    -   Mongoose for interacting with the MongoDB database
    -   CORS for enabling cross-origin requests
    -   Zod for schema validation
-   **Database:**
    -   MongoDB for storing user and account data
-   **Build Tools:**
    -   npm for package management
    -   ESLint for code linting

## 📦 Installation

To set up the project, follow these steps:

1. Clone the repository using `git clone`.
2. Install the dependencies for both the frontend and backend using `npm install`.
3. Start the MongoDB database.
4. Run the backend server using `npm run start` in the backend directory.
5. Run the frontend development server using `npm run dev` in the frontend directory.

## 💻 Usage

-   Open a web browser and navigate to `http://localhost:5173/` to access the application from the frontend and `http://localhost:3000` for backend access.
-   Sign up for an account or log in if you already have one.
-   Once logged in, you can view your account balance, send money to other users, and manage your account settings.

## 📂 Project Structure

```markdown
project/
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── routes/
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── vite.config.js
├── README.md
└── package.json
```

## 🤝 Contributing

Contributions are welcome. To contribute, please fork the repository, make your changes, and submit a pull request.

## 📬 Contact

For questions or feedback, please contact me at harshitbudhraja0@gmail.com.

## 💖 Thanks Message

This is written by readme.ai - Your AI-powered README file generator, making developer's life easier one README at a time.
