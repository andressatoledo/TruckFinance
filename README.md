# 🚛 TruckFinance

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

O **TruckFinance** é um aplicativo de gestão financeira desenvolvido para auxiliar caminhoneiros no controle de **viagens, fretes, despesas e lucros**.

A ideia do projeto surgiu da necessidade real de organizar as finanças de transportes rodoviários, permitindo registrar e acompanhar informações importantes como **rotas, cargas, pedágios, abastecimentos e resultados das viagens**.

O objetivo é oferecer uma forma simples e prática de visualizar se uma viagem realmente gerou lucro, além de manter um histórico organizado das operações.

---

# 📌 Objetivo do Projeto

Caminhoneiros frequentemente precisam controlar diversos fatores para saber se um frete foi realmente lucrativo. O TruckFinance foi criado para centralizar essas informações em um único sistema.

Com o aplicativo é possível:

* Registrar viagens
* Controlar despesas
* Gerenciar veículos e motoristas
* Calcular lucros
* Organizar documentos

Assim, o usuário consegue ter **maior controle financeiro e operacional das viagens**.

---

# 🛠 Tecnologias Utilizadas

O projeto utiliza tecnologias modernas para garantir escalabilidade e facilidade de manutenção.

### Backend

* TypeScript
* Node.js
* Express
* MongoDB
* Mongoose

### Frontend

* React
* React Native

### Ferramentas

* Zod → validação de dados
* Axios → comunicação com API
* GitHub Actions → integração contínua (CI)
* ESLint → padronização de código

---

# 📱 Funcionalidades

O sistema possui diversos módulos de cadastro e controle.

## 🚚 Cadastro de Caminhões

Permite registrar os caminhões utilizados nas viagens.

Informações registradas:

* Nome do caminhão
* Placa
* Ano de fabricação
* Capacidade de carga
* Última manutenção
* Status do veículo

---

## 🚛 Cadastro de Carretas

Permite cadastrar as carretas utilizadas no transporte.

Informações:

* Tipo da carreta
* Quantidade de eixos
* Status
* Observações

---

## 👤 Cadastro de Motoristas

Controle dos motoristas responsáveis pelas viagens.

Informações:

* Nome
* Documento
* Caminhão padrão
* Carreta padrão

---

## 📦 Cadastro de Cargas

Permite registrar os diferentes tipos de cargas transportadas.

Exemplo:

* Grãos
* Contêiner
* Produtos industrializados
* Combustível

---

## 🏢 Cadastro de Empregadoras

Cadastro das empresas que contratam os fretes.

Informações:

* Nome da empresa
* Dados de contato
* Observações

---

## 🛣 Cadastro de Rotas

Permite registrar rotas utilizadas nas viagens.

Informações:

* Cidade de origem
* Cidade de destino
* Distância
* Pedágios vinculados

---

## 🧾 Controle de Pedágios

Cadastro dos pedágios que fazem parte das rotas.

Informações:

* Localização
* Valor por eixo
* Rodovia

---

## ⛽ Registro de Abastecimentos

Controle completo dos abastecimentos do caminhão.

Informações:

* Litros abastecidos
* Valor pago
* Data
* Km do caminhão
* Tipo de pagamento
* Prazo de pagamento
* Observações

---

## 📍 Registro de Viagens

A viagem é o elemento central do sistema.

Cada viagem pode conter:

* Empregadora
* Carga transportada
* Motorista
* Caminhão
* Carreta
* Rota
* Toneladas transportadas
* Valor da tonelada
* Datas de início e fim
* Documentos (CTE e Nota)

---

## 💰 Cálculo de Resultados

O sistema calcula automaticamente:

* Total de pedágios
* Valor do frete
* Custos da viagem
* **Lucro final**

---

# 📂 Estrutura do Projeto (exemplo)

```
truck-finance
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── services
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   └── services
│
└── README.md
```

---

# 🚀 Futuras Melhorias

Algumas funcionalidades planejadas para versões futuras:

* 📊 Dashboard com gráficos financeiros
* 📄 Upload de documentos (CTE, notas fiscais, comprovantes)
* 📱 Melhor experiência mobile
* 📈 Relatórios de lucro por período
* 📍 Histórico completo de viagens
* 🔔 Alertas de manutenção

---

# 👩‍💻 Autora

Projeto desenvolvido por **Andressa Toledo**.
