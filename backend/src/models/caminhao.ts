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
        type: String
      }
    },
    seguro: {
      dataExpiracao: {
        type: Date
      },
      status: {
        type: String
        }
      },
    
    crlv: {
      dataExpiracao: {
        type: Date
      },
      status: {
        type: String
        
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
      type: String
  },
  empregadoraId: {
    type: Schema.Types.ObjectId,
    ref: 'Empregadora'
  }
});


export const Caminhao =  mongoose.model('Caminhao', caminhaoSchema);
