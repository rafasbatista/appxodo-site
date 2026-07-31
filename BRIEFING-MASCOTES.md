# Briefing — mascotes e layout do site (atualizado 30/07/2026)

## Estáticos (`assets/mascotes/*.webp` + `.png`)
Recortes aprovados pelo Rafael, feitos com rembg local sobre fundo claro — sem franja turquesa.

| Seção | Arquivo |
|---|---|
| Recursos — **ao lado do título** "Tudo do seu pet…" | `dog-apontando.webp` |
| FAQ — **ao lado do título** "Perguntas frequentes" | `cat-curiosa.webp` |
| Contato | `cat-acenando.webp` |
| Privacidade (hero) | `dog-confiavel.webp` |
| Exclusão de dados (hero) | `cat-curiosa.webp` |
| Termos de uso (hero + fim) | `dog-confiavel.webp` + `cat-acenando.webp` |
| 404 | `dog-triste-404.webp` (recortado e despillado — sem card/sombra em volta) |
| Rodapé | `cat-dormindo.webp` (estático) / **animado, ver abaixo** |

**Padrão `.sec-head`:** mascote e título lado a lado, centralizados como grupo. `.sec-head.right` inverte (mascote à direita). **No mobile os mascotes NUNCA somem** — só encolhem: 96px ≤640px, 82px ≤400px.

## Animações alpha (`assets/mascotes/anim/`)
WebM VP9 com canal alpha, ~6s, 240px, mudos. PNG de mesmo nome = 1º quadro (fallback).
`cat-dormindo-solo` (rodapé, em uso) · `dog-festa` · `cat-festa` · `dog-passeio` (disponíveis).

**Fallback obrigatório:** Safari não decodifica VP9 com alpha (mostraria quadrado preto). O script troca `video.mascote-anim` pelo PNG do poster quando falta suporte, é Safari, ou o usuário pediu menos movimento.

## Animação com FUNDO (sem alpha) — `dog-festa-teal.webm`
O CTA usa o vídeo **inteiro, com o fundo teal original**, recortado em **círculo** por CSS (`.cta-dog`, border-radius 50% + anel branco). Assim nada fica vazado e a diferença entre o teal do vídeo e o gradiente do CTA não aparece.
Vídeos com fundo próprio levam o atributo **`data-solid`** — o script não os troca por PNG no Safari (VP9 opaco toca normalmente ali).

## Regras que continuam valendo
- **Nunca espelhar** imagem/vídeo — a plaquinha "Xodó" ficaria invertida.
- Recortes foram feitos para fundo claro (`#F6FAF9`).
- Tamanhos modestos: os mascotes decoram, não competem com o conteúdo.

## Outras convenções do site
- **Selos das lojas:** oficiais Apple (`assets/img/appstore-badge.svg`, pt-BR) e Google (`googleplay-badge.png`). Ficam **soltos, sem caixa em volta, os dois com a mesma altura** (`.badges img{height:48px}`). A folga interna que o selo do Google trazia de fábrica foi **recortada do arquivo** (646×250 → 646×192) para que alturas iguais rendam tamanhos visualmente iguais. Pílula "Em breve" ao lado enquanto o app não está publicado.
- **Tópicos do hero** (`.hero-mini`): ficam **abaixo do mockup**, em faixa própria dentro do hero, centralizados; no mobile viram coluna única. Cuidado: `.hero-mini` vem depois de `.wrap` no CSS, então precisa repetir o `padding` lateral de 22px, senão as caixas encostam na borda.
- **Tabelas** (privacidade e exclusão de dados): `table{width:100%}` dentro de um wrapper com `overflow-x:auto` **nunca rola** — a tabela só espreme o texto. Por isso `.tbl-wrap table{min-width:560px}` + a dica "↔ Deslize a tabela" que aparece só no mobile.
- **Rodapé idêntico nas 5 páginas** (index, termos, privacidade, excluir-dados, 404), com os mesmos 6 links.
- **404:** caminhos **relativos** (funcionam em preview local) + script no `<head>` que injeta `<base href="/">` quando a URL tem subpastas — o GitHub Pages serve o 404 em qualquer profundidade.
