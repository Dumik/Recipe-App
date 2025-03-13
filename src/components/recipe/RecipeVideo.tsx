interface RecipeVideoProps {
  videoUrl: string;
}

const RecipeVideo = ({ videoUrl }: RecipeVideoProps) => {
  if (!videoUrl) return null;

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Video Tutorial</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={videoUrl.replace('watch?v=', 'embed/')}
            title="Recipe Video Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeVideo; 