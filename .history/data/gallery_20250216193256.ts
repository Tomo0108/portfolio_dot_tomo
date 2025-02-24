export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  details: {
    fullDescription: string;
    technologies: string[];
    images: string[];
  };
}

export const galleryItems: { [key: string]: GalleryItem } = {
  "1": {
    id: "1",
    title: "Pokémon Holiday Special",
    image: "/gallery/pokemon-christmas.jpg",
    description: "ポケモンたちとのクリスマスをテーマにしたイラストレーション作品",
    details: {
      fullDescription: "メインキャラクターであるピカチュウ、ミュウ、リザードン、そしてコンビーが、クリスマスツリーの周りで楽しく過ごす様子を描いた作品です。雪の結晶や温かな光の演出により、幻想的で心温まる雰囲気を表現しています。",
      technologies: ["Photoshop", "Illustrator", "Digital Painting"],
      images: [
        "/gallery/pokemon-christmas.jpg",
        "/gallery/pokemon-christmas-sketch.jpg",
        "/gallery/pokemon-christmas-color.jpg"
      ]
    }
  }
};
