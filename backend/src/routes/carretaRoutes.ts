import express from 'express';
import { carretaController } from '../controllers/carretaController';

const router = express.Router();

router.post('/carretas', carretaController.criarCarreta);
router.get('/carretas', carretaController.buscarCarretas);
router.get('/carretas/combo', carretaController.buscarCarretaCombo);
router.get('/carretas/:id', carretaController.buscarCarreta);
router.put('/carretas/:id', carretaController.atualizarCarreta);
router.delete('/carretas/:id', carretaController.excluirCarreta);

export { router as carretaRoutes };

