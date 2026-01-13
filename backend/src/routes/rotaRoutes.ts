import express from 'express';
import { rotaController } from '../controllers/rotaController';

const router = express.Router();

router.post('/rotas', rotaController.criarRota);
router.get('/rotas', rotaController.buscarRotas);
router.get('/rotas/:id', rotaController.buscarRota);
router.put('/rotas/:id', rotaController.atualizarRota);
router.delete('/rotas/:id', rotaController.excluirRota);

export { router as rotaRoutes };
