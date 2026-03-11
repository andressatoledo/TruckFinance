import mongoose, { Schema }  from 'mongoose';


const motoristaSchema = new Schema({
  // motoristaId: {
  //   type: Schema.Types.ObjectId,
  //   auto: true
  // },
  motoristaNome: {
    type: String
  },
  motoristaStatus: {
    type: String
  },
  motoristaDataVencimentoHabilitacao: {
    type: Date
  },
  caminhaoId: {
    type: Schema.Types.ObjectId,
    ref: 'Caminhao'
  },
  carretaId: {
    type: Schema.Types.ObjectId,
    ref: 'Carreta'
  }
});

export const Motorista = mongoose.model('Motorista', motoristaSchema);