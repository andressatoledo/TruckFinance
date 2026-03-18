import mongoose, { Schema } from 'mongoose';

const manutencaoDocumentoSchema = new Schema(
  {
    nome: {
      type: String
    },
    url: {
      type: String
    },
    tipo: {
      type: String,
    },
    tamanho: {
      type: Number,
    },
    dataUpload: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const manutencaoSchema = new Schema(
  {
    manutencaoDescricao: {
      type: String,
    },

    manutencaoTipo: {
      type: String,
    },

    manutencaoCategoria: {
      type: String,
    },

    manutencaoData: {
      type: Date,
    },

    manutencaoKm: {
      type: Number,
    },

    manutencaoValor: {
      type: Number,
    },

    manutencaoProximoKm: {
      type: Number,
    },

    manutencaoProximaData: {
      type: Date,
    },

    caminhaoId: {
      type: Schema.Types.ObjectId,
      ref: 'Caminhao',
    },

    carretaId: {
      type: Schema.Types.ObjectId,
      ref: 'Carreta',
    },

    manutencaoLocal: {
      type: String,
    },

    manutencaoObservacao: {
      type: String,
    },

    manutencaoDocumentos: [manutencaoDocumentoSchema],
  },
  {
    timestamps: true,
  }
);

export const Manutencao = mongoose.model('Manutencao', manutencaoSchema);