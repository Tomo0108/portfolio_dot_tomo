export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  details: {
    fullDescription: string;
    technologies: string[];
    images: {
      line: string;
      color: string;
      complete: string;
    };
  };
}

export const galleryItems: { [key: string]: GalleryItem } = {
  "1": {
    id: "1",
    title: "ナヒーダ",
    description: "原神のキャラクター、ナヒーダのイラスト作品",
    image: "/gallery/genshin_nahida1.JPG",
    details: {
      fullDescription: "草神ナヒーダの優しさと知性を表現したイラスト作品です。",
      technologies: ["Clip Studio Paint", "Digital Painting"],
      images: {
        line: "/gallery/genshin_nahida1_line.JPG",
        color: "/gallery/genshin_nahida1_color.JPG",
        complete: "/gallery/genshin_nahida1.JPG"
      }
    }
  },
  "2": {
    id: "2",
    title: "ナヒーダ 其の二",
    description: "原神のキャラクター、ナヒーダの第二イラスト作品",
    image: "/gallery/genshin_nahida2.JPG",
    details: {
      fullDescription: "草神ナヒーダの別の表情を描いた作品です。",
      technologies: ["Clip Studio Paint", "Digital Painting"],
      images: {
        line: "/gallery/genshin_nahida2_line.JPG",
        color: "/gallery/genshin_nahida2_color.JPG",
        complete: "/gallery/genshin_nahida2.JPG"
      }
    }
  },
  "3": {
    id: "3",
    title: "キルア",
    description: "HUNTER×HUNTERのキャラクター、キルアのイラスト作品",
    image: "/gallery/hunterxhunter_kirua.JPG",
    details: {
      fullDescription: "キルアの少年らしい表情と強さを表現した作品です。",
      technologies: ["Clip Studio Paint", "Digital Painting"],
      images: {
        line: "/gallery/hunterxhunter_kirua_line.JPG",
        color: "/gallery/hunterxhunter_kirua_color.JPG",
        complete: "/gallery/hunterxhunter_kirua.JPG"
      }
    }
  },
  "4": {
    id: "4",
    title: "ポケモン お正月",
    description: "ポケモンたちとのお正月をテーマにしたイラスト作品",
    image: "/gallery/pokemon_newyear.JPG",
    details: {
      fullDescription: "ポケモンたちと日本の伝統的なお正月を楽しむ様子を描いた作品です。",
      technologies: ["Clip Studio Paint", "Digital Painting"],
      images: {
        line: "/gallery/pokemon_newyear_line.JPG",
        color: "/gallery/pokemon_newyear_color.JPG",
        complete: "/gallery/pokemon_newyear.JPG"
      }
    }
  },
  "5": {
    id: "5",
    title: "ポケモン クリスマス",
    description: "ポケモンたちとのクリスマスをテーマにしたイラスト作品",
    image: "/gallery/pokemon-christmas.JPG",
    details: {
      fullDescription: "ポケモンたちとクリスマスを楽しむ様子を描いた作品です。",
      technologies: ["Clip Studio Paint", "Digital Painting"],
      images: {
        line: "/gallery/pokemon-christmas_color_line.JPG",
        color: "/gallery/pokemon-christmas_color.JPG",
        complete: "/gallery/pokemon-christmas.JPG"
      }
    }
  }
};
