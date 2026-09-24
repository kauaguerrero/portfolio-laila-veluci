export const profile = {
  name: "Laila Veluci",
  title: "UGC Creator • Fashion • Beauty • Lifestyle",
  heroText:
    "Produzo conteúdos autênticos e estratégicos para marcas e empresas através de vídeos, fotos e campanhas criativas para redes sociais.",
  aboutText: [
    "Olá! Sou Laila Veluci, criadora de conteúdo apaixonada por moda, beleza e lifestyle.",
    "Produzo vídeos UGC, provadores, fotos e conteúdos para Instagram e TikTok, sempre buscando criar materiais autênticos que aproximem marcas do seu público.",
    "Trabalho tanto com empresas da minha região quanto com marcas de qualquer lugar do Brasil e do exterior.",
  ],
  instagram: "@lailaveluci",
  instagramUrl: "https://instagram.com/lailaveluci",
  tiktok: "@lailaveluci",
  tiktokUrl: "https://tiktok.com/@lailaveluci",
  email: "contato@lailaveluci.com",
};

export const services = [
  { title: "Vídeos UGC", icon: "video" },
  { title: "Provadores", icon: "hanger" },
  { title: "Fotos Lifestyle", icon: "camera" },
  { title: "Reels", icon: "reel" },
  { title: "TikTok", icon: "tiktok" },
  { title: "Conteúdo para Instagram", icon: "instagram" },
  { title: "Unboxing", icon: "box" },
  { title: "Reviews", icon: "star" },
  { title: "Divulgação de produtos", icon: "megaphone" },
  { title: "Conteúdo para campanhas", icon: "sparkles" },
] as const;

export const audience = [
  "Moda Feminina",
  "Lojas de roupas",
  "Vestidos de festa",
  "Vestidos para casamento",
  "Vestidos para madrinhas",
  "Vestidos para debutantes",
  "Lojas de maquiagem",
  "Cosméticos",
  "Acessórios",
  "Calçados",
  "Pequenos negócios",
  "Empresas locais",
  "Marcas nacionais",
  "Marcas internacionais",
] as const;

export const experiences = [
  "Produção de conteúdo para lojas de moda.",
  "Gravação de vídeos de provador.",
  "Conteúdo para Instagram e TikTok.",
  "Produção de vídeos UGC.",
  "Ensaios utilizando vestidos para casamentos, madrinhas, eventos sociais e debutantes.",
  "Produção de fotos e vídeos para divulgação de produtos.",
] as const;

export const differentials = [
  "Conteúdo autêntico",
  "Comunicação natural",
  "Vídeos modernos",
  "Conteúdo humanizado",
  "Facilidade em frente às câmeras",
  "Produção voltada para redes sociais",
  "Atendimento personalizado",
  "Disponibilidade para campanhas presenciais e remotas",
] as const;

export type PortfolioCategory =
  | "Moda"
  | "Beleza"
  | "Lifestyle"
  | "Vestidos"
  | "Maquiagem"
  | "Fotos espontâneas";

export const portfolioCategories: PortfolioCategory[] = [
  "Moda",
  "Beleza",
  "Lifestyle",
  "Vestidos",
  "Maquiagem",
  "Fotos espontâneas",
];

export interface PortfolioItem {
  id: number;
  category: PortfolioCategory;
  src: string;
  alt: string;
}

// Uma foto por arquivo em /public/img/portfolio — adicione mais arquivos
// placeholder-N.jpeg e aumente `length` conforme novas fotos forem enviadas.
export const portfolioItems: PortfolioItem[] = Array.from({ length: 9 }).map(
  (_, i) => ({
    id: i + 1,
    category: portfolioCategories[i % portfolioCategories.length],
    src: `/img/portfolio/placeholder-${i + 1}.jpeg`,
    alt: `Foto de portfólio ${i + 1} — ${portfolioCategories[i % portfolioCategories.length]}`,
  }),
);

export interface VideoEmbed {
  id: number;
  label: string;
  url: string;
}

// Adicione aqui os reels da Laila: { id, label, url }. Sem itens, a secao de videos fica oculta.
export const videoEmbeds: VideoEmbed[] = [
  {
    id: 1,
    label: "Reel",
    url: "https://www.instagram.com/reel/Dclrq40RNd7/",
  },
];
