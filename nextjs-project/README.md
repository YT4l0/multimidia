# Music Player - Next.js + Tailwind CSS

Este é um reprodutor de música moderno construído com Next.js e Tailwind CSS, convertido do projeto HTML/CSS/JavaScript original.

## Características

- ▶️ Reprodução/pausa de música
- ⏭️ Navegação entre músicas (anterior/próxima)
- 🎵 Barra de progresso interativa
- 🖼️ Exibição de capas de álbum
- 📱 Design responsivo inspirado no Spotify

## Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Hooks** - Gerenciamento de estado

## Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Estrutura do projeto

```
nextjs-project/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout raiz
│   └── page.tsx         # Página principal
├── components/
│   └── MusicPlayer.tsx  # Componente do reprodutor
├── public/
│   └── assets/          # Arquivos de música e imagens
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Principais melhorias da conversão

1. **Componentização**: Código organizado em componentes React reutilizáveis
2. **TypeScript**: Tipagem para melhor desenvolvimento e menos erros
3. **Hooks**: Uso de useState, useRef e useEffect para gerenciamento de estado
4. **Tailwind CSS**: Estilização mais limpa e responsiva
5. **Next.js Image**: Otimização automática de imagens
6. **Estrutura moderna**: Arquitetura escalável e mantível

## Personalizações

Para adicionar novas músicas, edite o array `songs` em `components/MusicPlayer.tsx` e adicione os arquivos correspondentes na pasta `public/assets/`.
