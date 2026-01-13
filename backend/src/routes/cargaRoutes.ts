import express from 'express';
import { cargaController } from '../controllers/cargaController';

const router = express.Router();

router.post('/cargas', cargaController.criarCarga);
router.get('/cargas', cargaController.buscarCargas);
router.get('/cargas/:id', cargaController.buscarCarga);
router.put('/cargas/:id', cargaController.atualizarCarga);
router.delete('/cargas/:id', cargaController.excluirCarga);

export { router as cargaRoutes };
