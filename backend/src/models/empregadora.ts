import mongoose, { Schema }  from 'mongoose';

const empregadoraSchema = new Schema({
  empregadoraId: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  empregadoraNome: {
    type: String
  },

  empregadoraHasAdiantamento: {
    type: Boolean
  },

  empregadoraValorAdiantamento: {
    type: Number,
  },

  empregadoraPrazoPagamento: {
    type: String
  },
  empregadoraStatus: {
      type: String,
      enum: ['Ativo', 'Inativo']
    },
});

export const Empregadora = mongoose.model('Empregadora', empregadoraSchema);
