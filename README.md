# **Recipe Finder**
This is a simple web application that helps you discover recipes based on the ingredients you already have. The app integrates with the Spoonacular Recipe API and features a user-friendly interface optimized for desktop and mobile devices. This repository contains the frontend implementation of the project. The backend is a Node.js/Express server deployed on Render. It acts as a secure proxy for Spoonacular's API, protecting the API key. The backend is hosted privately to ensure data security.


## **Important Note**
Since the backend is hosted on Render, the server may go to sleep during periods of inactivity. As a result, the first request after a period of inactivity might take up to 50 seconds to respond. Subsequent requests will work without delays.


## **Demo**
https://dlekht.github.io/recipes-finder/


## **Features**
- You can enter ingredients, and Recipe Finder will suggest recipes that include them.
- You can view the list of recipes and explore the details of each, including ingredients, instructions, and an image of the dish. You can also go to the source of the recipe.
- The design is optimized for desktop and mobile devices.
- Backend securely handles the API key and retrieves data from Spoonacular.


## **Technologies Used**
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **API**: Spoonacular Recipe API
- **Hosting**: Render for backend, GitHub Pages for frontend


## Screenshots

![image](https://github.com/user-attachments/assets/07ec83ba-9df0-417f-8368-d40e176bd538)
![image](https://github.com/user-attachments/assets/1e17dc69-c0c9-4388-a8b0-4e4061732ac8)
![image](https://github.com/user-attachments/assets/b00dfb49-d3f5-403f-9fc7-202405505ca5)


