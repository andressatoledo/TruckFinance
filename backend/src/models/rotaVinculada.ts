import mongoose, { Schema }  from 'mongoose';


const rotaVinculadaSchema = new Schema({
  rotaVinculadaObservacao: {
    type: String
  },
  rotaVinculadaValor: {
    type: Number
  },
  rotaVinculadaModeloPagamento: {
    type: String
  },
  rotaIdaId: {
    type: Schema.Types.ObjectId,
    ref: 'Rota'
  },
  rotaVoltaId: {
    type: Schema.Types.ObjectId,
    ref: 'Rota'
  },
  cargaId: {
    type: Schema.Types.ObjectId,
    ref: 'Carga'
  },
});

export const RotaVinculada = mongoose.model('RotaVinculada', rotaVinculadaSchema);