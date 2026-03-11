import mongoose, { Schema } from 'mongoose';
import { isStringObject } from 'node:util/types';

const viagemDocumentoSchema = new Schema(
  {
    viagemDocumentoId: {
      type: Schema.Types.ObjectId,
      auto: true
    },

    viagemDocumentoTipo: {
      type: String
      // Ex: 'CTE', 'NOTA_FISCAL', 'COMPROVANTE', 'OUTRO'
    },

    viagemDocumentoNome: {
      type: String
    },

    viagemDocumentoUrl: {
      type: String
    },

    viagemDocumentoMimeType: {
      type: String
      // ex: application/pdf, image/jpeg
    },

    viagemDocumentoTamanho: {
      type: Number
    },

    viagemDocumentoDataUpload: {
      type: Date,
      default: Date.now
    },

    viagemId: {
      type: Schema.Types.ObjectId,
      ref: 'Viagem'
    },

    viagemDocumentoObservacao: {
      type: String,
      default: ''
    },

    viagemDocumentoStatus: {
      type: String,
      // enum: ['Ativo', 'Inativo'],
      // default: 'Ativo'
    }
  },
  {
    timestamps: true
  }
);

export const ViagemDocumento = mongoose.model(
  'ViagemDocumento',
  viagemDocumentoSchema
);
