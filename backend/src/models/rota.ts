import mongoose, { Schema }  from 'mongoose';


const rotaSchema = new Schema({
  rotaId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  rotaNome: {
    type: String,
    unique: true
  },
  rotaDescricao: {
    type: String
  },
  rotaOrigem: {
    type: String
  },
  rotaDestino: {
    type: String
  },
  rotaObservacao: {
    type: String
  },
  rotaDistancia: {
    type: Number
  }
});

export const Rota = mongoose.model('Rota', rotaSchema);
