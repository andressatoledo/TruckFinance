import mongoose, { Schema }  from 'mongoose';

const empregadoraSchema = new Schema({
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
      type: String
    },
});

export const Empregadora = mongoose.model('Empregadora', empregadoraSchema);
