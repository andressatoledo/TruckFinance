import express from 'express';
import { alertaController } from '../controllers/alertaController';

const router = express.Router();

router.post('/alertas', alertaController.criarAlerta);
router.get('/alertas', alertaController.buscarAlertas);
router.get('/alertas/:id', alertaController.buscarAlerta);
router.put('/alertas/:id', alertaController.atualizarAlerta);
router.delete('/alertas/:id', alertaController.excluirAlerta);

export { router as alertaRoutes };
