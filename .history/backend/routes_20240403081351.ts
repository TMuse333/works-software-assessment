import express, { Router, Request, Response } from 'express';
import NoteModel from './models/note.model';

const router: Router = express.Router();

router.post('/notes', async (req: Request, res: Response) => {
  try {
    const { note } = req.body;
    const newNote = new NoteModel({ note });
    await newNote.save();
    res.status(201).json({ success: true, message: 'Note created successfully', data: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

router.get('/notes', async (req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

export default router;
