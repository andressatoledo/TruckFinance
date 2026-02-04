// import { Text, ScrollView} from 'react-native';
// import { styles } from './styles';

// export function Home() {
//   return (
//     <ScrollView style={styles.container}>
//       <Text>Home Screen</Text>
//     </ScrollView>
//   );
// }


import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://192.168.100.15:3000/api'; // substitua pelo IP da sua máquina

export default function Home() {
  const [rotas, setRotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRotas = async () => {
      try {
        console.log("Tentando buscar rotas em:", `${BASE_URL}/carretas/combo`);
        const res = await axios.get(`${BASE_URL}/carretas/combo`, {
          headers: { 'Cache-Control': 'no-cache' } // evita cache antigo
        });
        console.log("Rotas recebidas:", res.data);
        setRotas(res.data);
      } catch (err: any) {
        // Mostra status e dados do erro
        console.error("Erro na requisição:", err.response?.status, err.response?.data || err.message);
        setError(`Erro: ${err.response?.status || 'Desconhecido'} - ${err.response?.data || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRotas();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (error) return <View><Text>{error}</Text></View>;


  return (
    <View style={{ padding: 50 }}>
      {rotas.length > 0 ? (
        rotas.map((r, i) => (
          <Text key={i}>{r.nome || r.descricao || JSON.stringify(r)}</Text>
        ))
      ) : (
        <Text>Nenhuma rota encontrada</Text>
      )}
    </View>
  );
}
