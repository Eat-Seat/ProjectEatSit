# ProyectEatSeat
A web app project for a software engineering subject

##  Technologies Used

### Frontend:
- Angular
- TypeScript
- HTML/CSS
- Bootstrap

### Backend:
- Deno (TypeScript runtime)
- PostgreSQL
- RESTful API



## Project Structure

ProyectEatSeat/
│
├── backend/               # Deno backend
│   ├── controllers/       # Business logic 
├── db/                    # Database connection files
├── routes/                # API route handling
├── server.ts              # Main Deno server file
├── deno.json              # Deno project config
├── import_map.json        # Module alias map
│
├── frontend/              # Angular application (login, register, profile)
│
├── node_modules/          # Node.js dependencies
│
├── Dockerfile             # (Optional) Docker setup
├── main.go, go.mod, go.sum# (Experimental - not part of core project)
├── package.json           # NPM dependencies for Angular
└── README.md              # Project documentation
```



## How to Run

### Backend (Deno):
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the server:
   ```bash
   deno run --allow-net --allow-read server.ts
   ```

> Make sure PostgreSQL is installed and configured correctly in your `db` connection file.

### Frontend (Angular):

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   ng serve
   ```

4. Access it in your browser at `http://localhost:4200`.

## 📝 Features Implemented

- User registration and login
- Role-based interface (`cliente` / `restaurante`)
- Edit and delete user profile
- AuthService to manage login state
- Frontend-backend communication using `fetch`
- CORS-enabled backend for Angular compatibility

## 🔮 Next Steps

- Add restaurant and reservation logic
- Role-based route guards in Angular
- Improved error handling and UX feedback
- Deployment on cloud platforms


## 👨 Author

Luis Laballós González and Alonso Codesal Martinez – Final project for Software Engineering course



##  License

This project is for academic and educational purposes only.