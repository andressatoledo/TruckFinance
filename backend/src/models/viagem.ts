import mongoose, { Schema }  from 'mongoose';

const viagemSchema = new Schema({
  // viagemId: {
  //   type: Schema.Types.ObjectId,
  //   auto: true
  // },

  viagemNumero: {
    type: Number
  },

  viagemSerial: {
    type: String
  },

  empregadoraId: {
    type: Schema.Types.ObjectId,
    ref: 'Empregadora'
  },

  viagemDataRegistro: {
    type: Date,
    default: Date.now
  },

  viagemToneladaCarregada: {
    type: Number
  },

  viagemValorTonelada: {
    type: Number
  },

  rotaVinculadaId: {
    type: Schema.Types.ObjectId,
    ref: 'RotaVinculada'
  },

  viagemStatus: {
    type: String
  },

  viagemDataPagamento: {
    type: Date
  },

  viagemDataInicio: {
    type: Date
  },

  viagemDataFim: {
    type: Date
  },

  viagemHorarioChegada: {
    type: String
  },

  viagemHorarioSaida: {
    type: String
  },

  caminhaoId: {
    type: Schema.Types.ObjectId,
    ref: 'Caminhao'
  },

  motoristaId: {
    type: Schema.Types.ObjectId,
    ref: 'Motorista'
  },

  carretaId: {
    type: Schema.Types.ObjectId,
    ref: 'Carreta'
  },

  viagemEixosIda: {
    type: Number
  },

  viagemEixosVolta: {
    type: Number
  },

  viagemOrigemEixos: {
    type: String,
    enum: ['Default', 'Manual'],
    default: 'Default'
  },

  viagemDistancia: {
    type: Number
  },
  
  viagemTotais: {
    viagemPedagios: {
      type: Number,
      default: 0
    },
    viagemFrete: {
      type: Number,
      default: 0
    },
    viagemLucro: {
      type: Number,
      default: 0
    }
  }
});

export const Viagem = mongoose.model('Viagen', viagemSchema);
