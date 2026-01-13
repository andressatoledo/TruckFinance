import { Request, Response } from 'express';
import { Pedagio } from '../models/index';

async function criarPedagio(req: Request, res: Response) {
  try {
    const novoPedagio = new Pedagio(req.body);

    await novoPedagio.save();
    res.status(201).json(novoPedagio);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar pedágio. ${errorMessage}` });
  }
}


async function buscarPedagios(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const pedagios = await Pedagio.find(filtro);  

    if (pedagios.length === 0) {
      return res.status(404).json({ message: 'Nenhum pedágio encontrado com os filtros fornecidos.' });
    }

    res.status(200).json(pedagios); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar pedágios. ${errorMessage}` });
  }
}

async function buscarPedagio(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const pedagio = await Pedagio.findOne(filtro);  

    if (!pedagio) {
      return res.status(404).json({ message: 'Pedágio não encontrado com o filtro fornecido.' });
    }

    res.status(200).json(pedagio);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar pedágio. ${errorMessage}` });
  }
}

async function atualizarPedagio(req: Request, res: Response) {
  try {
    const pedagioId = req.params.id; 
    const dadosAtualizados = req.body; 

    const pedagioAtualizado = await Pedagio.findByIdAndUpdate(pedagioId, dadosAtualizados, { new: true });

    if (!pedagioAtualizado) {
      return res.status(404).json({ message: 'Pedágio não encontrado para atualização.' });
    }

    res.status(200).json(pedagioAtualizado);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar pedágio. ${errorMessage}` });
  }
}

async function excluirPedagio(req: Request, res: Response) {
  try {
    const pedagioId = req.params.id;  

    const pedagioExcluido = await Pedagio.findByIdAndDelete(pedagioId);

    if (!pedagioExcluido) {
      return res.status(404).json({ message: 'Pedágio não encontrado para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir pedágio. ${errorMessage}` });
  }
}

export const pedagioController = {
  criarPedagio,
  buscarPedagios,
  buscarPedagio,
  atualizarPedagio,
  excluirPedagio
};
