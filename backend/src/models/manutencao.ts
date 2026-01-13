import mongoose, { Schema }  from 'mongoose';


const manutencaoSchema = new Schema({
  manutencaoId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  manutencaoDescricao: {
    type: String
  },
  manutencaoData: {
    type: Date
  },
  manutencaoKmRodados: {
    type: Number
  },
  manutencaoTipo: {
    type: String
  },
  caminhaoId: {
    type: Schema.Types.ObjectId,
    ref: 'Caminhao'
  },
  carretaId: {
    type: Schema.Types.ObjectId,
    ref: 'Carreta'
  },
  manutencaoObservacao: {
    type: String
  },
});


export const Manutencao = mongoose.model('Manutencao', manutencaoSchema);