import { Request, Response } from 'express';
import { Rota } from '../models/index';

async function criarRota(req: Request, res: Response) {
  try {
    const novaRota = new Rota(req.body);

    await novaRota.save();
    res.status(201).json(novaRota);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar rota. ${errorMessage}` });
  }
}


async function buscarRotas(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const rotas = await Rota.find(filtro);  

    if (rotas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma rota encontrada com os filtros fornecidos.' });
    }

    res.status(200).json(rotas); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar rotas. ${errorMessage}` });
  }
}

async function buscarRota(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const rota = await Rota.findOne(filtro);  

    if (!rota) {
      return res.status(404).json({ message: 'Rota não encontrada com o filtro fornecido.' });
    }

    res.status(200).json(rota);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar rota. ${errorMessage}` });
  }
}

async function atualizarRota(req: Request, res: Response) {
  try {
    const rotaId = req.params.id; 
    const dadosAtualizados = req.body; 

    const rotaAtualizada = await Rota.findByIdAndUpdate(rotaId, dadosAtualizados, { new: true });

    if (!rotaAtualizada) {
      return res.status(404).json({ message: 'Rota não encontrada para atualização.' });
    }

    res.status(200).json(rotaAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar rota. ${errorMessage}` });
  }
}

async function excluirRota(req: Request, res: Response) {
  try {
    const rotaId = req.params.id;  

    const rotaExcluida = await Rota.findByIdAndDelete(rotaId);

    if (!rotaExcluida) {
      return res.status(404).json({ message: 'Rota não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir rota. ${errorMessage}` });
  }
}

export const rotaController = {
  criarRota,
  buscarRotas,
  buscarRota,
  atualizarRota,
  excluirRota
};
