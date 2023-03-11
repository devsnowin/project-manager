import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['PROGRESS', 'DONE', 'STARTED'],
  },
});

export default mongoose.model('Project', Schema);
