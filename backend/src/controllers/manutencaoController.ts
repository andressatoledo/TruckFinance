import { Request, Response } from 'express';
import { Manutencao } from '../models/index';

async function criarManutencao(req: Request, res: Response) {
  try {
    const novaManutencao = new Manutencao(req.body);

    await novaManutencao.save();
    res.status(201).json(novaManutencao);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar manutenção. ${errorMessage}` });
  }
}


async function buscarManutencoes(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const manutencoes = await Manutencao.find(filtro);  

    if (manutencoes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma manutenção encontrada com os filtros fornecidos.' });
    }

    res.status(200).json(manutencoes); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar manutenções. ${errorMessage}` });
  }
}

async function buscarManutencao(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const manutencao = await Manutencao.findOne(filtro);  

    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada com o filtro fornecido.' });
    }

    res.status(200).json(manutencao);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar manutenção. ${errorMessage}` });
  }
}

async function atualizarManutencao(req: Request, res: Response) {
  try {
    const manutencaoId = req.params.id; 
    const dadosAtualizados = req.body; 

    const manutencaoAtualizada = await Manutencao.findByIdAndUpdate(manutencaoId, dadosAtualizados, { new: true });

    if (!manutencaoAtualizada) {
      return res.status(404).json({ message: 'Manutenção não encontrada para atualização.' });
    }

    res.status(200).json(manutencaoAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar manutenção. ${errorMessage}` });
  }
}

async function excluirManutencao(req: Request, res: Response) {
  try {
    const manutencaoId = req.params.id;  

    const manutencaoExcluida = await Manutencao.findByIdAndDelete(manutencaoId);

    if (!manutencaoExcluida) {
      return res.status(404).json({ message: 'Manutenção não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir manutenção. ${errorMessage}` });
  }
}

export const manutencaoController = {
  criarManutencao,
  buscarManutencoes,
  buscarManutencao,
  atualizarManutencao,
  excluirManutencao
};
