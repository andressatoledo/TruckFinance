import { Request, Response } from 'express';
import { Alerta } from '../models/index';

async function criarAlerta(req: Request, res: Response) {
  try {
    const novoAlerta = new Alerta(req.body);

    await novoAlerta.save();
    res.status(201).json(novoAlerta);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar alerta. ${errorMessage}` });
  }
}


async function buscarAlertas(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const alertas = await Alerta.find(filtro);  

    if (alertas.length === 0) {
      return res.status(404).json({ message: 'Nenhum alerta encontrado com os filtros fornecidos.' });
    }

    res.status(200).json(alertas); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar alertas. ${errorMessage}` });
  }
}

async function buscarAlerta(req: Request, res: Response) {
  try {
    const filtro = req.params;  

    if (!Object.keys(filtro).length) {
      return res.status(400).json({ message: 'É necessário informar um filtro.' });
    }

    const alerta = await Alerta.findOne(filtro);  

    if (!alerta) {
      return res.status(404).json({ message: 'Alerta não encontrado com o filtro fornecido.' });
    }

    res.status(200).json(alerta);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar alerta. ${errorMessage}` });
  }
}

async function atualizarAlerta(req: Request, res: Response) {
  try {
    const alertaId = req.params.id; 
    const dadosAtualizados = req.body; 

    const alertaAtualizado = await Alerta.findByIdAndUpdate(alertaId, dadosAtualizados, { new: true });

    if (!alertaAtualizado) {
      return res.status(404).json({ message: 'Alerta não encontrado para atualização.' });
    }

    res.status(200).json(alertaAtualizado);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar alerta. ${errorMessage}` });
  }
}

async function excluirAlerta(req: Request, res: Response) {
  try {
    const alertaId = req.params.id;  

    const alertaExcluido = await Alerta.findByIdAndDelete(alertaId);

    if (!alertaExcluido) {
      return res.status(404).json({ message: 'Alerta não encontrado para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir alerta. ${errorMessage}` });
  }
}

export const alertaController = {
  criarAlerta,
  buscarAlertas,
  buscarAlerta,
  atualizarAlerta,
  excluirAlerta
};
