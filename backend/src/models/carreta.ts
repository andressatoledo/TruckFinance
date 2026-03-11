import mongoose, { Schema }  from 'mongoose';

const carretaSchema = new Schema({
  // carretaId: {
  //   type: Schema.Types.ObjectId,
  //   auto: true
  // },
  carretaQuantidadeEixosVazio: {
    type: Number
  },
  carretaQuantidadeEixosCheio: {
    type: Number
  },
  carretaTipo: {
    type: String
  },
  carretaPlaca: {
    type: String
  },
  carretaStatus: {
    type: String
  },

});

export const Carreta = mongoose.model('Carreta', carretaSchema);