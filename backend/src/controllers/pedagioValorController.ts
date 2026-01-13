import { Request, Response } from 'express';
import { PedagioValor } from '../models/index';

async function criarPedagioValor(req: Request, res: Response) {
  try {
    const novoPedagioValor = new PedagioValor(req.body);

    await novoPedagioValor.save();
    res.status(201).json(novoPedagioValor);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar valor de pedágio. ${errorMessage}` });
  }
}


async function buscarPedagioValores(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const pedagioValores = await PedagioValor.find(filtro);  

    if (pedagioValores.length === 0) {
      return res.status(404).json({ message: 'Nenhum valor de pedágio encontrado com os filtros fornecidos.' });
    }

    res.status(200).json(pedagioValores); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar valores de pedágio. ${errorMessage}` });
  }
}

async function buscarPedagioValor(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const pedagioValor = await PedagioValor.findOne(filtro);  

    if (!pedagioValor) {
      return res.status(404).json({ message: 'Valor de pedágio não encontrado com o filtro fornecido.' });
    }

    res.status(200).json(pedagioValor);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar valor de pedágio. ${errorMessage}` });
  }
}

async function atualizarPedagioValor(req: Request, res: Response) {
  try {
    const pedagioValorId = req.params.id; 
    const dadosAtualizados = req.body; 

    const pedagioValorAtualizado = await PedagioValor.findByIdAndUpdate(pedagioValorId, dadosAtualizados, { new: true });

    if (!pedagioValorAtualizado) {
      return res.status(404).json({ message: 'Valor de pedágio não encontrado para atualização.' });
    }

    res.status(200).json(pedagioValorAtualizado);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar valor de pedágio. ${errorMessage}` });
  }
}

async function excluirPedagioValor(req: Request, res: Response) {
  try {
    const pedagioValorId = req.params.id;  

    const pedagioValorExcluido = await PedagioValor.findByIdAndDelete(pedagioValorId);

    if (!pedagioValorExcluido) {
      return res.status(404).json({ message: 'Valor de pedágio não encontrado para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir valor de pedágio. ${errorMessage}` });
  }
}

export const pedagioValorController = {
  criarPedagioValor,
  buscarPedagioValores,
  buscarPedagioValor,
  atualizarPedagioValor,
  excluirPedagioValor
};
