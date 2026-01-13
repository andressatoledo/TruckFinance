import mongoose, { Schema }  from 'mongoose';


const pedagioSchema = new Schema({
  pedagioId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  pedagioNome: {
    type: String,
    unique: true
  },
  pedagioRodovia: {
    type: String
  },
  pedagioLocalizacao: {
    type: String
  }
});

export const Pedagio = mongoose.model('Pedagio', pedagioSchema);