# Bluestacks API

This is a Next.js project bootstrapped with create-next-app.
The APP is currently hosted using Vercel at https://bluestacks-app.vercel.app.

## Instruction to Run the APP

### Instruction 1

#### Method 1: local development server

```
git clone https://github.com/shann-singh/bluestacks-app
cd bluestacks-app
npm install
create .env.local file with necessary variable
edit api url in next.config.js
npm run dev
```

#### Method 2: Production build on LINUX VM

```
git clone https://github.com/shann-singh/bluestacks-app
cd bluestacks-app
npm install
create .env.production file with necessary variable
edit api url in next.config.js
npm run build
pm2 start npm --name app-name -- start 
```

## Sample .env file

```
NEXT_PUBLIC_API_URL=your_api_address
```
