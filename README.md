# KidsVideo AI — Mobile

Interface feita para iPhone/Android. O botão "Criar vídeo" chama o servidor, e o servidor chama a Runway.

## Para ligar a IA

1. Cria uma conta de desenvolvedor na Runway.
2. Cria uma API key.
3. No servidor, cria `.env` a partir de `.env.example`:
   `RUNWAYML_API_SECRET=SUA_CHAVE`
4. Instala e inicia:
   `npm install`
   `npm start`

Abra o endereço do servidor no Safari/Chrome do celular.

## Segurança

Nunca coloque a chave Runway dentro do `index.html` ou em JavaScript enviado para o celular.

## Nota

O exemplo gera um clipe de 5 segundos com Gen-4.5. Para vídeos de 10 minutos, a aplicação precisa gerar vários clipes e depois juntá-los em um vídeo final.
