# NLW IA: Trilha Mastery

Projeto criado durante a [**NLW IA**](https://github.com/rocketseat-education/nlw-ai-mastery) da [@rocketseat](https://github.com/rocketseat).

## 🎥 Preview

https://github.com/ricardospalves/rocketseat-nlw-ia-mastery/assets/7684963/edf52cea-2999-45a0-94f8-ddd7fa3e7671

## 💻 Sobre o projeto

Aplicação que possibilita realizar upload de vídeos e por meio de **Inteligência Artificial** criar automaticamente títulos chamativos e descrições com um boa indexação.

O fluxo da aplicação segue assim, o usuário envia um vídeo para a interface (front-end), com o vídeo carregado o front-end converte o vídeo em áudio através do _ffmpeg_ e então o envia para o back-end. O back-end envia o
o áudio para a _OpenAI_, que irá criar uma transcrição do áudio através da inteligência artificial e irá devolver essa transcrição para o front-end.

Com a transcrição “em mãos”, agora o usuário pode pedir para a inteligência artificial criar uma descrição ou sugerir títulos chamativos para o vídeo, baseado na transcrição. O usuário pode ainda escolher a “temperatura” para gerar o conteúdo. A temperatura informa para a inteligência artificial o quão criativa ela deve ser, quanto menor a temperatura, menos criativa ela será e menos chances de erros também, logo, quanto maior a temperatura, mais criativa ela será e porém com mais chances de erro.

## ✨ Tecnologias

### Back-end

- OpenAI
- Prisma
- Node.js (com Fastify e TypeScript)

### Front-end

- React.js com TypeScript
- ffmpeg (WebAssembly)
- shadcn/ui
- vite

## 🔨 Como instalar

Antes de tudo, pra testar essa aplicação localmente é preciso ter uma conta na [_OpenAI_](https://openai.com/) e ter créditos disponíveis. A _OpenAI_ disponibiliza créditos para novas contas por um tempo limitado ou até que eles sejam esgotados. Caso você não tenha créditos, é preciso comprar ou então criar uma nova conta.

Uma vez que tenha créditos na _OpenAI_, você pode seguir os passos abaixo.

Clonar o repositório para a sua máquina:

```bash
git clone git@github.com:ricardospalves/rocketseat-nlw-ia-mastery.git
cd rocketseat-nlw-ia-mastery
```

Instalar as dependências:

```bash
cd web && npm install
cd ../api && npm install
```

Dentro da pasta **api/** é preciso criar um arquivo com o nome **.env**. Depois de criado é preciso adicionar o seguinte conteúdo:

```
DATABASE_URL="file:./dev.db"
OPENAI_KEY=<sua_api_key_da_openai>
```

No exemplo de cima, você deve substituir a `<sua_api_key_da_openai>` pela sua _Api Key_ cadastrada na _OpenAI_. Você pode conferir a sua key na página [Api keys](https://platform.openai.com/account/api-keys). Caso não tenha nenhuma chave cadastrada ou não consegue ver, basta criar uma nova clicando no botão _Create new secret key_ e copiar a _key_ gerada.

Rodar o prisma:

```bash
npx prisma migrate dev --name db
npx prisma db seed
```

Agora basta rodar os projetos, lembrando que ambos os projetos precisam estar rodando, então é preciso rodar os comandos seguintes em abas diferentes do seu terminal.

Rodar a api:

```
cd api
npm run dev
```

Rodar a interface:

```
cd web
npm run dev
```

Finalmente, agora é só acessar a URL http://localhost:5173 no seu navegador e testar a aplicação.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/ricardospalves/rocketseat-nlw-ia-mastery/blob/main/LICENSE) para mais detalhes.

## 🙏 Créditos

- [Vídeo do NatGeo Brasil usando no preview](https://www.youtube.com/watch?v=rNY5Wija6m4&ab_channel=NationalGeographicBrasil)
