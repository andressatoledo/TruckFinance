import express from 'express';
import { pedagioValorController } from '../controllers/pedagioValorController';

const router = express.Router();

router.post('/pedagio-valores', pedagioValorController.criarPedagioValor);
router.get('/pedagio-valores', pedagioValorController.buscarPedagioValores);
router.get('/pedagio-valores/:id', pedagioValorController.buscarPedagioValor);
router.put('/pedagio-valores/:id', pedagioValorController.atualizarPedagioValor);
router.delete('/pedagio-valores/:id', pedagioValorController.excluirPedagioValor);

export { router as pedagioValorRoutes };
