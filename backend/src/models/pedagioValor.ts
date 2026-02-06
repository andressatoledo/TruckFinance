import mongoose, { Schema }  from 'mongoose';

const pedagioValorSchema = new Schema({
  PedagioValor: {
    type: Number
  },
  pedagioValorNumeroEixos: {
    type: Number
  },
  pedagioId: {
    type: Schema.Types.ObjectId,
    ref: 'Pedagio'
  }
});

export const PedagioValor =  mongoose.model('PedagioValor', pedagioValorSchema);