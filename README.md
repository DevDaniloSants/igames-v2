# 🎮 IGames
IGames é um portal de notícias focado no universo dos games. O projeto foi reestruturado com tecnologias modernas para oferecer uma experiência fluida e atualizada sobre o mundo dos jogos.

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Next.js 15**: Framework para renderização do lado do servidor e roteamento otimizado.
- **TypeScript**: Tipagem estática para garantir robustez e manutenção do código.
- **Tailwind CSS**: Framework CSS de utilitários para design responsivo e customizado.
- **ShadCN**: Biblioteca de componentes UI para React, utilizada para criar interfaces modulares e estéticas, otimizadas para uma experiência de usuário suave e eficiente.
- **AWS S3**: — Armazenamento de arquivos de forma segura e escalável.
- **Auth.js**: — Gerenciamento de autenticação, incluindo login com Google.

## 🛠️ **Husky, lint-staged, Prettier e ESLint**
   &nbsp; Para manter a qualidade do código e a consistência do estilo, foram implementadas ferramentas como Husky, lint-staged, Prettier e ESLint, garantindo que o código permaneça limpo, organizado e aderente às melhores práticas do mercado.

## 📌 Funcionalidades

* 📰 Visualização de notícias recentes sobre jogos.
* 🔐 Autenticação com Google para login rápido e seguro.
* 🔒 Middleware para rotas administrativas, garantindo acesso restrito a usuários autorizados.
* 📂 Categorias organizadas para fácil navegação.
* 🔎 Busca por jogos e temas específicos.
* 🌐 Interface moderna e responsiva.

## 📂 Estrutura do Projeto

A estrutura do projeto foi planejada para ser modular, escalável e de fácil manutenção.

### 🏷️ **Páginas**
- **`(private)/` e `(public)/`** → Contêm todas as páginas do projeto, separadas entre privadas (restritas a usuários autenticados) e públicas.
- **`_components/` dentro de cada uma das pasta acima → Componentes exclusivos para páginas privadas ou públicas.
- **`_components/` global** → Componentes reutilizados tanto em páginas públicas quanto privadas.

### ⚙️ **Ações e Camada de Acesso a Dados**
- **`actions/`** → Gerencia **mutações** no banco de dados, como `POST`, `PUT` e `DELETE`.
- **`data-access/`** → Responsável apenas por **requisições GET**, garantindo uma separação clara de responsabilidades.

## 🖼️ Demonstração

<p align="center">
  <img src="https://i.ibb.co/gFDLZ0xB/i-Phone-14-Pro-476x852.png" width="200"/>
  <img src="https://i.ibb.co/ynyBhyLc/2.png" width="200"/>
  <img src="https://i.ibb.co/gYbqjrC/1.png" width="200"/>
</p>


:child: Author
<table> <tr> <td align="center"> <img src="https://avatars.githubusercontent.com/u/152008168?s=400&u=710379e70ac9c4490d3044ffd12a47092b993f76&v=4" width="100px;" alt="Foto de Danilo Santos no GitHub"/><br> <sub> <b>Danilo Santos</b> </sub> </a> </td> </tr> </table>
