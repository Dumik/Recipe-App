import { Globe, Tag, Utensils } from 'lucide-react';

interface RecipeHeroProps {
  image: string;
  title: string;
  category: string | null;
  area: string | null;
  tags: string | null;
}

const RecipeHero = ({ image, title, category, area, tags }: RecipeHeroProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-12">
      <img 
        src={image} 
        alt={title}
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex flex-wrap gap-4">
          {category && (
            <div className="flex items-center">
              <Utensils className="w-5 h-5 mr-2" />
              {category}
            </div>
          )}
          {area && (
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              {area}
            </div>
          )}
          {tags && (
            <div className="flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              {tags}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeHero; 