import express from 'express';
import { abastecimentoController } from '../controllers/abastecimentoController';

const router = express.Router();

router.post('/abastecimentos', abastecimentoController.criarAbastecimento);
router.get('/abastecimentos', abastecimentoController.buscarAbastecimentos);
router.get('/abastecimentos/:id', abastecimentoController.buscarAbastecimento);
router.put('/abastecimentos/:id', abastecimentoController.atualizarAbastecimento);
router.delete('/abastecimentos/:id', abastecimentoController.excluirAbastecimento);

export { router as abastecimentoRoutes };
