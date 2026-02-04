const express = require('express');
const router = express.Router();

// In-memory data store for albums (replace with a database in production)
let albums = [
  { id: 1, title: 'Album One', artist: 'Artist A', year: 2020 },
  { id: 2, title: 'Album Two', artist: 'Artist B', year: 2021 },
];
let nextId = 3;

// GET /albums?year=<year> - Search albums by year
router.get('/albums', (req, res) => {
  const { year } = req.query;
  if (year) {
    const filteredAlbums = albums.filter(album => album.year === parseInt(year));
    res.json(filteredAlbums);
  } else {
    res.json(albums);
  }
});

// POST /albums - Create a new album
router.post('/albums', (req, res) => {
  const { title, artist, year } = req.body;
  if (!title || !artist || !year) {
    return res.status(400).json({ error: 'Title, artist, and year are required' });
  }
  const newAlbum = { id: nextId++, title, artist, year: parseInt(year) };
  albums.push(newAlbum);
  res.status(201).json(newAlbum);
});

// PUT /albums/:id - Update an album by ID
router.put('/albums/:id', (req, res) => {
  const { id } = req.params;
  const { title, artist, year } = req.body;
  const albumIndex = albums.findIndex(album => album.id === parseInt(id));
  if (albumIndex === -1) {
    return res.status(404).json({ error: 'Album not found' });
  }
  albums[albumIndex] = { ...albums[albumIndex], title, artist, year: year ? parseInt(year) : albums[albumIndex].year };
  res.json(albums[albumIndex]);
});

// DELETE /albums/:id - Delete an album by ID
router.delete('/albums/:id', (req, res) => {
  const { id } = req.params;
  const albumIndex = albums.findIndex(album => album.id === parseInt(id));
  if (albumIndex === -1) {
    return res.status(404).json({ error: 'Album not found' });
  }
  albums.splice(albumIndex, 1);
  res.status(204).send();
});

module.exports = router;
