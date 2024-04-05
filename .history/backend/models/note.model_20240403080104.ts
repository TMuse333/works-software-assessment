import mongoose, { Schema, Document } from 'mongoose';

// Define interface representing a note document
interface Note extends Document {
  note: string;
}

// Define mongoose schema for a note
const noteSchema: Schema = new Schema({
  note: { type: String, required: true }
});

// Define and export mongoose model based on schema
const NoteModel = mongoose.model<Note>('Note', noteSchema);

export default NoteModel;
