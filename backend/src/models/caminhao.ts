import mongoose, { Schema }  from 'mongoose';

const caminhaoSchema = new Schema({
  caminhaoId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  
  caminhaoNome: {
    type: String
  },

  caminhaoAnoFabricacao: {
    type: Number
  },

  caminhaoPlaca: {
    type: String,
    uppercase: true
  },

  caminhaoDocumentos: {
    ipva: {
      dataExpiracao: {
        type: Date
      },
      status: {
        type: String,
        enum: ['Válido', 'A vencer', 'Vencido'],
        default: 'Válido'
      }
    },
    seguro: {
      dataExpiracao: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['Válido', 'Expirado'],
        default: 'Válido'
        }
      },
    
    crlv: {
      dataExpiracao: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['Válido', 'Em processo', 'Vencido'],
        default: 'Válido'
      }
    }
  },

  caminhaoCapacidadeDeCarga: {
    type: Number
  },

  caminhaoUltimaManutencao: {
    type: Date
  },

  caminhaoTrocaDeOleo: {
    type: Date
  },
  caminhaoStatus: {
      type: String,
      enum: ['Ativo', 'Inativo', 'Manutenção']
  },
  empregadoraId: {
    type: Schema.Types.ObjectId,
    ref: 'Empregadora'
  }
});


export const Caminhao =  mongoose.model('Caminhao', caminhaoSchema);
