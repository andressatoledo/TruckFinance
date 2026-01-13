import express from 'express';
import { viagemController } from '../controllers/viagemController';

const router = express.Router();

router.post('/viagens', viagemController.criarViagem);
router.get('/viagens', viagemController.buscarViagens);
router.get('/viagens/:id', viagemController.buscarViagem);
router.put('/viagens/:id', viagemController.atualizarViagem);
router.delete('/viagens/:id', viagemController.excluirViagem);

export { router as viagemRoutes };
