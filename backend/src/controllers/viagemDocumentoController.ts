import { Request, Response } from 'express';
import { ViagemDocumento } from '../models/index';

async function criarViagemDocumento(req: Request, res: Response) {
  try {
    const novoViagemDocumento = new ViagemDocumento(req.body);
    await novoViagemDocumento.save();
    res.status(201).json(novoViagemDocumento);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar documento da viagem. ${errorMessage}` });
  }
}


async function buscarViagensDocumento(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const viagemDocumentos = await ViagemDocumento.find(filtro);  

    res.status(200).json(viagemDocumentos); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar documentos da viagem. ${errorMessage}` });
  }
}

async function buscarViagemDocumento(req: Request, res: Response) {
  try {
    const { id } = req.params;  

    if (!id) {
      return res.status(400).json({
        message: 'É necessário informar o id do documento da viagem.',
      });
    }
    const viagemDocumento = await ViagemDocumento.findById(id);  


    res.status(200).json(viagemDocumento);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar documento da viagem. ${errorMessage}` });
  }
}

async function atualizarViagemDocumento(req: Request, res: Response) {
  try {
    const viagemDocumentoId = req.params.id; 
    const dadosAtualizados = req.body; 

    const viagemDocumentoAtualizada = await ViagemDocumento.findByIdAndUpdate(viagemDocumentoId, dadosAtualizados, { new: true });

    if (!viagemDocumentoAtualizada) {
      return res.status(404).json({ message: 'Documento da viagem não encontrado para atualização.' });
    }

    res.status(200).json(viagemDocumentoAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar viagem. ${errorMessage}` });
  }
}

async function excluirViagemDocumento(req: Request, res: Response) {
  try {
    const viagemDocumentoId = req.params.id;  

    const viagemDocumentoExcluido = await ViagemDocumento.findByIdAndDelete(viagemDocumentoId);

    if (!viagemDocumentoExcluido) {
      return res.status(404).json({ message: 'Documento da viagem não encontrado para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir documento da viagem. ${errorMessage}` });
  }
}

export const viagemDocumentoController = {
  criarViagemDocumento,
  buscarViagensDocumento,
  buscarViagemDocumento,
  atualizarViagemDocumento,
  excluirViagemDocumento
};
