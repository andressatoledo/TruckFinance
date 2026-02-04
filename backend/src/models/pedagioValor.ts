import mongoose, { Schema }  from 'mongoose';

const pedagioValorSchema = new Schema({
  rotaPedagioValor: {
    type: Number
  },
  rotaPedagioNumeroEixos: {
    type: Number
  },
  pedagioId: {
    type: Schema.Types.ObjectId,
    ref: 'Pedagio'
  }
});

export const PedagioValor =  mongoose.model('PedagioValor', pedagioValorSchema);