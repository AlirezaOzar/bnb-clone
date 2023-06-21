## About 

This is an Airbnb clone project developed with NextJS & Typecript and its backend developed with Prisma and MongoDB 
database. In this project, we can choose our product based on the desired category and upload our desired photo 
and price, and the Next-auth package is used for its authentication.

## Backend technologies

I used the Prisma tool to create the backend of this project and I was able to create the user and product data, and by using the user's information, I can authenticate it and store all the data in the Mongodb database.

## Authentication
I used next-auth package for user authentication its very simple , the user can sign in with the github , email , and it has many providers you can choose for your authentication

```bash
npm install next-auth
```

## Post products
* ## Select Location

The user can upload his product in his account with the desired photo, location and price. This part was very challenging for me in this project and increased my abilities. After choosing the category of his product, the user can place it on the map. Choose your desired one ,, I used leaflet package for the maps 

```bash
npm i leaflet
```
* ## Select Category
   Also, the user can choose his product category depending on the price and location he wants
  
* ## Upload Image
  I used cloudinary package for uploading the products image

  ```bash
   npm i cloudinary
  ```

### Cloning the repository
  ```bash
    git clone https://github.com/AlirezaOzar/bnb-clone.git
   ```

### Setup .env file

```bash
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```
### Steup Prisma
```bash
npx prisma db push
```
### Start the app
```bash
npm run dev
```
