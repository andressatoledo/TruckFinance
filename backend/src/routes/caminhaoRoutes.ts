import express from 'express';
import { caminhaoController } from '../controllers/caminhaoController';

const router = express.Router();

router.post('/caminhoes', caminhaoController.criarCaminhao);
router.get('/caminhoes', caminhaoController.buscarCaminhoes);
router.get('/caminhoes/combo', caminhaoController.buscarCaminhaoCombo);
router.get('/caminhoes/:id', caminhaoController.buscarCaminhao);
router.put('/caminhoes/:id', caminhaoController.atualizarCaminhao);
router.delete('/caminhoes/:id', caminhaoController.excluirCaminhao);

export { router as caminhaoRoutes };
