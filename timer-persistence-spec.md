# Spec: Corrigir persistência do timer

## Contexto

O timer atual usa um `setInterval` salvo em `useRef` que não está associado ao ID da tarefa ativa. Ao trocar de tarefa sem pausar, o intervalo continua rodando e o tempo é acumulado na nova tarefa ativa. Não existe função que pare o intervalo ao mudar o `activeTaskId`.

## Decisões de arquitetura

### Nova lógica de tempo
- Substituir o acúmulo por tick por **timestamps**: salvar `Date.now()` no início e calcular o tempo decorrido pela subtração com o `Date.now()` da pausa.
- O `setInterval` passa a ser usado apenas para atualizar o contador visual na tela.
- O tempo acumulado de sessões anteriores continua como propriedade `time` no objeto task, salvo no localStorage.

### Pacote de sessão no localStorage
Ao iniciar o cronômetro, salvar um objeto no localStorage com três campos:
- `isRunning` — booleano
- `startTimestamp` — `Date.now()` do momento de início
- `activeTaskId` — ID da tarefa que estava ativa

Ao pausar (por qualquer motivo), remover ou atualizar esse pacote.

### Lógica de recuperação ao abrir o app
No `App.jsx`, junto com a inicialização dos outros estados (tasks, categories, filters), ler o pacote de sessão do localStorage e aplicar:
- Se `isRunning === true` e `Date.now() - startTimestamp < 300000` (5 minutos em ms) → recuperar `activeTaskId` e `startTimestamp`, retomar o cronômetro automaticamente
- Se o tempo for ≥ 5 minutos → descartar o pacote, iniciar limpo

### activeTaskId sai do sessionStorage
O `activeTaskId` deixa de ser gerenciado pelo `sessionStorage`. Passa a existir apenas dentro do pacote de sessão no localStorage, controlado pela lógica dos 5 minutos acima.

## Checklist de implementação

1. **Definir o pacote de sessão** — criar uma chave no localStorage (ex: `timerSession`) que armazena `{ isRunning, startTimestamp, activeTaskId }`

2. **Salvar o pacote ao iniciar o cronômetro** — no momento do play, gravar os três valores no localStorage

3. **Remover/limpar o pacote ao pausar** — nos três eventos de pausa:
   - Clique no botão de pausar
   - Troca de tarefa ativa (hoje esse caso não para o intervalo — precisa ser corrigido)
   - Fechamento da aba (via `beforeunload`, com a ciência de que não é 100% confiável)

4. **Garantir que a troca de tarefa ativa pare o cronômetro** — hoje não existe essa lógica; ela precisa ser adicionada

5. **Adicionar lógica de recuperação no App.jsx** — no mesmo padrão dos outros estados (leitura direta do localStorage como valor inicial do `useState`, ou `useEffect` com array de dependências vazio), aplicar a validação dos 5 minutos e inicializar `activeTaskId` e `startTimestamp` conforme o resultado

6. **Remover o activeTaskId do sessionStorage** — apagar a lógica atual de leitura/escrita no `sessionStorage` para `activeTaskId`

7. **Passar startTimestamp recuperado para o Timer via props** — para que o Timer saiba de onde retomar a contagem

## Arquivos provavelmente afetados

- `src/App.jsx` — estado, leitura/escrita do pacote de sessão, lógica de recuperação
- `src/components/Timer/` — receber `startTimestamp` via props, usar timestamp em vez de acúmulo por tick
- `src/components/ActiveTask/` ou onde estiver o controle de tarefa ativa — garantir que a troca de tarefa ativa dispare a pausa do cronômetro

## Plano de ação
1. Definir o "pacote de sessão" — quais dados salvar juntos no localStorage: isRunning, startTimestamp e activeTaskId
2. Salvar esse pacote no localStorage toda vez que o cronômetro for iniciado
3. Remover ou atualizar esse pacote no localStorage toda vez que o cronômetro for pausado — seja pelo botão, seja pela troca de tarefa ativa
4. Garantir que a troca de tarefa ativa para o cronômetro em andamento — hoje o intervalo não é interrompido ao mudar a tarefa ativa
5. No App.jsx, ao inicializar o estado, ler o pacote de sessão do localStorage e aplicar a lógica dos 5 minutos:
    - Se isRunning for true e o tempo decorrido for menor que 5 minutos → recuperar activeTaskId e startTimestamp
    - Se for maior que 5 minutos → descartar o pacote e iniciar limpo
6. Remover o activeTaskId do sessionStorage — ele passa a ser gerenciado pelo pacote de sessão no localStorage
7. Garantir que o Timer receba o startTimestamp recuperado via props e retome a contagem corretamente