import mongoose, { Schema }  from 'mongoose';


const rotaPedagioSchema = new Schema({
  rotaPedagioId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  rotaPedagioOrdem: {
    type: Number
  },
  rotaPedagioNome: {
    type: String
  },
  rotaId: {
    type: Schema.Types.ObjectId,
    ref: 'Rota'
  },
  pedagioId: {
    type: Schema.Types.ObjectId,
    ref: 'Pedagio'
  }
});

export const RotaPedagio = mongoose.model('RotaPedagio', rotaPedagioSchema);