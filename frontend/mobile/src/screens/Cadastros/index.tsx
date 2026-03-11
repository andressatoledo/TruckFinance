import { CardCadastro } from '../../components/CardCadastros';
import { Form } from '../../components/Form/Form';

export function Cadastros() {
  return (
    <Form title="Cadastros">
      <CardCadastro
        icon="fuel"
        title="Abastecimentos"
        subtitle="Abastecimentos realizados"
        count={10}
         routeName='Abastecimento'
      />
      <CardCadastro
        icon="truck"
        title="Caminhões"
        subtitle="Frota de veículos"
        count={1}
         routeName='Caminhao'
      />
      <CardCadastro
        icon="weight"
        title="Cargas"
        subtitle="Tipos de cargas"
        count={3}
        routeName='Carga'
      />
      <CardCadastro
        icon="dump-truck"
        title="Carretas"
        subtitle="Carretas cadastradas"
        count={1}
         routeName='Carreta'
      />
      <CardCadastro
        icon="office-building"
        title="Empregadoras"
        subtitle="Empresas contratantes"
        count={1}
         routeName='Pedagio'
      />
      <CardCadastro
        icon="wrench"
        title="Manutenções"
        subtitle="Registros de manutenções"
        count={5}
         routeName='Pedagio'
      />
      <CardCadastro
        icon="steering"
        title="Motoristas"
        subtitle="Motoristas registrados"
        count={1}
         routeName='Pedagio'
      />
      <CardCadastro
        icon="boom-gate"
        title="Pedágios"
        subtitle="Pedágios da rota"
        count={6}
         routeName='Pedagio'
      />
      <CardCadastro
        icon="map-marker"
        title="Rotas"
        subtitle="Rotas definidas"
        count={3}
         routeName='Pedagio'
      />
      <CardCadastro
        icon="map-marker-radius"
        title="Rotas com pedágios"
        subtitle="Pedágios na rota"
        count={2}
         routeName='Pedagio'
      />
      <CardCadastro
        icon="map-marker-distance"
        title="Rotas vinculadas"
        subtitle="Rotas definidas com ida e volta"
        count={1}
         routeName='Pedagio'
      />
    </Form>
  );
}
