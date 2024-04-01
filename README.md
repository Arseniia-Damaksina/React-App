# Tasklists
Deployed app [Tasklists-app](https://react-app-3a8p.onrender.com/)

### Attention
The deployed app works properly except adding a new task: sometimes the new task is added, sometimes not. I did not figure out the bug perfomed yet. Tryed to connect from local client to deployed server - the same behaviour. Locally everything works fine.

## Installation and Usage

1. **Clone the repository:**: ```https://github.com/Arseniia-Damaksina/React-App```

2. **Database:**
The PostgreSQL database is already deployed on Render and is accessible in both local and production environments.

3. **Backend:**
- For simplicity, no .env files have been created. The backend uses a direct URL for the database connection and a URL fetched by the client. Therefore, there is no need to create .env files.


```bash
cd server
npm install
npm run start:dev
```

4. **Frontend**

```bash
cd client
npm install
```
Change the url at ```React-App\client\src\utils\url.ts``` to commented one for local development.

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)
