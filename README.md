# 🎬 Movie Manager Frontend

A responsive React app for browsing, searching, filtering, and viewing movie details. Built to work seamlessly with the [Movie Manager Backend](https://github.com/Cladkoewka/movie-manager).

## ✨ Features

- Browse all movies with pagination
- Filter by genre, language, minimum rating
- Search by movie title
- Sort by title or rating (ascending/descending)
- View detailed movie info: trailer, poster, description
- Display user reviews
- Responsive Bootstrap layout
- Hosted via GitHub Pages

## ⚙️ Stack

- **Framework:** React + TypeScript
- **Routing:** React Router
- **HTTP:** Axios
- **Styling:** Bootstrap 5
- **Deployment:** GitHub Pages

## 📦 Installation

Clone the repo:

```bash
git clone https://github.com/Cladkoewka/movie-manager-frontend.git
cd movie-manager-frontend
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

## 🚀 Deployment

To build for production:

```bash
npm run build
```

To deploy to GitHub Pages:

```bash
npm run deploy
```

Make sure `homepage` is set correctly in `package.json`:

```json
"homepage": "https://Cladkoewka.github.io/movie-manager-frontend"
```

## 🧭 Routing

```tsx
<BrowserRouter basename="/movie-manager-frontend">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:id" element={<MovieDetails />} />
  </Routes>
</BrowserRouter>
```

## 🏠 Home Page

- Filters, search, and sorting handled via local state
- Pagination support
- Displays movies using reusable `<MovieCard />` components

## 🎥 Movie Details Page

- Fetches movie details and poster
- Displays trailer (YouTube embed or MP4)
- Loads and shows user reviews
- Fallback image if poster is missing
- Go-back navigation

## 🛡️ License

MIT
