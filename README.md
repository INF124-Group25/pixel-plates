Deployed Website: https://pixel-plates.netlify.app/
Video Demo Link: https://youtu.be/STdrEkHwlXs?si=M3ojsz00MUlBuk48

- After cloning the repository add one .env files to the root directory and one to the backend directory (env. parameters shown below). 
- Run the "./npm_install.sh" in the terminal to npm install for both directories
- Run "npm run launch" in the terminal
- Open the webapp with the displayed link in the terminal (e.g. http://localhost:3000)

These are the parameters for the backend .env
```
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
PORT=
OLD_OLD_SECRET=
OLD_SECRET=
JWT_SECRET=
NODE_ENV=
YELP_API_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_REGION=
S3_BUCKET=
```

These are the parameters for the root .env
```
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXT_PUBLIC_BACKEND_URL=

NEXT_PUBLIC_S3_BUCKET_NAME=

NEXT_PUBLIC_PROTOCOL=
NEXT_PUBLIC_HOSTNAME=
NEXT_PUBLIC_PORT=
NEXT_PUBLIC_PATHNAME=
```
