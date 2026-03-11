import mongoose, { Schema }  from 'mongoose';

const cargaSchema = new Schema({
  // cargaId: {
  //   type: Schema.Types.ObjectId,
  //   auto: true
  // },

  cargaTipo: {
    type: String
  }
});
export const Carga = mongoose.model('Carga', cargaSchema);
