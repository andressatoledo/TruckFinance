import { Request, Response } from 'express';
import { Caminhao } from '../models/index';
import { montarFiltroCaminhao } from '../filters/caminhao';

async function criarCaminhao(req: Request, res: Response) {
  try {
    const novoCaminhao = new Caminhao(req.body);

    await novoCaminhao.save();
    res.status(201).json(novoCaminhao);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar caminhão. ${errorMessage}` });
  }
}


async function buscarCaminhoes(req: Request, res: Response) {
  try {
    const filtro = montarFiltroCaminhao(req.query);
   
    const caminhoes = await Caminhao.find(filtro);  

    res.status(200).json(caminhoes); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar caminhões. ${errorMessage}` });
  }
}

async function buscarCaminhaoCombo(req: Request, res: Response) {
  try {
    const caminhoes = await Caminhao.find().lean();
    const combo = caminhoes.map((rv) => ({
      value: rv._id,
      label: `${rv.caminhaoNome} - ${rv.caminhaoPlaca} `,
    }));
   
    res.status(200).json(combo);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(500).json({
      message: `Erro ao buscar caminhões para combo. ${errorMessage}`,
    });
  }
}


async function buscarCaminhao(req: Request, res: Response) {
  try {
    const { id } = req.params;  

    const caminhao = await Caminhao.findById(id);

    res.status(200).json(caminhao);  

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar caminhão. ${errorMessage}` });
  }
}

async function atualizarCaminhao(req: Request, res: Response) {
  try {
    const caminhaoId = req.params.id; 
    const dadosAtualizados = req.body; 

    const caminhaoAtualizado = await Caminhao.findByIdAndUpdate(caminhaoId, dadosAtualizados, { new: true });

    if (!caminhaoAtualizado) {
      return res.status(404).json({ message: 'Caminhão não encontrado para atualização.' });
    }

    res.status(200).json(caminhaoAtualizado);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar caminhão. ${errorMessage}` });
  }
}

async function excluirCaminhao(req: Request, res: Response) {
  try {
    const caminhaoId = req.params.id;  

    const caminhaoExcluido = await Caminhao.findByIdAndDelete(caminhaoId);

    if (!caminhaoExcluido) {
      return res.status(404).json({ message: 'Caminhão não encontrado para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir caminhão. ${errorMessage}` });
  }
}

export const caminhaoController = {
  criarCaminhao,
  buscarCaminhoes,
  buscarCaminhao,
  atualizarCaminhao,
  excluirCaminhao,
  buscarCaminhaoCombo
};
