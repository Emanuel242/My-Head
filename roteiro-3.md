# Roteiro â€“ Merge de Branch & Pull Request (GitHub Flow)

---

## 1) Criando uma feature branch

```bash
git checkout -b feature/resolvendo-conflito
```

- Crie um arquivo `resolucao_conflito.md`.
- **Tarefa:** documente com *prints* como vocÃª resolveu um conflito (antes/depois).

---

## 2) Merge na branch (atualizar com `main`)

### Passo a passo

```bash
# 1) Certifique-se de estar na sua feature
git checkout feature/resolvendo-conflito

# 2) Busque as Ãºltimas mudanÃ§as da remota
git fetch origin

# 3) FaÃ§a merge de main na sua branch
git merge origin/main
```

- **Se nÃ£o houver conflitos:** o Git farÃ¡ *fast-forward* ou criarÃ¡ um *merge commit*. Finalize a mensagem (se abrir o editor) e siga com o push:

  ```bash
  git push -u origin feature/resolvendo-conflito
  ```

- **Se houver conflitos:** o Git marcarÃ¡ os arquivos com trechos como abaixo. Edite e escolha o conteÃºdo correto, removendo os marcadores.

  ```text
  <<<<<<< HEAD
  (sua versÃ£o na branch)
  =======
  (versÃ£o que veio de origin/main)
  >>>>>>> origin/main
  ```

  Depois:

  ```bash
  git status                       # veja quais arquivos estÃ£o em conflito
  git add resolucao_conflito.md    # e outros que vocÃª ajustou
  git commit -m "merge: resolve conflitos com main"
  git push                         # atualiza o PR quando ele existir
  ```

### Dica (opcional)

Prefere histÃ³ria linear? Em vez de `merge`, vocÃª poderia rebasear:

```bash
git checkout feature/resolvendo-conflito
git fetch origin
git rebase origin/main   # resolve conflitos e continue com: git rebase --continue
```


### Validando o resultado

```bash
git log --oneline --graph --decorate -n 10
```

Verifique se sua branch ficou adiante de `main` com o *merge commit* (ou rebase aplicado) e que os testes/execuÃ§Ã£o local seguem funcionando.

---

## 3) Abrindo um Pull Request (PR)

1. No GitHub, clique em **Compare & pull request**.
2. Confirme **base: **`` â† **compare: **``.

### Exemplo de *pull request*

```md
## Objetivo
-

## MudanÃ§as
-

## Checklist
- [ ] Testes locais
- [ ] Atualizado docs
```

---



## EstratÃ©gias de merge no GitHub

| EstratÃ©gia           | Resultado no histÃ³rico               | PrÃ³s                                | Contras                               | Quando usar                                     |
| -------------------- | ------------------------------------ | ----------------------------------- | ------------------------------------- | ----------------------------------------------- |
| **Merge commit**     | Cria um commit de merge              | Preserva a histÃ³ria exata           | HistÃ³rico mais "verboso"              | Projetos que valorizam rastreabilidade completa |
| **Squash and merge** | Condensa todos os commits do PR em 1 | HistÃ³ria linear e limpa             | Perde granularidade de commits        | PRs com muitos commits pequenos                 |
| **Rebase and merge** | Reaplica commits sobre `main` (FF)   | HistÃ³ria linear sem commit de merge | Pode reescrever SHA; cuidado em times | Times experientes que preferem linearidade      |


Material de estudo extra:

- [COMO FAZER UM PULL REQUEST (legendado)](https://www.youtube.com/watch?v=IMerCpaT_zM)

---