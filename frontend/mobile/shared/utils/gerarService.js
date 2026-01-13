const fs = require('fs');
const path = require('path');

/**
 * Entidades:
 * nome: nome base do arquivo e tipo
 * endpoint: endpoint da API
 */
const entidades = [
  { nome: 'carga', endpoint: 'cargas' },
  { nome: 'carreta', endpoint: 'carretas' },
  { nome: 'empregadora', endpoint: 'empregadoras' },
  { nome: 'manutencao', endpoint: 'manutencoes' },
  { nome: 'motorista', endpoint: 'motoristas' },
  { nome: 'pedagio', endpoint: 'pedagios' },
  { nome: 'pedagioValor', endpoint: 'pedagio-valores' },
  { nome: 'rota', endpoint: 'rotas' },
  { nome: 'rotaPedagio', endpoint: 'rota-pedagios' },
  { nome: 'rotaVinculada', endpoint: 'rota-vinculadas' },
];

const servicesDir = path.resolve(__dirname, 'src/services');

function capitalize(nome) {
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function serviceTemplate(nome, endpoint) {
  const Nome = capitalize(nome);

  return `// src/services/${nome}Service.ts
import { api } from './api';
import { ${Nome} } from '../types/${nome}';

const ENDPOINT = '/${endpoint}';

export const ${Nome}Service = {
  async buscarTodas(): Promise<${Nome}[]> {
    const response = await api.get<${Nome}[]>(ENDPOINT);
    return response.data;
  },

  async buscarPorId(id: string): Promise<${Nome}> {
    const response = await api.get<${Nome}>(\`\${ENDPOINT}/\${id}\`);
    return response.data;
  },

  async criar(dados: ${Nome}): Promise<${Nome}> {
    const response = await api.post<${Nome}>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<${Nome}>): Promise<${Nome}> {
    const response = await api.put<${Nome}>(\`\${ENDPOINT}/\${id}\`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(\`\${ENDPOINT}/\${id}\`);
  },
};
`;
}

if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
}

entidades.forEach(({ nome, endpoint }) => {
  const filePath = path.join(servicesDir, `${nome}Service.ts`);

  if (fs.existsSync(filePath)) {
    console.log(`⚠️  ${nome}Service.ts já existe — pulando`);
    return;
  }

  fs.writeFileSync(filePath, serviceTemplate(nome, endpoint));
  console.log(`✅ ${nome}Service.ts criado`);
});

console.log('\n🎉 Todos os services foram gerados com sucesso!');
