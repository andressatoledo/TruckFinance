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

async function criarPedagioValores(req: Request, res: Response) {
  try {
    
    const { pedagioId, data } = req.body;
    
    if (!pedagioId) {
        return res.status(400).json({ message: 'O pedagioId é obrigatório para salvar.' });
    }

     await PedagioValor.deleteMany({ pedagioId  });


    if (data && data.length > 0) {
      
     
      const valoresFormatados = data.map((item: any) => ({
        ...item,
        pedagioId
      }));
      
      const novosValores = await PedagioValor.insertMany(valoresFormatados);
      return res.status(201).json(novosValores);
    }

    res.status(200).json({ message: 'Valores removidos e nenhum novo inserido.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao sincronizar valores. ${errorMessage}` });
  }
}


async function buscarPedagioValores(req: Request, res: Response) {
  try {
    const filtro = req.query; 

    const pedagioValores = await PedagioValor.find(filtro);  

    res.status(200).json(pedagioValores); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar valores de pedágio. ${errorMessage}` });
  }
}

async function buscarPedagioValor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        message: 'É necessário informar o id do valor do pedágio.',
      });
    }

    const pedagioValor = await PedagioValor.findById(id);  
    console.log('pedagioValor no controller',pedagioValor)

    res.status(200).json(pedagioValor);  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: `Erro ao buscar valor de pedágio. ${errorMessage}` });
  }
}

async function buscarPedagioValorByPedagioId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        message: 'É necessário informar o id do valor do pedágio.',
      });
    }

    const pedagioValor = await PedagioValor.find({pedagioId: id});  
 
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
  buscarPedagioValorByPedagioId,
  atualizarPedagioValor,
  excluirPedagioValor,
  criarPedagioValores
};
