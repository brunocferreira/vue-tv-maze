# Vue TV Maze

**Demo:** [https://brunocferreira.github.io/vue-tv-maze](https://brunocferreira.github.io/vue-tv-maze)

## Descrição do Projeto

Este projeto exibe séries de TV usando a API pública [TVMaze](https://api.tvmaze.com/) e permite que usuários adicionem comentários em cada série. Os comentários são armazenados no Firebase Firestore.

Principais telas:

1. **Lista de Séries**

   - Carrega via GET em `https://api.tvmaze.com/shows`
   - Exibe título e imagem de cada série
   - Clique para navegar ao detalhe de uma série

2. **Detalhe da Série**
   - Recupera informações completas da série (sinopse, número de temporadas/episódios, etc.)
   - Sessão de comentários
     - Exibe comentários existentes (Firestore)
     - Permite envio de novo comentário (exige autenticação)

## Tecnologias

- **Front-end:** Vue.js 3 (Vue CLI)
- **Integração:** Firebase
  - Firestore para armazenamento de comentários
  - Authentication (Email/Password)
- **Deploy:** GitHub Pages

## Estrutura de Pastas

```

vue-tv-maze/
├── public/               # Arquivos estáticos
├── src/
│   ├── assets/           # Imagens, estilos
│   ├── components/       # Componentes reutilizáveis
│   ├── views/            # Views (Listagem e Detalhe)
│   ├── router.js         # Rotas do Vue Router
│   └── firebase.js       # Inicialização Firebase (Auth + Firestore)
├── .env                  # Variáveis de ambiente (não comitar)
├── .gitignore
├── package.json
├── README.md
└── LICENSE.md

```

## Requisitos

- Node.js ≥ 14
- Vue CLI
- Conta Firebase com Firestore e Authentication habilitados

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```dotenv
VUE_APP_API_KEY=sua-chave
VUE_APP_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VUE_APP_PROJECT_ID=seu-id
VUE_APP_STORAGE_BUCKET=seu-storage
VUE_APP_MESSAGING_SENDER_ID=seu-id
VUE_APP_APP_ID=seu-id
VUE_APP_MEASUREMENT_ID=seu-id
```

> **Importante:** nunca comite seu `.env.local`.
> Use GitHub Actions + Secrets para deploy (veja seção de Deploy).

## Instalação e Execução Local

```bash
# Clone o repositório
git clone https://github.com/brunocferreira/vue-tv-maze.git
cd vue-tv-maze

# Instale dependências
npm ci

# Rode em modo desenvolvimento
npm run serve
# Acesse http://localhost:8080
```

## Contato

Bruno da Cunha Ferreira
[GitHub](https://github.com/brunocferreira) | [LinkedIn](https://www.linkedin.com/in/brunocferreira) | [Site](https://brunosites.app.br/)
