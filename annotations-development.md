# Notas de desenvolvimento do Expert Votes

### Importante

Ao identificar a marcacao `< Demais codigos já gravados no arquivo >` dentro de um trecho de codigo significa que a primeira linha acima ou abaixo da marcacao e uma linha de codigo ja existente para referenciar onde os novos codigos devem ser escritos dentro do arquivo.

### Iniciando o projeto

O comando `npm init -y` faz duas coisas:

- Cria um arquivo `package.json` no diretório atual.
- Instala as dependências caso especifícadas no arquivo `package.json`.

`npm init -y`

## TypeScript

### Instalando as dependências do Typescript

`npm install typescript @type/node -D`

Instala o Typescript e o pacote `@types/node` que fornece definições de tipo para o Node.js. Ambos estão sendo instalado como dependências de desenvolvimento `-D`.

### Iniciando o Typescript

O comando `npm tsc --init` é usado para criar um arquivo `tsconfig.json` na pasta atual. O arquivo `tsconfig.json` é um arquivo de configuração que define como o compilador TypeScript (`tsc`) deve compilar seus arquivos TypeScript.Iniciando o Typescript

`npm tsc --init`

### Alterando a versão do NodeJS no tsconfig

Diferentes ambientes NodeJS podem ter diferentes versões do NodeJS instaladas. Ao especificar a versão do NodeJS no tsconfig, você pode garantir que seu código seja compatível com todos os ambientes em que ele precisa ser executado.

Consultar código necessário para a versão do Node em [Node Target Mapping - Microsoft](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping).

### Instalação do tsx

TSX é um novo e aprimorado ts-node que usa o esbuild para transpilar arquivos TypeScript para JavaScript muito rapidamente. É executado no Node.js e pode ser usado para executar arquivos TypeScript diretamente, sem a necessidade de compilá-los primeiro.Biblioteca responsável por fazer a conversão do Typescript para Javascript de forma automatizada para que o NodeJS consiga entender.

`npm install tsx -D`

### Script de inicialização em modo de desenvolvimento

`./package.json`

```
"scripts": {
  "dev": "tsx watch src/http/server.ts"
},
```

### Instalação do Fastify

O Fastify é um framework web para Node.js que se concentra em fornecer a melhor experiência de desenvolvimento com o mínimo de "dor de cabeça" e uma poderosa arquitetura de plugins.

O Fastify é uma ótima opção para desenvolvedores que desejam criar APIs e servidores web rápidos, seguros e fáceis de usar.

`npm install fastify`

## Docker

### Comandos Docker

O comando `docker -v` é usado para imprimir informações sobre a versão do Docker que você está usando.

O comando `docker ps` lista todos os containers Docker em execução no seu sistema.

O comando `docker compose up` é usado para iniciar os containers definidos em um arquivo `docker-compose.yml`.

### Criação do Docker Compose

Crie uma arquivo de nome `docker-compose.yml` na raiz do projeto e cole o bloco de código abaixo em seu arquivo. Se estiver executando esse repositório pule esse passo.

```
version: '3.7'services:
postgres:
image: bitnami/postgresql:latest
ports:'5432:5432'
environment:POSTGRES_USER=dockerPOSTGRES_PASSWORD=dockerPOSTGRES_DB=polls
volumes:polls_pg_data:/bitnami/postgresqlredis:
image: bitnami/redis:latest
environment:ALLOW_EMPTY_PASSWORD=yes
ports:'6379:6379'
volumes:'polls_redis_data:/bitnami/redis/data'volumes:
polls_pg_data:
polls_redis_data:
```

### Rodando o Docker Compose

