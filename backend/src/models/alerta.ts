
import mongoose, { Schema }  from 'mongoose';

const alertaSchema = new Schema({
  alertaId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  
});

export const Alerta =  mongoose.model('Alerta', alertaSchema);
