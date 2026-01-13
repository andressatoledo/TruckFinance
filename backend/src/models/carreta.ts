import mongoose, { Schema }  from 'mongoose';

const carretaSchema = new Schema({
  carretaId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  carretaQuantidadeEixosVazio: {
    type: Number
  },
  carretaQuantidadeEixosCheio: {
    type: Number
  },
  carretaTipo: {
    type: String
  },
  carretaStatus: {
    type: String
    // enum: ['Ativo', 'Inativo','Manutenção']
  },
});

export const Carreta = mongoose.model('Carreta', carretaSchema);