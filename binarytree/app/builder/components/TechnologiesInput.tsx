import { useState } from 'react';

type Props = {
  technologies: string[];
  setTechnologies: (techs: string[]) => void;
};

export default function TechnologiesInput({ technologies, setTechnologies }: Props) {
  const [techInput, setTechInput] = useState('');

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
    }
    setTechInput('');
  };

  const removeTech = (techToRemove: string) => {
    setTechnologies(technologies.filter((tech) => tech !== techToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTech();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Node.js"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="button"
          onClick={addTech}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {technologies.length > 0 && (
        <div className="flex flex-wrap mt-2 gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

