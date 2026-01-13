require('dotenv').config();  
import mongoose from 'mongoose'; 

const uri = process.env.MONGO_URI;  
export async function connectToDatabase() {
  try {
    if (!uri) {
      throw new Error("MONGO_URI não está definida nas variáveis de ambiente.");
    }else{
      await mongoose.connect(uri);
      console.log("Você se conectou ao MongoDB com sucesso!");
      
      // const ping = await mongoose.connection.db.command({ ping: 1 });
      // console.log("Pingado com sucesso:", ping);
    }
   
  } catch (error) {
    console.error("Erro de conexão ao MongoDB:", error);
  }
}


