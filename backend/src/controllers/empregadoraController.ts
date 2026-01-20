import { Request, Response } from 'express';
import { Empregadora } from '../models/index';

interface EmpregadoraPopulada {
  _id: string;
  empregadoraNome: string;
}


async function criarEmpregadora(req: Request, res: Response) {
  try {
    const novaEmpregadora = new Empregadora(req.body);

    await novaEmpregadora.save();
    res.status(201).json(novaEmpregadora);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar empregadora. ${errorMessage}` });
  }
}


async function buscarEmpreguradoras(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const empreguradoras = await Empregadora.find(filtro);  

    if (empreguradoras.length === 0) {
      return res.status(404).json({ message: 'Nenhuma empregadora encontrada com os filtros fornecidos.' });
    }

    res.status(200).json(empreguradoras); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar empreguradoras. ${errorMessage}` });
  }
}



async function buscarEmpregadoraCombo(req: Request, res: Response) {
  try {
    const empregadoras = await Empregadora.find().lean();
    const combo = empregadoras.map((rv) => ({
      value: rv._id,
      label: `${rv.empregadoraNome} `,
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

async function buscarEmpregadora(req: Request, res: Response) {
  try {
    const { id } = req.params;
   
    const empregadora = await Empregadora.findById(id);  

    res.status(200).json(empregadora);  
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar empregadora. ${errorMessage}` });
  }
}

async function atualizarEmpregadora(req: Request, res: Response) {
  try {
    const empleadoraId = req.params.id; 
    const dadosAtualizados = req.body; 

    const empleadoraAtualizada = await Empregadora.findByIdAndUpdate(empleadoraId, dadosAtualizados, { new: true });

    if (!empleadoraAtualizada) {
      return res.status(404).json({ message: 'Empregadora não encontrada para atualização.' });
    }

    res.status(200).json(empleadoraAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar empregadora. ${errorMessage}` });
  }
}

async function excluirEmpregadora(req: Request, res: Response) {
  try {
    const empleadoraId = req.params.id;  

    const empleadoraExcluida = await Empregadora.findByIdAndDelete(empleadoraId);

    if (!empleadoraExcluida) {
      return res.status(404).json({ message: 'Empregadora não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir empregadora. ${errorMessage}` });
  }
}

export const empregadoraController = {
  criarEmpregadora,
  buscarEmpreguradoras,
  buscarEmpregadora,
  atualizarEmpregadora,
  excluirEmpregadora,
  buscarEmpregadoraCombo
};
