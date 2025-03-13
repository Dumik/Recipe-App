interface RecipeInstructionsProps {
  instructions: string;
}

const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Instructions</h2>
      <div className="space-y-4">
        {instructions
          .split(/\r?\n/)
          .filter(step => step.trim())
          .map((step, index) => (
            <div key={index} className="flex items-start group">
                <p className="text-gray-700 leading-relaxed">{step.trim()}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeInstructions; 