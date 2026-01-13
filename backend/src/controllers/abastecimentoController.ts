import { Request, Response } from 'express';
import { Abastecimento } from '../models/index';

async function criarAbastecimento(req: Request, res: Response) {
  try {
    const novoAbastecimento = new Abastecimento(req.body);

    await novoAbastecimento.save();
    res.status(201).json(novoAbastecimento);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar abastecimento. ${errorMessage}` });
  }
}


async function buscarAbastecimentos(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const abastecimentos = await Abastecimento.find(filtro);  

    if (abastecimentos.length === 0) {
      return res.status(404).json({ message: 'Nenhum abastecimento encontrado com os filtros fornecidos.' });
    }

    res.status(200).json(abastecimentos); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar abastecimentos. ${errorMessage}` });
  }
}

async function buscarAbastecimento(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const abastecimento = await Abastecimento.findOne(filtro);  

    if (!abastecimento) {
      return res.status(404).json({ message: 'Abastecimento não encontrado com o filtro fornecido.' });
    }

    res.status(200).json(abastecimento);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar abastecimento. ${errorMessage}` });
  }
}

async function atualizarAbastecimento(req: Request, res: Response) {
  try {
    const abastecimentoId = req.params.id; 
    const dadosAtualizados = req.body; 

    const abastecimentoAtualizado = await Abastecimento.findByIdAndUpdate(abastecimentoId, dadosAtualizados, { new: true });

    if (!abastecimentoAtualizado) {
      return res.status(404).json({ message: 'Abastecimento não encontrado para atualização.' });
    }

    res.status(200).json(abastecimentoAtualizado);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar abastecimento. ${errorMessage}` });
  }
}

async function excluirAbastecimento(req: Request, res: Response) {
  try {
    const abastecimentoId = req.params.id;  

    const abastecimentoExcluido = await Abastecimento.findByIdAndDelete(abastecimentoId);

    if (!abastecimentoExcluido) {
      return res.status(404).json({ message: 'Abastecimento não encontrado para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir abastecimento. ${errorMessage}` });
  }
}

export const abastecimentoController = {
  criarAbastecimento,
  buscarAbastecimentos,
  buscarAbastecimento,
  atualizarAbastecimento,
  excluirAbastecimento
};
