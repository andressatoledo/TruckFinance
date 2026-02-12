import express from 'express';
import { pedagioValorController } from '../controllers/pedagioValorController';

const router = express.Router();

router.post('/pedagio-valores', pedagioValorController.criarPedagioValor);
router.post('/pedagio-valores/grid', pedagioValorController.criarPedagioValores);
router.get('/pedagio-valores', pedagioValorController.buscarPedagioValores);
router.get('/pedagio-valores/:id', pedagioValorController.buscarPedagioValor);
router.get('/pedagio-valores/pedagioId/:id', pedagioValorController.buscarPedagioValorByPedagioId);
router.put('/pedagio-valores/:id', pedagioValorController.atualizarPedagioValor);
router.delete('/pedagio-valores/:id', pedagioValorController.excluirPedagioValor);

export { router as pedagioValorRoutes };
