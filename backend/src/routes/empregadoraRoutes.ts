import express from 'express';
import { empregadoraController } from '../controllers/empregadoraController';

const router = express.Router();

router.post('/empregadoras', empregadoraController.criarEmpregadora);
router.get('/empregadoras', empregadoraController.buscarEmpregadora);
router.get('/empregadoras/combo', empregadoraController.buscarEmpregadoraCombo);
router.get('/empregadoras/:id', empregadoraController.buscarEmpregadora);
router.put('/empregadoras/:id', empregadoraController.atualizarEmpregadora);
router.delete('/empregadoras/:id', empregadoraController.excluirEmpregadora);

export { router as empleadoraRoutes };
