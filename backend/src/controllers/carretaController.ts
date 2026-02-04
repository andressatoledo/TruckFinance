import { Request, Response } from 'express';
import { Carreta } from '../models/index';

async function criarCarreta(req: Request, res: Response) {
  try {
    const novaCarreta = new Carreta(req.body);

    await novaCarreta.save();
    res.status(201).json(novaCarreta);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar carreta. ${errorMessage}` });
  }
}


async function buscarCarretaCombo(req: Request, res: Response) {
  try {
    const carretas = await Carreta.find().lean();
    
    const combo = carretas.map((rv) => ({
      value: rv._id,
      label: `${rv.carretaQuantidadeEixosCheio} - ${rv.carretaTipo} `,
    }));
   
    res.status(200).json(combo);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(500).json({
      message: `Erro ao buscar carretas para combo. ${errorMessage}`,
    });
  }
}



async function buscarCarretas(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const carretas = await Carreta.find(filtro);  

    // if (carretas.length === 0) {
    //   return res.status(404).json({ message: 'Nenhuma carreta encontrada com os filtros fornecidos.' });
    // }

    res.status(200).json(carretas); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar carretas. ${errorMessage}` });
  }
}

async function buscarCarreta(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'É necessário informar o id da carreta.',
      });
    }

    const carreta = await Carreta.findById(id);  

    res.status(200).json(carreta);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar carreta. ${errorMessage}` });
  }
}

async function atualizarCarreta(req: Request, res: Response) {
  try {
    const carretaId = req.params.id; 
    const dadosAtualizados = req.body; 

    const carretaAtualizada = await Carreta.findByIdAndUpdate(carretaId, dadosAtualizados, { new: true });

    if (!carretaAtualizada) {
      return res.status(404).json({ message: 'Carreta não encontrada para atualização.' });
    }

    res.status(200).json(carretaAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar carreta. ${errorMessage}` });
  }
}

async function excluirCarreta(req: Request, res: Response) {
  try {
    const carretaId = req.params.id;  

    const carretaExcluida = await Carreta.findByIdAndDelete(carretaId);

    if (!carretaExcluida) {
      return res.status(404).json({ message: 'Carreta não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir carreta. ${errorMessage}` });
  }
}

export const carretaController = {
  criarCarreta,
  buscarCarretas,
  buscarCarreta,
  atualizarCarreta,
  excluirCarreta,
  buscarCarretaCombo
};
