import { galleryItems } from '@/data/gallery';
import { GalleryItemView } from '@/components/gallery-item';

// 静的生成するページのパラメータを指定
export function generateStaticParams() {
  return Object.keys(galleryItems).map((id) => ({
    id: id,
  }));
}

export default function GalleryItemPage({ params }: { params: { id: string } }) {
  const item = galleryItems[params.id];

  if (!item) {
    return <div>Gallery item not found</div>;
  }

  return <GalleryItemView item={item} />;
}
