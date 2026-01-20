import { Request, Response } from 'express';
import { Motorista } from '../models/index';

async function criarMotorista(req: Request, res: Response) {
  try {
    const novoMotorista = new Motorista(req.body);

    await novoMotorista.save();
    res.status(201).json(novoMotorista);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar motorista. ${errorMessage}` });
  }
}

interface MotoristaPopulado {
  _id: string;
  motoristaNome: string;
}


async function buscarMotoristas(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const motoristas = await Motorista.find(filtro);  

    if (motoristas.length === 0) {
      return res.status(404).json({ message: 'Nenhum motorista encontrado com os filtros fornecidos.' });
    }

    res.status(200).json(motoristas); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar motoristas. ${errorMessage}` });
  }
}


async function buscarMotoristaCombo(req: Request, res: Response) {
  try {
    const motoristas = await Motorista.find().lean();
    const combo = motoristas.map((rv) => ({
      value: rv._id,
      label: `${rv.motoristaNome} `,
    }));
   
    res.status(200).json(combo);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(500).json({
      message: `Erro ao buscar motoristas para combo. ${errorMessage}`,
    });
  }
}


async function buscarMotorista(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // if (!id) {
    //   return res.status(400).json({
    //   message: 'É necessário informar o id do motorista.',
    // });
    // }

    const motorista = await Motorista.findById(id);  

    // if (!motorista) {
    //   return res.status(404).json({ message: 'Motorista não encontrado com o filtro fornecido.' });
    // }

    res.status(200).json(motorista);  

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar motorista. ${errorMessage}` });
  }
}

async function atualizarMotorista(req: Request, res: Response) {
  try {
    const motoristaId = req.params.id; 
    const dadosAtualizados = req.body; 

    const motoristaAtualizado = await Motorista.findByIdAndUpdate(motoristaId, dadosAtualizados, { new: true });

    if (!motoristaAtualizado) {
      return res.status(404).json({ message: 'Motorista não encontrado para atualização.' });
    }

    res.status(200).json(motoristaAtualizado);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar motorista. ${errorMessage}` });
  }
}

async function excluirMotorista(req: Request, res: Response) {
  try {
    const motoristaId = req.params.id;  

    const motoristaExcluido = await Motorista.findByIdAndDelete(motoristaId);

    if (!motoristaExcluido) {
      return res.status(404).json({ message: 'Motorista não encontrado para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir motorista. ${errorMessage}` });
  }
}

export const motoristaController = {
  criarMotorista,
  buscarMotoristas,
  buscarMotorista,
  atualizarMotorista,
  excluirMotorista,
  buscarMotoristaCombo
};
