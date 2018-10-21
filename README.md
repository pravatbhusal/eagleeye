<img src="https://raw.githubusercontent.com/Shadowsych/eagleeye/master/rsrc/logo72x72.png" width="100" height="100" />

### DevPost: https://devpost.com/software/eagleeye-8pnw7l

# EagleEye
A mobile app that notifies government officials about infrastructure issues. The EagleEye mobile app allows residents to take pictures of infrastructure damage in their city and write a small report to the local government. On the other side of things, the EagleEye website channels the reports from the mobile app for government officials to view and reply to the residents' concerns. It is an efficient method for residents to partake in civil participation in their community.

# Video Demonstration
- https://www.youtube.com/watch?v=TtafsxgVPoc&feature=youtu.be

# Developers
- Pravat Bhusal (React Native & MySQL Developer)
- Michael Kasman (Full-Stack & MySQL Developer)

# Application Set-up
### 1. Web-Server
- Clone or download the .zip of this repository
- Inside the src/server folder, place all php files into your web-server
- Open the App.js file in the root directory
- Change the serverURL variable to your server's URL

### 2. Database Configuration
- Inside the src/server/db folder, export the eagleeye.sql file into your MySQL database
- Inside the src/server/db folder, open the dbconnection.php file and configure the variables to your database credentials

### 3. Test React Native App
- Open a new terminal in this project's directory
- Type "npm install" or if you have yarn use "yarn install"
- Now run the Expo development server using "expo start"

