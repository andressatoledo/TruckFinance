import mongoose, { Schema } from 'mongoose';

const manutencaoDocumentoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
    },

    manutencaoTipo: {
      type: String,
      required: true,
    },

    manutencaoCategoria: {
      type: String,
      required: true,
    },

    manutencaoData: {
      type: Date,
      required: true,
    },

    manutencaoKm: {
      type: Number,
      required: true,
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
      trim: true,
    },

    manutencaoObservacao: {
      type: String,
      trim: true,
    },

    manutencaoDocumentos: [manutencaoDocumentoSchema],
  },
  {
    timestamps: true,
  }
);

export const Manutencao = mongoose.model('Manutencao', manutencaoSchema);