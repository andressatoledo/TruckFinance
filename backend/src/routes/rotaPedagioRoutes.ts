import express from 'express';
import { rotaPedagioController } from '../controllers/rotaPedagioController';

const router = express.Router();

router.post('/rota-pedagios', rotaPedagioController.criarRotaPedagio);
router.get('/rota-pedagios', rotaPedagioController.buscarRotaPedagios);
router.get('/rota-pedagios/:id', rotaPedagioController.buscarRotaPedagio);
router.put('/rota-pedagios/:id', rotaPedagioController.atualizarRotaPedagio);
router.delete('/rota-pedagios/:id', rotaPedagioController.excluirRotaPedagio);

export { router as rotaPedagioRoutes };
