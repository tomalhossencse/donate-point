Doner Point 🩸 | The Life-Saving Blood Drive
⚡ Short Project Description
Doner Point is a responsive, full-stack web application dedicated to connecting blood donors with patients in need. Our platform ensures a safe, secure, and efficient process for blood donation requests and contributions.
Key Features:
Donor Registration: Easy sign-up for new blood donors.
Search Functionality: Users can search for available donors based on blood group and location.
Real-time Matching: Get notified when a nearby patient needs your blood type.
Contribution Management: Donors can manage and track their life-saving contributions.
🛠️ Setup & Installation Instructions
Follow these steps to get a local copy of Doner Point up and running for development and testing.
Prerequisites
You will need the following software installed on your machine:
Node.js (LTS version recommended)
MongoDB (A running instance or access to a cloud cluster like MongoDB Atlas)
Git

1. Clone the Client Repository
   git clone https://github.com/tomalhossencse/donate-point.git
   cd doner-point

2. Configure Environment Variables
   Create a file named .env in the root directory of the project and populate it with your configuration details.

3. Clone the Server Repository
   git clone https://github.com/tomalhossencse/donate-point-server.git
   cd doner-point-server

- Live Link : https://donate-point.vercel.app/

# Example .env file content

# Database

MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>

# Authentication (e.g., Firebase)

# FIREBASE_SERVICE_ACCOUNT=... (if applicable)

🗺️ Route Summary
The application provides both public and authenticated API and client routes.
Client-Side Routes (Frontend)

**Public**

1. Home page : with latest donors, "How it works" section, and CTA.
2. /search-doners: Page for searching registered donors by blood group and location.
3. /register : User and Donor registration form.
4. /login : User login page.
5. /manage-doners : Main user dashboard summary.

- View and manage donor profiles added by the logged-in user.
  🤝 Contributing
  We welcome contributions! If you have suggestions or find a bug, please open an issue or submit a pull request.
