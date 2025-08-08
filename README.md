# 📚 Course Selling Backend API

A simple RESTful backend built with **Node.js** and **Express.js** that allows:
- Admins to add and manage courses.
- Users to buy courses.
- JWT-based user authentication.
- Data storage using JSON files (simulating a database).

---

## 🚀 Features

- 🛡️ JWT authentication for both admins and users.
- 👨‍🏫 Admin APIs for creating accounts and managing course catalog.
- 👨‍🎓 User APIs for signing up, logging in, and buying courses.
- 💾 JSON file-based persistence (no database required).
- 📡 RESTful API design.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **JSON Web Token (JWT)**
- **fs (File System Module)**

---


## 🔐 Authentication

Authentication is handled using JWT.

- On successful login (`/admin/login` or `/user/login`), a token is issued.
- This token must be sent in the `Authorization` header (`Bearer <token>`) for protected routes.

---

## 📦 API Endpoints

### 🔑 Admin

#### POST `/admin/signup`
Create a new admin account.

**Body:**
```
{
  "user": "admin123",
  "pass": "password"
}
```

#### POST `/admin/login`

Login as admin to receive a JWT token.

* * * * *

#### GET `/admin/allcourse`

Returns all courses. Requires JWT token.

* * * * *

### 🧑‍🎓 User

#### POST `/user/signup`

Register as a new user.

**Body:**

json

CopyEdit

`{
  "user": "user1",
  "pass": "password"
}`

* * * * *

#### POST `/user/login`

Login as user to receive a JWT token.

* * * * *

#### POST `/user/buycourse`

Buy a course by name. Requires JWT token.

**Body:**

json

CopyEdit

`{
  "course": "ReactJS Basics"
}`

* * * * *

#### GET `/user/mycourses`

Returns the list of courses bought by the user. Requires JWT token.

* * * * *

🧪 Testing the API
------------------

You can test the APIs using tools like:

-   Postman

-   Insomnia

Make sure to:

-   Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

-   Use correct JSON body for each request.

* * * * *

📝 Example Users (Stored in JSON)
---------------------------------

### `testuser.json`

json

CopyEdit

`[
  {
    "user": "user1",
    "pass": "pass123",
    "course": []
  }
]`

### `testfile.json`

json

CopyEdit

`[
  {
    "user": "admin1",
    "pass": "adminpass",
    "course": ["ReactJS Basics", "NodeJS Fundamentals"]
  }
]`

* * * * *

📌 Notes
--------

-   Make sure file paths (`pt` and `pt1`) are set correctly in your code.

-   This is for learning/demo purposes. For production apps, consider replacing the JSON file system with a real database like MongoDB or PostgreSQL.

* * * * *

👨‍💻 Author
------------

Made with ❤️ by [Gavini Shasank]

* * * * *
