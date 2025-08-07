# 📦 DeveloperStore App (Frontend)

Aplicação Angular para consumir e gerenciar o fluxo da API [DeveloperStore](https://github.com/seu-usuario/DeveloperStore), construída com foco em boas práticas de desenvolvimento, responsividade e integração com APIs RESTful.

---

## 🚀 Funcionalidades

- ✅ Visualização de vendas cadastradas  
- ➕ Criação de nova venda  
- ✏️ Edição e cancelamento de vendas existentes  
- 📉 Cálculo automático de descontos por item  
- 🔐 Autenticação e controle de acesso (JWT)  
- 🌐 Integração com a API via HTTPClient  
- 🧪 Validações de formulário com mensagens amigáveis  
- 📱 Interface responsiva com Bootstrap 5  

---

## 🛠️ Tecnologias e Bibliotecas

- [Angular 20](https://angular.io/)
- [Bootstrap 5](https://getbootstrap.com/) + [Bootstrap Icons](https://icons.getbootstrap.com/)
- [RxJS](https://rxjs.dev/)
- [Express](https://expressjs.com/) (para SSR)
- TypeScript

---

## 📋 Pré-requisitos

- Node.js `v20+`
- Angular CLI
- API DeveloperStore rodando localmente: `https://localhost:7210`
- PostgreSQL configurado para a API
- Git

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/developerstore-app.git
cd developerstore-app

2. Instale as dependências:

npm install

3. Execute o servidor de desenvolvimento:

npm start

Abra no navegador: http://localhost:4200


 ✅ Scripts disponíveis 

  Comando	Descrição
  npm start	Inicia o servidor Angular
  npm run build	Compila o projeto
  npm test	Executa testes unitários
  npm run serve:ssr:DeveloperstoreAPP	Roda com SSR via Express

🔐 Autenticação e Segurança

  A aplicação consome um token JWT emitido pela API.
  Após login, o token é armazenado e usado em requisições autenticadas.
  Rotas protegidas bloqueiam usuários não autenticados.

🤝 Contribuindo

  Pull requests são bem-vindos! Para mudanças significativas, abra uma issue primeiro para discutirmos a proposta.
