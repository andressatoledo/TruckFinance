import express from 'express';
import { viagemDocumentoController } from '../controllers/viagemDocumentoController';

const router = express.Router();

router.post('/viagens-documentos', viagemDocumentoController.criarViagemDocumento);
router.get('/viagens-documentos', viagemDocumentoController.buscarViagensDocumento);
router.get('/viagens-documentos/:id', viagemDocumentoController.buscarViagemDocumento);
router.put('/viagens-documentos/:id', viagemDocumentoController.atualizarViagemDocumento);
router.delete('/viagens-documentos/:id', viagemDocumentoController.excluirViagemDocumento);

export { router as viagemDocumentoRoutes };
