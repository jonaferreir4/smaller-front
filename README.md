# Smaller - Frontend

## Visão Geral

O **Smaller** é um front-end para um serviço de encurtamento e gerenciamento de URLs. A aplicação foi projetada utilizando **React 19**, **TypeScript** e **Vite**, adotando uma arquitetura baseada em componentes reutilizáveis e responsivos estilizados com **TailwindCSS 4** e **DaisyUI 5**.

A solução contempla suporte completo à execução em containers Docker com build multi-stage e servidor de produção via **NGINX**, configurado para atuar como servidor estático de Single Page Application (SPA) e proxy reverso para as chamadas de API do backend.

---

## Funcionalidades Principais

- **Encurtamento de URLs**: Interface para envio de links de longo comprimento e geração de URLs encurtadas com funcionalidade de cópia rápida para a área de transferência.
- **Dashboard de Insights**: Consulta de métricas detalhadas de URLs encurtadas, incluindo total de cliques registrados, link original e data de criação em formato UTC.
- **Roteamento Dinâmico**: Navegação fluida entre páginas sem recarregamento da aplicação (SPA) através do React Router DOM v7.
- **Tratamento de Erros e Feedback de UI**: Exibição de estados de carregamento (loading), validação de entrada de dados e mensagens claras de falhas de comunicação com a API.

---

## Arquitetura e Tecnologias

### Tecnologias Core

- **React 19**: Biblioteca para construção de interfaces declarativas e baseadas em componentes.
- **TypeScript 5**: Tipagem estática para garantia de contrato de dados, componentes e prevenção de erros em tempo de compilação.
- **Vite 7**: Ferramenta de build e ambiente de desenvolvimento rápido com HMR (Hot Module Replacement).
- **React Router DOM 7**: Gerenciamento de rotas do lado do cliente.
- **Axios 1.11**: Cliente HTTP baseado em Promessas para consumo dos endpoints REST.

### Estilização e UI

- **TailwindCSS 4**: Framework CSS utilitário para construção rápida de layouts responsivos.
- **DaisyUI 5**: Biblioteca de componentes de interface baseada em classes utilitárias do TailwindCSS.

### Infraestrutura e Deploy

- **Docker**: Containerização com estratégia Multi-Stage Build para otimização da imagem final.
- **NGINX 1.27 Alpine**: Servidor web leve configurado para servir a aplicação React compilada e redirecionar requisições `/api` para a aplicação backend.

---

## Estrutura do Projeto

```text
smaller-front/
├── public/                     # Arquivos estáticos públicos
├── src/
│   ├── assets/                 # Recursos visuais (imagens, vetores)
│   ├── components/             # Componentes reutilizáveis da UI
│   │   ├── button-submit.tsx   # Botão de submissão reutilizável com estado desabilitado
│   │   ├── footer.tsx          # Rodapé padronizado da aplicação
│   │   ├── header.tsx          # Barra de navegação superior com links de rota
│   │   ├── layout.tsx          # Wrapper principal definindo a estrutura visual da página
│   │   └── search-input.tsx    # Campo de entrada de texto padronizado
│   ├── pages/                  # Páginas Principais da Aplicação
│   │   ├── dashboard.tsx       # Página de consulta de estatísticas e métricas de URLs
│   │   └── home.tsx            # Página inicial para encurtamento de links
│   ├── services/               # Configurações de serviços externos
│   │   └── axios.ts            # Instância global do Axios com baseURL configurada para /api
│   ├── App.css                 # Estilos específicos da aplicação
│   ├── App.tsx                 # Configuração de rotas da aplicação
│   ├── main.css                # Importação de estilos globais e TailwindCSS
│   ├── main.tsx               # Ponto de entrada da aplicação React
│   └── vite-env.d.ts           # Declarações de tipos de ambiente do Vite
├── Dockerfile                  # Script de containerização multi-stage (Node + NGINX)
├── eslint.config.js            # Configurações de linter (ESLint 9)
├── index.html                  # Documento HTML base da aplicação
├── nginx.conf                  # Configuração do NGINX (SPA fallback + Proxy Reverso)
├── package.json                # Manifesto de dependências e scripts do projeto
├── tsconfig.json               # Configuração raiz do TypeScript
├── tsconfig.app.json           # Configuração de compilação do TypeScript para a aplicação
├── tsconfig.node.json          # Configuração do TypeScript para scripts Node/Vite
└── vite.config.ts              # Configuração do bundling e plugins do Vite
```

