
# Documentação Git & GitHub

*Este guia contém os principais comandos Git utilizados no dia a dia de um DevOps, com descrição, uso prático, finalidade, cenários comuns e melhores práticas.*

## Índice Remissivo
- [Comandos Essenciais](#comandos-essenciais)
- [Gerenciamento de Branches](#gerenciamento-de-branches)
- [Trabalhando com Alterações](#trabalhando-com-alterações)
- [Sincronização com Remoto](#sincronização-com-remoto)
- [Correções e Histórico](#correções-e-histórico)
- [Workflow DevOps](#workflow-devops)
- [Comandos Avançados](#comandos-avançados)
- [Boas Práticas DevOps](#boas-práticas-devops)
- [Integração com Ferramentas DevOps](#integração-com-ferramentas-devops)


## Comandos Essenciais

### git init
**Descrição:** Inicia o git no repositorio.
```bash
git init
```
---

### git clone
**Descrição:** Clona um repositório remoto para sua máquina local.
```bash
git clone git@github.com:user/repo.git
```
---

### git status
**Descrição:** Exibe estado do diretório de trabalho e área de staging.
```bash
git status
```
**Finalidade:** Verificar alterações pendentes e estado atual  
**Cenário:** Antes de iniciar novas modificações



## Gerenciamento de Branches

### git checkout
**Descrição:** Alterna entre branches ou cria nova branch.
```bash
git checkout nome-da-branch
```
<details><summary>Variações</summary>

```bash
git checkout -b nome-da-nova-branch  # Cria e troca para nova branch
git checkout .  # Desfaz alterações não commitadas
```
</details>

---

### git branch
**Descrição:** Gerencia branches locais.
```bash
git branch  # Lista branches
git branch -d feature-x  # Deleta branch local
git push origin --delete <nome-da-branch> # Deleta branch remota
```
---

### git merge
**Descrição:** Integra alterações de uma branch à atual.
```bash
git merge feature-branch
```
---

### git rebase
**Descrição:** Reescreve histórico de commits.
```bash
git rebase main
```
<details><summary>Variações</summary>

```bash
git rebase --abort  # Cancela rebase
git rebase --continue  # Continua após resolver conflitos
```
</details>
⚠️ Cuidado: Nunca usar rebase em branches compartilhadas



## Trabalhando com Alterações

### git add
**Descrição:** Adiciona mudanças ao staging.
```bash
git add .
```
<details><summary>Variações</summary>

```bash
git add -p  # Adiciona interativamente

git add <nome-do-arquivo>  # Adiciona um arquivo específico
```
</details>

---

### git commit
**Descrição:** Salva snapshot do staging.
```bash
git commit -m "feat: adiciona nova funcionalidade"
```
<details><summary>Variações</summary>

```bash
git commit --amend  # Edita último commit
```
</details>

### Convenção de Commits

| Tipo      | Uso                              |
|-----------|----------------------------------|
| feat:     | Nova funcionalidade              |
| fix:      | Correção de bug                  |
| docs:     | Documentação                     |
| ci:       | Mudanças em CI/CD                |
| refactor: | Refatoração sem mudança funcional|

### Boas Práticas para Mensagens:

>Comece com o tipo + : + espaço
(feat: , fix: , etc)

>Use verbo no imperativo (presente):<br>
✔️ "adiciona", "corrige", "implementa"<br>
❌ "adicionado", "correção", "implementei"

>Seja específico mas conciso:<br>
✔️ fix: corrige parsing de datas no formato ISO-8601<br>
❌ fix: arruma problema com datas

>Mencione o componente afetado:<br>
✔️ refactor: otimiza queries do módulo de relatórios<br>
❌ refactor: melhora performance

---

### git stash
**Descrição:** Guarda temporariamente alterações.
```bash
git stash
```
<details><summary>Variações</summary>
```bash
git stash pop  # Restaura último stash
git stash list  # Lista stashes
```
</details>

---


## Sincronização com Remoto

### git fetch
**Descrição:** Atualiza referências locais sobre o remoto.
```bash
git fetch origin
```

### git pull
**Descrição:** Sincroniza alterações remotas.
```bash
git pull --rebase origin main
```

### git push
**Descrição:** Envia commits locais para remoto.
```bash
git push -u origin feature-x
```
<details><summary>Variações</summary>

```bash
git push --force-with-lease  # Alternativa segura ao force push
git push origin :branch-to-delete  # Deleta branch remota
```
</details>

### git remote
**Descrição:** Gerencia conexões remotas.
```bash
git remote -v  # Lista repositórios remotos
```

### Sobrescrever o URL de “origin”
**Descrição:** Se você só precisa corrigir o endereço de origin, use:

```bash
git remote set-url origin git@github.com:SEU-USUARIO/SEU-REPO.git
```
Isso muda o URL, sem precisar remover o remote. 

>Lembre-se de subistituir >> 'SEU-USUARIO/SEU-REPO'

### Remover e recriar o “origin”
Se quiser partir de zero:

```bash
git remote remove origin
git remote add origin git@github.com:SEU-USUARIO/SEU-REPO.git
```


## Correções e Histórico

### git reset
**Descrição:** Desfaz commits/alterações.
```bash
git reset --soft HEAD~1
```

### git revert
**Descrição:** Desfaz alterações com novo commit.
```bash
git revert abcd1234
```

### git log
**Descrição:** Exibe histórico de commits.
```bash
git log --graph --oneline --all
```

### git diff
**Descrição:** Mostra diferenças entre versões.
```bash
git diff --staged  # Alterações em staged
```


## Workflow DevOps

### Fluxo de Trabalho Padrão
**Passo a Passo**

Atualizar branch principal:
```bash
git checkout main
git pull --rebase
```

Criar feature branch:
```bash
git checkout -b feature/xyz
```

Desenvolver e commitar:
```bash
git add .
git commit -m "feat: add feature xyz"
```

Sincronizar com remote:
```bash
git push -u origin feature/xyz
```

Abrir Pull Request (GitHub UI)

Após merge:
```bash
git checkout main
git pull
git branch -d feature/xyz
```


## Comandos Avançados

### git bisect
**Descrição:** Busca binária para encontrar bug.
```bash
git bisect start
git bisect bad HEAD
git bisect good v1.0
```

### git reflog
**Descrição:** Mostra histórico de referências.
```bash
git reflog  # Recupera branches/commits perdidos
```

**Troubleshooting**
```bash
# Desfazer merge conflituoso:
git merge --abort

# Limpar branches locais obsoletas:
git fetch -p && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
```
### cherry-pick
**Descrição:** Copia um commit específico para a branch atual. Útil em hotfixes..
```
git cherry-pick <commit>
```


## Boas Práticas DevOps

### ❌ Anti-Patterns

- Commitar diretamente na main
- Force push em branches compartilhadas
- Mensagens genéricas ("Update file")
- Ignorar .gitignore (commitar secrets/temporários)

---

*Documentação atualizada em: 2025-06-04*



