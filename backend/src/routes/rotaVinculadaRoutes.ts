import express from 'express';
import { rotaVinculadaController } from '../controllers/rotaVinculadaController';

const router = express.Router();

router.post('/rotas-vinculadas', rotaVinculadaController.criarRotaVinculada);
router.get('/rotas-vinculadas', rotaVinculadaController.buscarRotasVinculadas);
router.get('/rotas-vinculadas/combo', rotaVinculadaController.buscarRotasVinculadasCombo);
router.get('/rotas-vinculadas/:id', rotaVinculadaController.buscarRotaVinculada);
router.put('/rotas-vinculadas/:id', rotaVinculadaController.atualizarRotaVinculada);
router.delete('/rotas-vinculadas/:id', rotaVinculadaController.excluirRotaVinculada);

export { router as rotaVinculadaRoutes };