---

## Integração com a API (Backend)

As chamadas HTTP são centralizadas na instância do Axios (`src/services/axios.ts`) configurada para utilizar o prefixo `/api`.

### Endpoints Consumidos

1. **Encurtar URL**
   - **Método**: `POST`
   - **Rota**: `/api/shorten`
   - **Corpo da Requisição**:
     ```json
     {
       "url": "https://exemplo.com/link-muito-longo-para-encurtar"
     }
     ```
   - **Resposta de Sucesso**:
     ```json
     {
       "shortUrl": "http://localhost/abc123"
     }
     ```

2. **Obter Insights da URL**
   - **Método**: `GET`
   - **Rota**: `/api/links/{code}`
   - **Resposta de Sucesso**:
     ```json
     {
       "originalUrl": "https://exemplo.com/link-muito-longo-para-encurtar",
       "shortUrl": "http://localhost/abc123",
       "clicks": 42,
       "createdOnUtc": "2025-01-01T00:00:00Z"
     }
     ```

---

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- **Node.js**: Versão 20.x ou superior
- **npm**: Versão 10.x ou superior

### Instalação

1. Clone o repositório para o seu ambiente local:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd smaller-front
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

### Executando em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento local com suporte a substituição de código em tempo real (HMR):

```bash
npm run dev
```

A aplicação estará acessível por padrão no endereço informado pelo Vite (ex: `http://localhost:5173`).

---

## Scripts NPM Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Executa a verificação de tipos com TypeScript (`tsc -b`) e compila o código para produção na pasta `dist`. |
| `npm run preview` | Servidor local para pré-visualização da build de produção. |
| `npm run lint` | Executa a análise estática de código utilizando ESLint. |

---

## Execução via Docker e NGINX

O projeto inclui suporte para execução containerizada em ambientes de staging e produção.

### Build da Imagem Docker

Para construir a imagem Docker localmente:

```bash
docker build -t smaller-front .
```

### Execução do Container

Para executar o container mapeando a porta 80 da máquina hospedeira:

```bash
docker run -d -p 80:80 --name smaller-front-container smaller-front
```

### Detalhes de Infraestrutura Docker & NGINX

1. **Stage 1 (Build)**: Utiliza a imagem `node:20-alpine` para instalar dependências e executar o comando `npm run build`, gerando os artefatos estáticos no diretório `/app/dist`.
2. **Stage 2 (Runtime)**: Utiliza `nginx:1.27-alpine`, descarta os arquivos do Node.js de compilação e copia apenas o resultado da build estática para o diretório de entrega do NGINX (`/usr/share/nginx/html`).
3. **Proxy Reverso (`nginx.conf`)**:
   - Todas as requisições para a aplicação SPA são redirecionadas para `index.html` via `try_files $uri /index.html`.
   - As requisições de API sob o caminho `/api` são encaminhadas via proxy (`proxy_pass`) para o serviço backend interno nomeado `http://leaveit-app:5000/api`.

---

## Qualidade de Código e Padrões

O projeto utiliza **ESLint 9** integrado ao TypeScript e React Hooks para manter o padrão de código e boas práticas:

- Análise estática de regras do React Hooks (`eslint-plugin-react-hooks`).
- Regras de atualização e ciclo de vida do React (`eslint-plugin-react-refresh`).
- Verificação rigorosa de tipos com `@typescript-eslint`.

Para rodar a verificação de linter manualmente:

```bash
npm run lint
```
