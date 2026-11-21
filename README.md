# Para você ❤️ — edição especial de 9 meses

Site de Feliphe para Ana Júlia. Namoro iniciado em 21/02/2026. Edição de 21/11/2026.

## O que foi mantido e atualizado
- Mantidos do projeto original: contador, seção de história, as **4 fotos originais**, música original, cartinha, sonhos, galeria clicável e menu mobile.
- Novo visual acolhedor, abertura dedicada à Ana Júlia, nove bilhetes interativos, carta que abre ao toque, surpresa final escondida, acessibilidade, compartilhamento social básico.
- Novo suporte PWA: `manifest.webmanifest`, `service-worker.js` e `icons/`.
- Música mantém `musica/musica.mp3` e começa **somente depois de um toque**.

## Publicar no GitHub Pages
1. Faça backup da versão anterior em um ZIP ou numa branch separada do GitHub.
2. Abra o repositório usado para seu site. Na raiz do repositório, envie **o conteúdo desta pasta** (e não uma pasta extra contendo os arquivos): `index.html`, `style.css`, `script.js`, `manifest.webmanifest`, `service-worker.js`, `.nojekyll`, `imagens/`, `musica/`, `icons/`.
3. No GitHub, em **Settings → Pages**, configure **Build and deployment → Source: Deploy from a branch**, escolha a branch publicada (`main`, se for a sua) e a pasta **/(root)**, depois **Save**. Se Pages já estiver publicado, em geral basta atualizar os arquivos na mesma branch.
4. Aguarde o GitHub Pages publicar a alteração e abra o endereço mostrado em **Settings → Pages**. Teste no celular e em uma janela anônima.
5. Confira fotos, menu, carta, contador, surpresa e música com toque. Se aparecer versão antiga, atualize forçando recarga; a atualização do cache do PWA pode levar uma navegação extra.
6. Só depois de confirmar o link definitivo, gere o QR Code para ele.

Observações: o GitHub Pages publica um site acessível para quem tiver o endereço. O meta `noindex` pede para buscadores não indexarem, mas NÃO torna o site privado. Evite subir arquivos confidenciais. Ao abrir a pasta local com duplo clique no `index.html`, as páginas funcionam, mas o service worker/PWA requer HTTPS ou localhost. Fontes de Google Fonts requerem conexão para carregar; com falha, o site usa fontes locais alternativas. O áudio não é pré-armazenado offline.

## Personalizar depois
- Texto da carta: `index.html` (buscar `Minha Ana Júlia`).
- As 9 mensagens: `index.html` (buscar `chapter-grid`).
- Fotos: substituir arquivos `imagens/foto1.jpeg` a `foto4.jpeg`, preservando nomes; editar legendas e `alt` se necessário.
- Música: `musica/musica.mp3`; se trocar, mantenha o mesmo nome ou ajuste o caminho no HTML. Utilize apenas áudio que você tenha o direito de publicar.
- Data do início do namoro: `script.js`, `new Date(2026, 1, 21, ...)` (o mês 1 é fevereiro em JavaScript).
- Quando trocar arquivos, atualize `CACHE` em `service-worker.js` (`v1` para `v2`) para evitar uma versão antiga nos aparelhos já instalados.

## QR Code romântico e seguro
A matriz do QR deve continuar **quadrada**, com margem branca clara. Para o efeito de coração, use a moldura e os detalhes ao redor do QR, em formato de coração. Cortar a matriz para um contorno de coração pode impedir a leitura.

Método sem instalar nada: depois de publicar, acesse https://www.qrcode-monkey.com/ → informe o URL exato do site → escolha cor vinho/rosa escuro em fundo claro → adicione um pequeno coração como logo, se desejar → gere e baixe em alta resolução PNG/SVG → teste com dois celulares.

Método personalizado: baixe também o arquivo separado `Kit_cartao_QR_coracao.zip` desta entrega; ele contém `gerar_cartao_qr.py` e instruções. Não publique essas ferramentas no site.