Se não possuir o [Docker](https://docs.docker.com/desktop/install/windows-install/) instalado em sua maquina realize sua instalação antes de prosseguir.

Para subir o docker rode no terminal `docker compose up -d`.

### Verificando logs do Docker

O comando `docker logs CONTAINER_ID` exibe os logs de um container Docker. O `CONTAINER_ID` é o identificador único do container que você deseja exibir os logs.

## Prisma

O Prisma ORM é uma ferramenta de mapeamento objeto-relacional (ORM) moderna e poderosa que facilita a interação entre o seu código TypeScript ou JavaScript e bancos de dados relacionais como PostgreSQL, MySQL e SQL Server.

Ele oferece uma variedade de recursos que o tornam uma ótima escolha para desenvolvedores que desejam criar aplicações web e móveis de alto desempenho com escalabilidade e confiabilidade.

### Instalando o Prisma

O comando `npm install -D prisma` instala o Prisma ORM como uma dependência de desenvolvimento do seu projeto Node.js. Isso significa que o Prisma não será incluído na versão final do seu aplicativo, mas será necessário para desenvolvê-lo.

### Iniciando o Prisma e criando um arquivo .env

O comando `npx prisma init` serve para inicializar um novo projeto Prisma para conectar seu aplicativo Node.js a um banco de dados relacional. Ele cria arquivos com configuração e definição de esquema para facilitar a interação com os dados.npx prisma init.

## Zod

Zod é uma biblioteca de validação de dados moderna e poderosa para Node.js que permite definir e validar facilmente a estrutura e o conteúdo de seus dados. Ela é especialmente útil para garantir a qualidade e a confiabilidade dos dados em aplicações TypeScript, mas também pode ser usada com JavaScript puro.

### Instalando a lib Zod

O comando `npm install zod` irá instalar a biblioteca Zod no seu projeto Node.js. Zod é uma biblioteca de validação de dados para TypeScript que permite definir schemas para a estrutura de seus dados e garantir que os dados que você recebe estejam corretos e no formato esperado.npm install zod

# Desenvolvendo a aplicação fluxo

### 1. Criando o modelo de dados poll

`./prisma/schema.prisma`

```
model Poll {
  id         String @id @default(uuid())
  title      String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now())
}
```

Este código define um modelo de dados chamado "Poll" com os seguintes campos:

- `id`: Um identificador único para cada enquete, representado como uma string. Este campo é marcado com `@id` para indicar que é a chave primária da tabela e `@default(uuid())` para definir um valor padrão como um UUID gerado automaticamente.
- `title`: O título da enquete, representado como uma string.
- `createdAt`: A data e hora em que a enquete foi criada, representado como um objeto DateTime. Este campo é marcado com `@default(now())` para definir um valor padrão como a data e hora atuais quando uma nova enquete é criada.
- `updatedAt`: A data e hora da última atualização da enquete, representado também como um objeto DateTime. Este campo também é marcado com `@default(now())` para definir um valor padrão como a data e hora atuais quando uma enquete é criada ou atualizada.

### 2. Atualizando a migrate

O comando `npx prisma studio` executa o **Prisma Studio**, uma interface visual poderosa para explorar e manipular dados em seus projetos Prisma. Útil para ter uma visualização do seu banco de dados.

O comando `npx prisma migrate dev` é usado no Prisma ORM para gerenciar alterações de schema em seu banco de dados de desenvolvimento. Ele executa algumas ações principais:

**1. Migrações Aplicadas:**

- Verifica quais migrações já foram aplicadas ao seu banco de dados de desenvolvimento.
- Se houver novas migrações disponíveis (não aplicadas), ele as aplicará na ordem correta.

**2. Validação do Schema:**

- Compara o schema definido nos seus arquivos Prisma com o estado atual do banco de dados de desenvolvimento.
- Se houver discrepancias (schema drift), ele irá avisá-lo ou solicitar ações dependendo da configuração.

**3. Geração de Código Cliente:**

- Gera automaticamente o código TypeScript ou JavaScript que representa seu modelo de dados baseado no schema definido.
- Esse código facilita a interação com o banco de dados através de um API simplificada.

**Observações importantes:**

- Este comando **deve ser usado apenas em um ambiente de desenvolvimento** e **nunca** em produção.
- Ele pode alterar e modificar dados no seu banco de desenvolvimento, portanto, use-o com cautela.
- Se você estiver trabalhando em equipe, certifique-se de coordenar as migrações para evitar conflitos.

### 4. Conectando a aplicação ao Prisma

`./src/lib/prisma.ts`

```
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()
```

`export const prisma`: Esta linha exporta uma constante chamada `prisma`, que é a instância do cliente Prisma que será utilizada para interagir com o banco de dados. Exportar a constante permite que ela seja importada e utilizada em outros arquivos do seu projeto.

`new PrismaClient()`: Aqui, você está instanciando um novo objeto `PrismaClient`, que é fornecido pelo Prisma e serve como o cliente para interagir com o banco de dados. Este cliente é utilizado para realizar operações de leitura e escrita no banco de dados, como consultas (queries), inserções (inserts), atualizações (updates) e exclusões (deletes).

### 5. Criação da rota poll

`./src/http/routes/createPoll.ts`

```
export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string()
    })

    const { title } = createPollBody.parse(request.body)
    const poll = await prisma.poll.create({
      data: {
        title
      }
    })

    return reply.status(201).send({pollId: poll.id})
  })
}
```

Este trecho de código define uma função `createPoll` que cria uma nova rota criar enquete quando recebe uma solicitação POST em `/polls`. Ele valida o corpo da solicitação para garantir que contenha um título, cria uma nova entrada de enquete no banco de dados usando Prisma e retorna o ID da enquete recém-criada como resposta.

### 6. Registrando a rota poll no server

`./src/server.ts`

```
app.register(createPoll)
```

Registrando a rota poll no server.

### 7. Criando o modelo de dados PollOption

`./prisma/schema.prisma`

```
model PollOption {
  id     String @id @default(uuid())
  title  String
  poll   Poll   @relation(fields: [pollId], references: [id])
  pollId String
}
```

Para criar a relação basta adicionar no modelo da tabela N (1<>N) um atributo com o mesmo nome da tabela 1(1<>N), ou seja, `poll Poll`. Ao salvar o arquivo, o formatador do Prisma cria a relação automaticamente.

### 8. Atualizando a migrate

`npx prisma migrate dev`

Quando você executa esse comando durante o desenvolvimento de um projeto, o Prisma compara o estado do seu esquema Prisma (definido no arquivo `schema.prisma`) com o estado atual do seu banco de dados. Se houver diferenças entre eles, o Prisma gera um script de migração.

### 9. Atualizando o create-poll.ts

```
const poll = await prisma.poll.create({
  data: {
    title,
    options: {
      createMany: {
        data: options.map((option) => {
          return { title: option }
        }),
      },
    },
  }
})
```

Este trecho de código cria uma nova entrada de enquete usando o Prisma. Ele também cria várias opções associadas a essa enquete, onde as opções são fornecidas como um array (`options`) e são mapeadas para um formato adequado antes de serem adicionadas ao banco de dados.

### 10. Exibindo os logs do Prisma

`./lib/prisma.ts`

```
export const prisma = new PrismaClient({
  log: ['query']
})
```

`{ log: ['query'] }`: Esta é uma configuração opcional passada para o construtor do `PrismaClient`. Neste caso, você está especificando que deseja que o cliente Prisma emita logs apenas para consultas (queries). Isso significa que o cliente irá registrar informações sobre todas as consultas realizadas ao banco de dados, mas não para outras operações, como inserções ou atualizações.Alterando o `prisma.ts` para que o Prisma para que sempre que uma query for realizada no banco de dados, ele exiba as queries, seus resultados e estados resultantes da query.

### 11. Criando a rota de getPoll

`./src/http/routes/get-poll.ts`

```
import { FastifyInstance } from "fastify"
import z, { string } from "zod"
import { prisma } from "../../lib/prisma"

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
    const { pollId } = getPollParams.parse(request.params)const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })
    return reply.send({ poll })
  })
}
```

Este trecho de código define uma função chamada `getPoll`, que criar uma rota GET para recuperar detalhes de uma enquete específica. Ele valida os parâmetros da solicitação usando o Zod, acessa o banco de dados usando o Prisma para recuperar os detalhes da enquete com base no ID fornecido e, em seguida, envia esses detalhes como resposta da solicitação.

### 12. Criando a rota vote on poll

`./src/http/routes/vote-on-poll.ts`

```
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { prisma } from '../../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);let { sessionId } = request.cookies;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          }
        }
      })

      if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          }
        })
      } else if (userPreviousVoteOnPoll) {
        return reply.status(400).send({ message: 'You have already voted on this poll' })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 _ 60 _ 24 \* 30, // 30 days
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      }
    })
    return reply.status(201).send();
  });
}
```

Este código define uma função chamada `voteOnPoll`, que cria uma nova rota responsável por lidar com a votação em uma enquete.

1. A função é exportada e espera receber uma instância do Fastify como argumento (`app`).
2. Dentro da função, é definida uma rota POST em `/polls/:pollId/votes` para lidar com as solicitações de votação nas enquetes.
3. São definidos esquemas de validação utilizando a biblioteca Zod para validar os parâmetros da solicitação (`pollOptionId`) e os parâmetros da URL (`pollId`).
4. O código verifica se existe um cookie de sessão (`sessionId`) na solicitação. Se existir, ele verifica se o usuário já votou nessa enquete antes e, em caso afirmativo, atualiza o voto. Caso contrário, cria um novo voto.
5. Se não houver um cookie de sessão na solicitação, é gerado um novo `sessionId` usando a função `randomUUID` e definido como um cookie na resposta.
6. Por fim, o voto é registrado no banco de dados usando o Prisma e uma resposta de status 201 é enviada para indicar que a operação foi bem-sucedida.

### 13. Criando o modelo de dados Vote

`./prisma/schema.prisma`

```
model Vote {
  id Int @id @default(autoincrement())
  sessionId String
  pollOptionId String
  pollId StringpollOption PollOption @relation(fields: [pollOptionId], references: [id])
  poll Poll @relation(fields: [pollId], references: [id])
  createdAt DateTime @default(now())@@unique([sessionId, pollId])
}
```

Este código define um modelo de dados chamado "Vote" para representar os votos dos usuários em uma enquete.

- `id`: Um campo inteiro que serve como identificador único para cada voto. É marcado com `@id` para indicar que é a chave primária da tabela e `@default(autoincrement())` para definir um valor padrão que é incrementado automaticamente.
- `sessionId`: Uma string que identifica a sessão do usuário que fez o voto.
- `pollOptionId`: Uma string que representa o identificador da opção de voto selecionada pelo usuário.
- `pollId`: Uma string que representa o identificador da enquete à qual o voto está associado.
- `pollOption`: Um relacionamento que indica a opção de voto selecionada. Está relacionado ao modelo `PollOption` através do campo `pollOptionId`.
- `poll`: Um relacionamento que indica a enquete à qual o voto está associado. Está relacionado ao modelo `Poll` através do campo `pollId`.
- `createdAt`: Um campo de data e hora que registra o momento em que o voto foi registrado. É marcado com `@default(now())` para definir um valor padrão como a data e hora atuais.
- `@@unique([sessionId, pollId])`: Esta diretiva marca a combinação de `sessionId` e `pollId` como única, garantindo que um usuário só possa votar uma vez em uma determinada enquete durante uma sessão.

### 14. Atualizando a migrate

`npx prisma migrate dev`

Quando você executa esse comando durante o desenvolvimento de um projeto, o Prisma compara o estado do seu esquema Prisma (definido no arquivo `schema.prisma`) com o estado atual do seu banco de dados. Se houver diferenças entre eles, o Prisma gera um script de migração.

### 14.1 Note que todas as rotas seguem determinada estrutura:

- Definição da rota
- Definição da estrutura da requisição com o zod
- Parse do request para a estrutura predifinida para a requisição
- Definição das regras e tratativas dos dados recebidos para a gravação
- Gravação na tabela
- Reply retornando o status da requisição juntamente a possiveis dados se aplicavel.

### 15. Adicionando uma nova dependencia

`npm i ioredis`

O ioredis é uma biblioteca Node.js que fornece uma interface para se comunicar com o Redis, que é um armazenamento de estrutura de dados em memória de código aberto e de alta performance.

### 16. Configurando o Redis

`./src/lib/redis.ts`

```
import { Redis } from 'ioredis';

export const redis = new Redis()
```

`import { Redis } from 'ioredis';`: Isso importa a classe `Redis` do módulo `ioredis`. A classe `Redis` é responsável por representar uma conexão com o servidor Redis.

`export const redis = new Redis()`: Aqui, uma nova instância do cliente Redis é criada usando a classe `Redis`. Esta instância representa uma conexão com o servidor Redis e permite que o código realize operações de leitura e gravação de dados no Redis.

### 17. Implementando o redis no vote on poll

`./src/http/routes/vote-on-poll.ts`

```
< Demais codigos já gravados no arquivo >

    await redis.incrby(pollId, 1, pollOptionId)
    return reply.status(201).send();
  });
}
```

Este trecho de código incrementa um valor armazenado no Redis associado à chave `pollId` em 1, usando o valor `pollOptionId` como identificador adicional. Em seguida, retorna uma resposta de status 201 indicando que a operação foi bem-sucedida.Explicação: Incrementando em 1 o ranking da opção pollOptionId dentro da enquente pollId. O mesmo é feito para quando o usuario mudar seu voto.

### 18. Tratativas para usuarios que ja votaram

```
< Demais codigos já gravados no arquivo >

  if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
    await prisma.vote.delete({
      where: {
        id: userPreviousVoteOnPoll.id,
      }
    })

    await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId)
  } else if (userPreviousVoteOnPoll) {
     return reply.status(400).send({ message: 'You have already voted on this poll' })
  }

< Demais codigos já gravados no arquivo >
```

Este trecho de código verifica se o usuário já votou na enquete anteriormente e se o voto atual é diferente do voto anterior. Se isso for verdadeiro, o voto anterior é excluído do banco de dados e o valor correspondente no Redis é decrementado. Se o usuário já votou na enquete anteriormente e tenta votar novamente na mesma opção, uma resposta de status 400 é enviada indicando que o usuário já votou.

### 19. Implementação tratativa na rota getPoll

`./src/http/routes/get-poll.ts`

```
< Demais codigos já gravados no arquivo >

    if(!poll) {
      return reply.status(400).send({ message: 'Poll not found.'})
    }
    return reply.send({ poll })
  })
}
```

Este trecho de código verifica se uma enquete específica foi encontrada. Se a enquete não for encontrada (ou seja, `poll` é avaliado como falso), uma resposta com o status 400 é enviada, indicando que a enquete não foi encontrada. Caso contrário, a enquete encontrada é enviada como resposta.

### 20. Retornando o ranking da enquete na rota getPoll

`./src/http/routes/get-poll.ts`

```
< Demais codigos já gravados no arquivo >
  const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')return reply.send({ poll })
  })
}
```

Explicação: retorna o ranking da enquete (pollId) começando de (0) até o maior valor(-1) com a pontuação de cada uma das opções ('WITHSCORES')

### 21. Processando os resultados

`./src/http/routes/get-polls.ts`

```
< Demais codigos já gravados no arquivo >

  const votes = result.reduce((obj, line, index) => {
    if(index % 2 === 0) {
      const score = result[index+1]
      Object.assign(obj, { [line]: Number(score) })
        return obj
      }
    }, {} as Recordstring,)

    return reply.send({ poll, votes })
  })
}
```

Este trecho de código processa o resultado obtido da operação de leitura no Redis, que retorna os elementos de uma lista ordenada (conjunto ordenado) associada à chave `pollId`, juntamente com seus escores. Os elementos e seus escores são organizados em um objeto `votes`, onde as chaves são os elementos da lista e os valores são os escores correspondentes convertidos para números. Em seguida, tanto a enquete (`poll`) quanto os votos são enviados como resposta HTTP.

### 22. Refatorando o `reply` na rota getPolls

`.src/http/routes/get-polls.ts`

```
< Demais codigos já gravados no arquivo >

      return reply.send({
       poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map(option => {
          return {
            id: option.id,
            title: option.title,
            score: (option.id in votes) ? votes[option.id] : 0
          }
        })
      }
    })
  })
}
```

Este trecho de código cria um objeto de resposta que contém detalhes da enquete (`poll`) e suas opções. Ele mapeia cada opção da enquete para um objeto que contém seu ID, título e pontuação. A pontuação de cada opção é determinada verificando se o ID da opção existe nos votos recuperados do Redis. Se existir, a pontuação correspondente é atribuída; caso contrário, a pontuação é definida como 0. Esses detalhes da enquete são enviados como resposta HTTP.

### 23. Adicionando nova dependencia

`npm i @fastify/websocket`

A biblioteca Fastify Websocket é uma extensão do Fastify que facilita a integração de funcionalidades de comunicação em tempo real baseadas em WebSockets em aplicativos web construídos com o Fastify. O WebSockets é um protocolo de comunicação bidirecional que permite que os clientes e servidores estabeleçam uma conexão persistente e troquem dados em tempo real de forma eficiente.

### 24. Criando rota results e o websocket

`./src/ws/poll-results.ts`

```
import { FastifyInstance } from "fastify";

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    connection.socket.on('message', (message: string) => {
      connection.socket.send('you sent: ' + message)
    })
  })
}
```

Este código define uma rota no Fastify para lidar com conexões WebSocket. Quando uma conexão é estabelecida, o servidor espera receber mensagens do cliente e responde com uma mensagem contendo o texto "you sent: " seguido da mensagem recebida do cliente.

### 25. Registrando o websocket e a rota results no server.ts

`./src/http/server.ts`

```
app.register(websocket)
app.register(pollResults)
```

### 26. Criando o voting-pub-sub

`./src/utils/voting-pub-sub.ts`

```
type Message = { pollOptionId: string, votes: number }
type Subscriber = (message: Message) => void;

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {};

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    this.channels[pollId].push(subscriber);
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message);
    }
  }
}

export const voting = new VotingPubSub();
```

Este código implementa uma classe `VotingPubSub` que funciona como um sistema de publicação/subscrição para votações. Ele permite que os clientes se inscrevam (subscribe) para receber atualizações sobre votações específicas e permite a publicação (publish) de mensagens relacionadas a essas votações para os clientes inscritos. O objeto `voting` é uma instância desta classe, pronta para ser usada para gerenciar a comunicação de votações em um aplicativo.

### 27. Criando o Publish a partir da rota vote-on-poll.

`./src/http/routes/vote-on-poll.ts`

```
< Demais codigos já gravados no arquivo >

  voting.publish(pollId, {
    pollOptionId,
      votes: Number(votes)
    })
    return reply.status(201).send();
  });
}
```

Esse trecho de código publica os resultados de uma votação para um determinado ID de votação (`pollId`). Em seguida, retorna uma resposta HTTP com o status 201 (Created) para indicar que a operação foi bem-sucedida.

### 28. Criando os Subs na rota poll-results

`./src/http/ws/poll-results.ts`

```
export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollParams.parse(request.params)

    voting.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message))
    })
  })
}
```

Este código configura uma rota WebSocket para transmitir em tempo real os resultados de uma votação específica para os clientes conectados. Ele valida o parâmetro `pollId` da URL, inscreve o cliente atual para receber atualizações sobre os resultados dessa votação e envia as atualizações para o cliente conectado.

### 29. Refatorando o vote-on-poll

Este trecho de código verifica se o usuário já votou anteriormente em uma enquete e se o voto atual é diferente do voto anterior. Se sim, o voto anterior é removido e os votos são atualizados no Redis. Em seguida, os novos resultados da votação são publicados. Se o usuário já votou anteriormente na mesma opção de votação, uma mensagem de erro é retornada.

`./src/http/routes/vote-on-polls.ts`

```
< Demais codigos já gravados no arquivo >

  if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
  await prisma.vote.delete({
    where: {
      id: userPreviousVoteOnPoll.id,
    }
  })

  const votes = await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId)

  voting.publish(pollId, {
    pollOptionId: userPreviousVoteOnPoll.pollOptionId,
    votes: Number(votes)
  })} else if (userPreviousVoteOnPoll) {
    return reply.status(400).send({ message: 'You have already voted on this poll' })
  }

< Demais codigos já gravados no arquivo >
```

## Agradecimentos

Esse projeto foi desenvolvido durante o evento NLW Expert na trilha de NodeJS, ministrado por [Diego Fernandes](https://www.linkedin.com/in/diego-schell-fernandes/) e promovido pela [Rocketseat](https://app.rocketseat.com.br/). Esse material foi escrito a partir de minhas anotações feitas durante o desenvolvimento do projeto.

Gostaria de informar que alguns trechos foram reescritos ou revisados utilizando as IA's [ChatGPT da OpenAI](https://openai.com/chatgpt) e [Gemini do Google](https://gemini.google.com/app), pois alguns pontos não me senti confiante o suficiente para comentar e em outros minha explicação não estava suficientemente clara.

Peço que reconsidere alguns acentos e c cedilha, comecei recentemente a utilizar um teclado padrão ansi e ainda estou me adaptando aos atalhos para acentos e afins. No entanto, garanto que esse material sera revisa logo mais para corrigir esses e quaisquer outros erros.

Agradeço à Rocketseat pelo conteúdo enriquecedor de sempre e a você que leu o material. Espero que o material tenha sido útil para você e, se tiver alguma crítica e/ou sugestão, todas as minhas redes sociais estarão listadas em meu perfil aqui no GitHub.

```

```
