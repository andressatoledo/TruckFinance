import { Request, Response } from 'express';
import { Carga } from '../models/index';

async function criarCarga(req: Request, res: Response) {
  try {
    const novaCarga = new Carga(req.body);

    await novaCarga.save();
    res.status(201).json(novaCarga);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar carga. ${errorMessage}` });
  }
}


async function buscarCargas(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const cargas = await Carga.find(filtro);  

    if (cargas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma carga encontrada com os filtros fornecidos.' });
    }

    res.status(200).json(cargas); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar cargas. ${errorMessage}` });
  }
}

async function buscarCarga(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const carga = await Carga.findOne(filtro);  

    if (!carga) {
      return res.status(404).json({ message: 'Carga não encontrada com o filtro fornecido.' });
    }

    res.status(200).json(carga);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar carga. ${errorMessage}` });
  }
}

async function atualizarCarga(req: Request, res: Response) {
  try {
    const cargaId = req.params.id; 
    const dadosAtualizados = req.body; 

    const cargaAtualizada = await Carga.findByIdAndUpdate(cargaId, dadosAtualizados, { new: true });

    if (!cargaAtualizada) {
      return res.status(404).json({ message: 'Carga não encontrada para atualização.' });
    }

    res.status(200).json(cargaAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar carga. ${errorMessage}` });
  }
}

async function excluirCarga(req: Request, res: Response) {
  try {
    const cargaId = req.params.id;  

    const cargaExcluida = await Carga.findByIdAndDelete(cargaId);

    if (!cargaExcluida) {
      return res.status(404).json({ message: 'Carga não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir carga. ${errorMessage}` });
  }
}

export const cargaController = {
  criarCarga,
  buscarCargas,
  buscarCarga,
  atualizarCarga,
  excluirCarga
};
