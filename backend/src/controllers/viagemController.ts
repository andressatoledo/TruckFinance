import { Request, Response } from 'express';
import { Viagem } from '../models/index';


export async function criarViagem(req: Request, res: Response) {
  console.log('📥 BODY RECEBIDO:', req.body);
  try {
    const data = req.body;
    const novaViagem = new Viagem(data);
    await novaViagem.save();

    return res.status(201).json(novaViagem);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.name === 'ValidationError' || error.name === 'CastError')
    ) {
      return res.status(400).json({
        message: 'Dados inválidos',
        error: error.message,
      });
    }

    console.error('Erro ao criar viagem:', error);

    return res.status(500).json({
      message: 'Erro interno ao criar viagem',
    });
  }
}



async function buscarViagens(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const viagens = await Viagem.find(filtro);  

    if (viagens.length === 0) {
      return res.status(404).json({ message: 'Nenhuma viagem encontrada com os filtros fornecidos.' });
    }

    res.status(200).json(viagens); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar viagens. ${errorMessage}` });
  }
}

async function buscarViagem(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const viagem = await Viagem.findOne(filtro);  

    if (!viagem) {
      return res.status(404).json({ message: 'Viagem não encontrada com o filtro fornecido.' });
    }

    res.status(200).json(viagem);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar viagem. ${errorMessage}` });
  }
}

async function atualizarViagem(req: Request, res: Response) {
  try {
    const viagemId = req.params.id; 
    const dadosAtualizados = req.body; 

    const viagemAtualizada = await Viagem.findByIdAndUpdate(viagemId, dadosAtualizados, { new: true });

    if (!viagemAtualizada) {
      return res.status(404).json({ message: 'Viagem não encontrada para atualização.' });
    }

    res.status(200).json(viagemAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar viagem. ${errorMessage}` });
  }
}

async function excluirViagem(req: Request, res: Response) {
  try {
    const viagemId = req.params.id;  

    const viagemExcluida = await Viagem.findByIdAndDelete(viagemId);

    if (!viagemExcluida) {
      return res.status(404).json({ message: 'Viagem não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir viagem. ${errorMessage}` });
  }
}

export const viagemController = {
  criarViagem,
  buscarViagens,
  buscarViagem,
  atualizarViagem,
  excluirViagem
};
