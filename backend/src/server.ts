import express from 'express'; 
import cors from 'cors'; 
import { abastecimentoRoutes } from './routes/abastecimentoRoutes';
import { alertaRoutes } from './routes/alertaRoutes';
import { caminhaoRoutes } from './routes/caminhaoRoutes';
import { cargaRoutes } from './routes/cargaRoutes';
import { carretaRoutes } from './routes/carretaRoutes';
import { empleadoraRoutes } from './routes/empregadoraRoutes';
import { manutencaoRoutes } from './routes/manutencaoRoutes';
import { motoristaRoutes } from './routes/motoristaRoutes';
import { pedagioRoutes } from './routes/pedagioRoutes';
import { pedagioValorRoutes } from './routes/pedagioValorRoutes';
import { rotaRoutes } from './routes/rotaRoutes';
import { rotaPedagioRoutes } from './routes/rotaPedagioRoutes';
import { rotaVinculadaRoutes } from './routes/rotaVinculadaRoutes';
import { viagemRoutes } from './routes/viagemRoutes';
import { connectToDatabase } from './config/db';
import { seedDatabase } from './config/seed';
import { seedRotaJacareiItupeva } from './config/seedRotaJacareiItupeva';
import { viagemDocumentoRoutes } from './routes/viagemDocumentoRoutes';


const app = express();

app.use(cors()); // Permite que seu app React Native faça requisições
app.use(express.json());  
app.use('/api', abastecimentoRoutes);
app.use('/api', alertaRoutes);
app.use('/api', caminhaoRoutes);
app.use('/api', cargaRoutes);
app.use('/api', carretaRoutes);
app.use('/api', empleadoraRoutes);
app.use('/api', manutencaoRoutes);
app.use('/api', motoristaRoutes);
app.use('/api', pedagioRoutes);
app.use('/api', pedagioValorRoutes);
app.use('/api', rotaRoutes);
app.use('/api', rotaPedagioRoutes);
app.use('/api', rotaVinculadaRoutes);
app.use('/api', viagemRoutes);  
app.use('/api', viagemDocumentoRoutes); 


// Conexão com o MongoDB
connectToDatabase();
// seedDatabase();
seedRotaJacareiItupeva(); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


