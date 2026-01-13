import express from 'express';
import { motoristaController } from '../controllers/motoristaController';

const router = express.Router();

router.post('/motoristas', motoristaController.criarMotorista);
router.get('/motoristas', motoristaController.buscarMotoristas);
router.get('/motoristas/combo', motoristaController.buscarMotoristaCombo);
router.get('/motoristas/:id', motoristaController.buscarMotorista);
router.put('/motoristas/:id', motoristaController.atualizarMotorista);
router.delete('/motoristas/:id', motoristaController.excluirMotorista);

export { router as motoristaRoutes };
