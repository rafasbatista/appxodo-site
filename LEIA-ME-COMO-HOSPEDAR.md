# 🌐 Como publicar o site do Xodó (GitHub Pages + domínio próprio)

Objetivo: colocar esta pasta no ar em **https://appxodo.rafasbatista.com.br**, de graça, com HTTPS.

Resultado final (os links que você vai colar nas lojas):
- **Site / URL de marketing e suporte:** `https://appxodo.rafasbatista.com.br`
- **Política de Privacidade:** `https://appxodo.rafasbatista.com.br/privacidade.html`

O que já está pronto nesta pasta (`site/`):
```
index.html          → landing do app
privacidade.html    → política de privacidade
CNAME               → appxodo.rafasbatista.com.br (não apague)
assets/             → ícone, logo e as 5 screenshots
```

---

## Passo 1: Criar o repositório no GitHub
1. Acesse https://github.com e faça login (crie a conta se não tiver, grátis).
2. Clique em **New repository**.
3. Nome: `appxodo-site` · deixe **Public** · **não** marque "Add a README".
4. Clique em **Create repository**.

## Passo 2: Enviar os arquivos
**Jeito fácil (sem terminal):**
1. Na página do repositório novo, clique em **uploading an existing file**.
2. Arraste **tudo que está dentro da pasta `site/`** (o `index.html`, `privacidade.html`, `CNAME` e a pasta `assets`).
3. Escreva "primeira versão" e clique em **Commit changes**.

**Jeito terminal (se preferir):**
```bash
cd D:/SKILLS/pet-care-app/site
git init
git add .
git commit -m "Site do Xodó"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/appxodo-site.git
git push -u origin main
```

## Passo 3: Ligar o GitHub Pages
1. No repositório: **Settings** → menu lateral **Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Branch: **main** · pasta: **/ (root)** → **Save**.
4. Em **Custom domain**, o valor `appxodo.rafasbatista.com.br` já aparece (veio do arquivo CNAME). Se não, digite e salve.
5. Marque **Enforce HTTPS** (pode levar alguns minutos pra liberar).

## Passo 4: Apontar o domínio (DNS)
No painel onde você gerencia o domínio **rafasbatista.com.br** (Registro.br, Cloudflare, HostGator, etc.), crie **um registro**:

| Tipo | Nome / Host | Valor / Aponta para |
|------|-------------|---------------------|
| `CNAME` | `appxodo` | `SEU_USUARIO.github.io` |

> Troque `SEU_USUARIO` pelo seu usuário do GitHub (tudo minúsculo).
> Se o painel não deixar CNAME em subdomínio, use registros **A** apontando para os IPs do GitHub Pages:
> `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

## Passo 5: Esperar e testar
- O DNS costuma propagar em 10 min a algumas horas.
- Abra **https://appxodo.rafasbatista.com.br**, deve mostrar a landing.
- Abra **https://appxodo.rafasbatista.com.br/privacidade.html**, deve mostrar a política.
- Confirme o cadeado 🔒 (HTTPS). Pronto pra colar nas lojas!

---

## Como atualizar depois
Editou o `index.html` ou a política? É só subir o arquivo de novo pelo GitHub (ou `git add . && git commit -m "update" && git push`). O site atualiza sozinho em ~1 min.
