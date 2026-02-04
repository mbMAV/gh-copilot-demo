import { Router } from "express";
import { albums, nextId } from "../data/albums";
import { Album } from "../models/album";

const router = Router();

// GET /albums?year=2021
router.get("/albums", (req, res) => {
  const year = req.query.year ? parseInt(String(req.query.year)) : undefined;
  if (year) {
    const filtered = albums.filter(a => a.year === year);
    return res.json(filtered);
  }
  return res.json(albums);
});

// GET /albums/:id
router.get("/albums/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const album = albums.find(a => a.id === id);
  if (!album) return res.status(404).send();
  return res.json(album);
});

// POST /albums
router.post("/albums", (req, res) => {
  const body = req.body as Partial<Album>;
  if (!body.title || !body.artist || !body.year) {
    return res.status(400).json({ error: "Title, artist and year required" });
  }
  const newAlbum: Album = {
    id: (globalThis as any).__nextId ? (globalThis as any).__nextId++ : (globalThis as any).__nextId = nextId,
    title: body.title,
    artist: body.artist,
    year: body.year,
    price: body.price ?? 0,
    image_url: body.image_url ?? ""
  };
  albums.push(newAlbum);
  return res.status(201).json(newAlbum);
});

// PUT /albums/:id
router.put("/albums/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = albums.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).send();
  const body = req.body as Partial<Album>;
  const updated: Album = {
    id,
    title: body.title ?? albums[idx].title,
    artist: body.artist ?? albums[idx].artist,
    year: body.year ?? albums[idx].year,
    price: body.price ?? albums[idx].price,
    image_url: body.image_url ?? albums[idx].image_url
  };
  albums[idx] = updated;
  return res.json(updated);
});

// DELETE /albums/:id
router.delete("/albums/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = albums.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).send();
  albums.splice(idx, 1);
  return res.status(204).send();
});

export default router;
