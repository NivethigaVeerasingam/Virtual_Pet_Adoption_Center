#  Virtual Pet Adoption Center 

##  Step 1: Install Required Software

### 1.1 Install Node.js and npm

1.  Open your terminal or command prompt.
2.  Check if Node.js and npm are installed:
    * node -v
    * npm -v
    
3.  If not installed:
    *   Go to [https://nodejs.org/]
    *   Download the LTS version
    *   Install it (npm is included automatically)


### 1.2 MongoDB Setup

####  **MongoDB Atlas **

1.  Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2.  Sign up and create a Free Cluster
3.  Create a database user and configure Network Access (allow your IP or `0.0.0.0/0` for testing).
4.  Get the MongoDB connection string for your application.


###  1.3 Install Git

1.  Open terminal and check Git:
    
    * git --version
   
2.  If not installed:
    *   Download from [https://git-scm.com/downloads]
    *   Install for your OS


## Step 2: Download the Project

1.  Open your terminal and run:
    * git clone [https://github.com/NivethigaVeerasingam/Virtual_Pet_Adoption_Center.git]
    * cd virtual-pet-adoption-center
   

## Step 3: Backend Set Up

1.  Navigate to the backend folder
    * cd backend
    
2.  Install dependencies
    * npm install
    

##  Step 4: Set Up Frontend

1.  Navigate to the frontend folder (from the project root)
   
   If you are in backend/, type: cd .. 
    
    cd frontend
   
2.  Install frontend dependencies:
    * npm install
    

##  Step 5: Run the Project

###  5.1 Start the Backend

1.  Open a terminal window/tab.
2.  Navigate to the `backend` folder:
    
   * cd path/to/virtual-pet-adoption-center/backend
   
3.  Start the backend server:
      * npm start
   
4.  Look for output confirming the server is running (e.g., "Server is running on port 5000" and "Connected to database!"). The server typically runs on `http://localhost:5000`.

---

###  5.2 Start the Frontend

1.  Open **another terminal** window/tab.
2.  Navigate to the `frontend` folder:
    
    * cd path/to/virtual-pet-adoption-center/frontend
    
3.  Start the frontend development server:
    
    * npm start
    
4.  Your application should automatically open in your default web browser at `http://localhost:3000`. If not, manually navigate to this URL.

---

Notes - The backend server must be running before you start and use the frontend application

