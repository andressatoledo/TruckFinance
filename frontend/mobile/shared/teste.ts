import axios from 'axios';

async function testarRotas() {
  try {
    const res = await axios.get("http://192.168.100.6:3000/api/rotas-vinculadas/combo");
    console.log(res.data);
  } catch (err: any) {
    console.error(err.response?.status, err.response?.data);
  }
}

// Chama a função
testarRotas();
