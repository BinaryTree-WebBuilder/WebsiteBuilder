'use client';

import { useState } from 'react';
import { saveExperience } from './action';
import TechnologiesInput  from '../../components/TechnologiesInput';
import TiptapEditor from '@/components/ui/tiptapeditor'; // adjust path
import { Button } from '@/components/ui/button';

const emptyExperience = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  description: '',
  technologies: [] as string[], // keep technologies as an array
};

export default function ExperienceFormPage() {
  const [experience, setExperience] = useState({ ...emptyExperience });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
        const target = e.target as HTMLInputElement;
        setExperience((prev) => ({
        ...prev,
        [name]: target.checked,
        }));
    } else {
        setExperience((prev) => ({
        ...prev,
        [name]: value,
        }));
    }
    };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const result = await saveExperience(experience);
      if (result.success) {
        setFormState('success');
        setExperience({ ...emptyExperience });

        setTimeout(() => setFormState('idle'), 3000);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>
      <p className="text-gray-600 mb-6">Add your work experience and internships</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md border shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Company *</label>
            <input
              type="text"
              name="company"
              value={experience.company}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Position *</label>
            <input
              type="text"
              name="position"
              value={experience.position}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={experience.startDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {!experience.currentlyWorking && (
            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={experience.endDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="currentlyWorking"
            checked={experience.currentlyWorking}
            onChange={handleChange}
          />
          <label>Currently working here</label>
        </div>

        <div>
          <label className="block font-medium mb-1">Job Description *</label>
          <TiptapEditor
            content={experience.description}
            onChange={(val) =>
                setExperience((prev) => ({ ...prev, description: val }))
            }
            />
        </div>

        <div>
          <label className="block font-medium mb-1">Technologies Used</label>
        {/* Use TechnologiesInput here and sync to experience */}
            <TechnologiesInput
                technologies={experience.technologies}
                setTechnologies={(techs) =>
                setExperience((prev) => ({ ...prev, technologies: techs }))
                }
            />
        </div>

        <Button
          type="submit"
          className="w-full p-8 bg-gradient-primary-1"
        >
          + Add Experience
        </Button>

        {formState === 'success' && (
          <p className="text-green-600 mt-2">✅ Experience added successfully!</p>
        )}
        {formState === 'error' && (
          <p className="text-red-600 mt-2">❌ Failed to save experience. Try again.</p>
        )}
        {formState === 'loading' && (
          <p className="text-blue-600 mt-2">⏳ Saving...</p>
        )}
      </form>
    </div>
  );
}
