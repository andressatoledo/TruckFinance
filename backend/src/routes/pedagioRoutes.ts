import express from 'express';
import { pedagioController } from '../controllers/pedagioController';

const router = express.Router();

router.post('/pedagios', pedagioController.criarPedagio);
router.get('/pedagios', pedagioController.buscarPedagios);
router.get('/pedagios/:id', pedagioController.buscarPedagio);
router.put('/pedagios/:id', pedagioController.atualizarPedagio);
router.delete('/pedagios/:id', pedagioController.excluirPedagio);

export { router as pedagioRoutes };
