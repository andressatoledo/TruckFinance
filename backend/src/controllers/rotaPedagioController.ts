import { Request, Response } from 'express';
import { RotaPedagio } from '../models/index';

async function criarRotaPedagio(req: Request, res: Response) {
  try {
    const novaRotaPedagio = new RotaPedagio(req.body);

    await novaRotaPedagio.save();
    res.status(201).json(novaRotaPedagio);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar rota pedágio. ${errorMessage}` });
  }
}


async function buscarRotaPedagios(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const rotaPedagios = await RotaPedagio.find(filtro);  


    res.status(200).json(rotaPedagios); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar rotas pedágios. ${errorMessage}` });
  }
}

async function buscarRotaPedagio(req: Request, res: Response) {
  try {
    const { id } = req.params;  

    if (!id) {
      return res.status(400).json({
        message: 'É necessário informar o id da rota do pedágio.',
      });
    }

    const rotaPedagio = await RotaPedagio.findById(id);  


    res.status(200).json(rotaPedagio);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar rota pedágio. ${errorMessage}` });
  }
}

async function atualizarRotaPedagio(req: Request, res: Response) {
  try {
    const rotaPedagioId = req.params.id; 
    const dadosAtualizados = req.body; 

    const rotaPedagioAtualizado = await RotaPedagio.findByIdAndUpdate(rotaPedagioId, dadosAtualizados, { new: true });

    if (!rotaPedagioAtualizado) {
      return res.status(404).json({ message: 'Rota pedágio não encontrada para atualização.' });
    }

    res.status(200).json(rotaPedagioAtualizado);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar rota pedágio. ${errorMessage}` });
  }
}

async function excluirRotaPedagio(req: Request, res: Response) {
  try {
    const rotaPedagioId = req.params.id;  

    const rotaPedagioExcluido = await RotaPedagio.findByIdAndDelete(rotaPedagioId);

    if (!rotaPedagioExcluido) {
      return res.status(404).json({ message: 'Rota pedágio não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir rota pedágio. ${errorMessage}` });
  }
}

export const rotaPedagioController = {
  criarRotaPedagio,
  buscarRotaPedagios,
  buscarRotaPedagio,
  atualizarRotaPedagio,
  excluirRotaPedagio
};
