# FoodMark

https://foodmark.fly.dev/
Responsive full-stack web app for organizing user restaurant experiences
Created with React.js frontend, node.js and express.js backend, connected to MongoDB database using Mongoose library
I created FoodMark because I really love trying restaurants and wanted something to organize my experiences. Another big reason is to get myself familiar with the technologies used. 

## Funcitionalities

- Add new restaurants by clicking upload, first input is autcomplete to get data from google maps API
- Each restaurants tab can be expanded by clicking the title
- Visited and Favourite properties can be toggled with buttons, can filter using sidebar or search bar at the top
- Click the 'Map' to display a google map with markers for all the stored restaurants and one for center / your location

## Challenges

- As a beginner to fullstack development, it was pretty difficult to figure out how exactly the react frontend and node backend worked together with the database, and how to deploy it all together. Thankfully, there are very good resources online that helped me very much.
- Some technical challenges were trying to upload in image into MongoDB using multer and storing it as binary data, then converting it into base64 format to display on frontend.
- Getting the react-google-maps/api package to work was also difficult, and trying to hide the API key by requesting it from the backend caused problems, which took some googling and experimenting to solve. 

## Future Developments

- Changing the styling, I want to make it more responsive and look better
- Uploading pictures are still a work in progress
- Functionality for rating individual dishes



