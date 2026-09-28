<div align="center">

# 📸 Post Feed

**A minimal full-stack app to share images with captions.**
Upload a photo, write a caption, and watch your feed update instantly.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![ImageKit](https://img.shields.io/badge/Storage-ImageKit-0A66C2)
![License](https://img.shields.io/badge/License-ISC-blue)

</div>

---

## ✨ Features

- 🖼️ **Image upload** with live preview before posting
- ✍️ **Captions** up to 500 characters with a character counter
- ⚡ **Instant feed update**: new posts appear at the top without a reload
- ☁️ **Cloud image storage** powered by ImageKit
- 🗄️ **Persistent data** stored in MongoDB
- 🎨 **Clean, minimal black-and-white UI**
- 🚀 **One-command startup** for both frontend and backend

---

## 🛠️ Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Frontend   | React 18, Create React App, CSS              |
| Backend    | Node.js, Express 5, Multer, CORS, dotenv     |
| Database   | MongoDB with Mongoose                        |
| Image CDN  | ImageKit                                     |

---

## 📁 Project Structure

```
project-1/
├── backend/
│   ├── server.js                  # Entry point: connects DB and starts server
│   └── src/
│       ├── app.js                 # Express app and API routes
│       ├── db/db.js               # MongoDB connection
│       ├── models/post.model.js   # Post schema (image, caption)
│       └── services/
│           └── storage.service.js # ImageKit upload helper
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx                # Fetches posts, holds app state
│       └── components/
│           ├── PostForm.jsx       # Upload form with preview
│           ├── PostFeed.jsx       # List of posts / empty state
│           └── PostCard.jsx       # Single post
└── package.json                   # Root script to run everything at once
```

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- A [MongoDB](https://www.mongodb.com/atlas) database (Atlas free tier works great)
- An [ImageKit](https://imagekit.io/) account for the private API key

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 3. Configure environment variables

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:3000
PORT=3001
```

> ⚠️ Never commit your `.env` files. They contain secrets and are already listed in `.gitignore`.

### 4. Run the app

```bash
npm start
```

This starts both servers together:

| Service  | URL                     |
| -------- | ----------------------- |
| Frontend | http://localhost:3001   |
| Backend  | http://localhost:3000   |

Press `Ctrl + C` once to stop both.

<details>
<summary>Run them separately instead</summary>

```bash
# Terminal 1: backend
cd backend
npm start

# Terminal 2: frontend
cd frontend
npm start
```

</details>

---

## 🔌 API Reference

Base URL: `http://localhost:3000`

### `GET /posts`

Returns all posts.

```json
{
  "message": "posts fetched successfully",
  "posts": [
    {
      "_id": "64f...",
      "image": "https://ik.imagekit.io/...",
      "caption": "Hello world"
    }
  ]
}
```

### `POST /create-post`

Creates a post. Send as `multipart/form-data`.

| Field     | Type   | Description             |
| --------- | ------ | ----------------------- |
| `image`   | File   | The image to upload     |
| `caption` | String | Text shown with the post |

**Response `201`**

```json
{
  "message": "post created successfully",
  "post": {
    "_id": "64f...",
    "image": "https://ik.imagekit.io/...",
    "caption": "Hello world"
  }
}
```

---

## 🔄 How It Works

```
 ┌──────────┐   multipart/form-data   ┌───────────┐   base64   ┌──────────┐
 │  React   │ ──────────────────────▶ │  Express  │ ─────────▶ │ ImageKit │
 │ Frontend │                         │  + Multer │ ◀───────── │   CDN    │
 └──────────┘ ◀────────────────────── └─────┬─────┘  image URL └──────────┘
        JSON response                       │
                                            ▼
                                      ┌──────────┐
                                      │ MongoDB  │  stores image URL + caption
                                      └──────────┘
```

1. The user picks an image and writes a caption in the React form.
2. The form sends both to the Express API as `multipart/form-data`.
3. Multer keeps the file in memory, and the backend uploads it to ImageKit.
4. The returned image URL and the caption are saved in MongoDB.
5. The API responds with the new post, and the feed updates immediately.

---

## 🩺 Troubleshooting

| Problem                                | Likely cause and fix                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| `Failed to fetch posts`                | Backend isn't running. Check the terminal for errors.                                |
| Backend can't connect to DB            | Check `MONGO_URI`, and allow your IP in MongoDB Atlas → Network Access.              |
| `Failed to create post`                | Usually an invalid `IMAGEKIT_PRIVATE_KEY`. Check the backend terminal for details.   |
| Port 3000 already in use               | Stop the other process, or make sure the frontend `.env` has `PORT=3001`.            |
| Frontend changes to `.env` not applied | Restart the dev server. React reads `.env` only at startup.                          |

---

## 🗺️ Roadmap

- [ ] Delete and edit posts
- [ ] Timestamps on posts (`createdAt`)
- [ ] Newest-first ordering from the API
- [ ] Image size and type validation
- [ ] User authentication
- [ ] Likes and comments

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License.

---

<div align="center">

Made with ❤️ using React, Express, and MongoDB

⭐ If you like this project, give it a star!

</div>
