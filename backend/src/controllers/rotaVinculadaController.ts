import { Request, Response } from 'express';
import { RotaVinculada } from '../models/index';

interface RotaPopulada {
  _id: string;
  rotaNome: string;
}

async function criarRotaVinculada(req: Request, res: Response) {
  try {
    const novaRotaVinculada = new RotaVinculada(req.body);

    await novaRotaVinculada.save();
    res.status(201).json(novaRotaVinculada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao criar rota vinculada. ${errorMessage}` });
  }
}


async function buscarRotasVinculadas(req: Request, res: Response) {
  try {
    const filtro = req.query;

    const rotasVinculadas = await RotaVinculada.find(filtro)
      .populate('rotaIdaId', 'rotaNome')
      .populate('rotaVoltaId', 'rotaNome');

    // if (rotasVinculadas.length === 0) {
    //   return res.status(404).json({
    //     message: 'Nenhuma rota vinculada encontrada.',
    //   });
    // }

    res.status(200).json(rotasVinculadas);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';
    res
      .status(500)
      .json({ message: `Erro ao buscar rotas vinculadas. ${errorMessage}` });
  }
}

async function buscarRotasVinculadasCombo(req: Request, res: Response) {
  try {
    console.log('backend buscarRotasVinculadasCombo');
    
    const rotasVinculadas = await RotaVinculada.find()
    .populate<{ rotaIdaId: RotaPopulada }>('rotaIdaId', 'rotaNome')
    .populate<{ rotaVoltaId: RotaPopulada }>('rotaVoltaId', 'rotaNome')
    .lean();


    const combo = rotasVinculadas.map((rv) => ({
      value: rv._id,
      label: `${rv.rotaIdaId?.rotaNome ?? 'Origem'} (Ida) → ${
        rv.rotaVoltaId?.rotaNome ?? 'Destino'
      } (Volta)`,
    }));
    console.log('combo',combo)
    res.status(200).json(combo);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(500).json({
      message: `Erro ao buscar rotas vinculadas para combo. ${errorMessage}`,
    });
  }
}


async function buscarRotaVinculada(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'É necessário informar o id da rota de vinculada.',
      });
    }

    const rotaVinculada = await RotaVinculada.findById(id)
      .populate('rotaIdaId', 'rotaNome')
      .populate('rotaVoltaId', 'rotaNome');

    if (!rotaVinculada) {
      return res.status(404).json({
        message: 'Rota vinculada não encontrada.',
      });
    }

    res.status(200).json(rotaVinculada);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';
    res
      .status(500)
      .json({ message: `Erro ao buscar rota vinculada. ${errorMessage}` });
  }
}


async function atualizarRotaVinculada(req: Request, res: Response) {
  try {
    const rotaVinculadaId = req.params.id; 
    const dadosAtualizados = req.body; 

    const rotaVinculadaAtualizada = await RotaVinculada.findByIdAndUpdate(rotaVinculadaId, dadosAtualizados, { new: true });

    if (!rotaVinculadaAtualizada) {
      return res.status(404).json({ message: 'Rota vinculada não encontrada para atualização.' });
    }

    res.status(200).json(rotaVinculadaAtualizada);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao atualizar rota vinculada. ${errorMessage}` });
  }
}

async function excluirRotaVinculada(req: Request, res: Response) {
  try {
    const rotaVinculadaId = req.params.id;  

    const rotaVinculadaExcluida = await RotaVinculada.findByIdAndDelete(rotaVinculadaId);

    if (!rotaVinculadaExcluida) {
      return res.status(404).json({ message: 'Rota vinculada não encontrada para exclusão.' });
    }

    res.status(204).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao excluir rota vinculada. ${errorMessage}` });
  }
}

export const rotaVinculadaController = {
  criarRotaVinculada,
  buscarRotasVinculadas,
  buscarRotaVinculada,
  buscarRotasVinculadasCombo,
  atualizarRotaVinculada,
  excluirRotaVinculada
};
