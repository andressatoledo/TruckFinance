
import mongoose, { Schema }  from 'mongoose';

const abastecimentoSchema = new Schema({
  abastecimentoId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  
  abastecimentoLitros: {
    type: Number
  },
  
  caminhaoId: {
      type: Schema.Types.ObjectId,
      ref: 'Caminhao'
  },

  abastecimentoValor: {
    type: Number
  },

  abastecimentoData: {
    type: Date,
    default: Date.now 
  },

  abastecimentoKm: {
    type: Number
  },

  abastecimentoTipoPagamento: {
    type: String
  },

  abastecimentoPrazoPagamento: {
    type: String
  },

  abastecimentoObservacao: {
    type: String,
    default: ''
  }
});

export const Abastecimento =  mongoose.model('Abastecimento', abastecimentoSchema);
