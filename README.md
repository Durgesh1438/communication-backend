# Backend API  of a simple communication history viewer and email sender application via postmark.com

## Description
It provides user google authentication and retrieves the user received emails and sent emails and provies the facility of sending emails 

## Table of Contents
- [Installation](#installation)
- [Postmarksetup](#postmarksetup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)


## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Durgesh1438/communication-backend.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd your-reponame
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
## Postmark setup
1. **Create a postmark account with a work email**
2. **Create a webhook url and in the setting of gmail forward to the mail provided in the postmark**
3. **so that u can receive the emails and retrieve it**

## Configuration
1. **Create a `.env` file** in the root directory of your project.
2. **Add the following environment variables** to the `.env` file:
   ```plaintext
   GOOGLE_CLIENTID="Your Google Client ID"
   MY_SECRET_KEY="Your Secret Key for JWT"
   POSTMARK_API_TOKEN="Your Postmark API Token"
   ACCOUNT_API_TOKEN="Your Account API Token"
   ```

## Running the Application
To start the application, run the following command:
```bash
npm run dev
```
