import mongoose, { Schema }  from 'mongoose';

const pedagioValorSchema = new Schema({
  pedagioValorId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  rotaPedagioValor: {
    type: Number
  },
  rotaPedagioTipoEixo: {
    type: String
  },
  pedagioId: {
    type: Schema.Types.ObjectId,
    ref: 'Pedagio'
  }
});

export const PedagioValor =  mongoose.model('PedagioValor', pedagioValorSchema);