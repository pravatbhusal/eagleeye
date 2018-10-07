# EagleEye
A mobile app that notifies government officials about infrastructure issues.

# Inspiration
In our neighborhood, there are a lot of broken roads filled with potholes, which promotes potential accidents between drivers and pedestrians. Moreover, our community is filled with many infrastructure problems that we could've fixed to make our lives significantly easier.

# What it does
The EagleEye mobile app allows residents to take pictures of infrastructure damage in their city and write a small report to the local government. On the other side of things, the EagleEye website channels the reports from the mobile app for government officials to view and reply to the residents' concerns. It is an efficient method for residents to partake in civil participation in their community.

# How we built it
The mobile app was built on React Native and is a cross-platform app for both iOS and Android. The website was made with HTML 5, CSS 3, JavaScript, PHP, MySQL, Bootstrap, and jQuery. Reports from the mobile app are stored on the MySQL database, which the website can access, view, and respond to the residents. Both the mobile app and website are hosted on the Google Cloud Platform, using resources provided by companies like Apache and Bitnami. Furthermore, they both use the Google Maps API to pinpoint the location of infrastructure damage.

# Challenges we ran into
For mobile-development, we encountered many server-side issues; more specifically, we had difficulty setting-up the cloud service. This is also our first time using React Native for mobile development, so it took some time getting accustomed to the library. It was also our first time implementing cloud software. For web-development, organizing the position of entities was troublesome, since the Bootstrap framework had specific classes to customize the appearance of text, images, navigation bars, and displays. Additionally, being a team of only two freshman students made it overwhelming to interact with fellow hackers who seemed much more experience. Honestly, the most difficult challenge was trying to stay awake and keep drinking energy drinks provided by yours truly...Blumania.

# Accomplishments that we're proud of
We are very proud of the finished EagleEye mobile app and website. We accomplished creating an app using React Native and a cloud service for the first time and had constant technical interaction between the mobile app, database, and website.

# What we learned
We learned how to utilize the React Native library, Google Cloud service, and to intensely search for bugs...for example, misspelling variable names and writing the correct coding punctuation.

# What's next for EagleEye
The next developmental stage for EagleEye is to incorporate machine learning through an API to analyze the images taken and compare to an external database, which ranks the severity of the infrastructure problem. Furthermore, we plan on scaling the project's resources using the Google Cloud services provided by MLH.
