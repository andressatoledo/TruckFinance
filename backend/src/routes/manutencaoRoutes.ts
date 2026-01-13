import express from 'express';
import { manutencaoController } from '../controllers/manutencaoController';

const router = express.Router();

router.post('/manutencoes', manutencaoController.criarManutencao);
router.get('/manutencoes', manutencaoController.buscarManutencoes);
router.get('/manutencoes/:id', manutencaoController.buscarManutencao);
router.put('/manutencoes/:id', manutencaoController.atualizarManutencao);
router.delete('/manutencoes/:id', manutencaoController.excluirManutencao);

export { router as manutencaoRoutes };
