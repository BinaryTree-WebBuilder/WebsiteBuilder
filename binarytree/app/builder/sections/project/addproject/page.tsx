'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  video_url?: string;
}

export default function AddProjectPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProjectData>({
  name: '',
  description: '',
  technologies: [],
  github_url: '',
  live_url: '',
  image_url: '',
  video_url: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const isStep1Valid = formData.name.trim() && formData.description.trim();

  const handleSubmit = async () => {
    // Submit logic (upload image to Supabase, insert into DB, etc.)
    console.log('Submitting:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      <p className="mb-8 text-gray-600">Step {step} of 4</p>

      {step === 1 && (
        <div className="space-y-6">
          <Input
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Button disabled={!isStep1Valid} onClick={() => setStep(2)}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Input
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            name="technologies"
            placeholder="Technologies (comma separated)"
            value={formData.technologies.join(', ')}
            onChange={(e) =>
              setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()) })
            }
          />
          <Button disabled={!isStep1Valid} onClick={() => setStep(3)}>Next</Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Input
            name="live_url"
            placeholder="Live URL (optional)"
            value={formData.live_url}
            onChange={handleChange}
          />
          <Input
            name="github_url"
            placeholder="GitHub Repo (optional)"
            value={formData.github_url}
            onChange={handleChange}
          />

          <Input
            name="video_url"
            placeholder="Video link (optional)"
            value={formData.github_url}
            onChange={handleChange}
          />

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={() => setStep(4)}>Next</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Confirm Details</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          {formData.technologies.length > 0 && (
            <p><strong>Tech:</strong> {formData.technologies.join(', ')}</p>
          )}
          {formData.github_url && <p><strong>GitHub:</strong> {formData.github_url}</p>}
          {formData.live_url && <p><strong>Live URL:</strong> {formData.live_url}</p>}
          {formData.image_url && <p><strong>Image:</strong> {formData.image_url}</p>}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
}
