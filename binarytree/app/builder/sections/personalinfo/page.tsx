'use client';

import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { savePersonalInfo, uploadProfileImage } from './action';
import ProfileImageModal from '../../components/ProfileImageModal';
import { usePersonalInfoStore } from '../../stores/usePersonalInfoStores';

export default function PersonalInfoPage() {
  const { data: personalInfo, fetchInfo } = usePersonalInfoStore();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showImageModal, setShowImageModal] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    bio: '',
    show_phone: true,
    show_location: true,
  });

  useEffect(() => {
    if (!personalInfo) {
      fetchInfo();
    } else {
      setFormData({
        full_name: personalInfo.full_name || '',
        email: personalInfo.email || '',
        phone: personalInfo.phone || '',
        location: personalInfo.location || '',
        linkedin_url: personalInfo.linkedin_url || '',
        github_url: personalInfo.github_url || '',
        bio: personalInfo.bio || '',
        show_phone: personalInfo.show_phone ?? true,
        show_location: personalInfo.show_location ?? true,
      });
      if (personalInfo.profile_image_url) setProfileImagePreview(personalInfo.profile_image_url);
    }
  }, [personalInfo, fetchInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');

    const form = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      form.append(key, typeof value === 'boolean' ? String(value) : value);
    }

    try {
      await savePersonalInfo(form);
      await fetchInfo(); // refetch after save
      setFormState('success');
    } catch (err) {
      console.error(err);
      setFormState('error');
    }
  };

  const handleImageSave = async (file: File) => {
    try {
      const { profileImageUrl } = await uploadProfileImage(file);
      setProfileImagePreview(profileImageUrl);
      await fetchInfo(); // update image globally
    } catch (err) {
      console.error('Failed to upload image', err);
      alert('Upload failed');
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-6">

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold">🪪 Personal Info</h2>
          </div>
          <div className="invisible bg-gradient-primary-2 px-8 py-4 h-fit">
            Placeholder
          </div>
        </div>
      </div>


      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md border shadow-sm">
        <div className="grid grid-cols-1 md:!grid-cols-2 gap-4">

          {/* Profile Image */}
          <div className="md:col-span-2">
            <label className="text-md font-bold">Profile Image</label>
            <div className="text-center">
              {profileImagePreview ? (
                <img src={profileImagePreview} alt="Profile" className="w-32 h-32 mx-auto rounded-full mb-2" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-2">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <Button type="button" variant="outline" onClick={() => setShowImageModal(true)}>
                Edit Profile Image
              </Button>
            </div>
          </div>

          {/* Input Fields */}
          <div>
            <label className="text-md font-bold" htmlFor="full_name">Full Name</label>
            <input name="full_name" className="text-md w-full border p-3 rounded" value={formData.full_name} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-md font-bold" htmlFor="email">Email</label>
            <input name="email" className="text-md w-full border p-3 rounded" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <label className="text-md font-bold" htmlFor="phone">Mobile Number</label>
            <input name="phone" className="text-md w-full border p-3 rounded" value={formData.phone} onChange={handleChange} />
            <label className="inline-flex items-center mt-2 text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.show_phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, show_phone: e.target.checked }))}
              />
              Show mobile number on portfolio
            </label>
          </div>

          <div>
            <label className="text-md font-bold" htmlFor="location">Location</label>
            <input name="location" className="text-md w-full border p-3 rounded" value={formData.location} onChange={handleChange} />
            <label className="inline-flex items-center mt-2 text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.show_location}
                onChange={(e) => setFormData((prev) => ({ ...prev, show_location: e.target.checked }))}
              />
              Show location on portfolio
            </label>
          </div>

          <div>
            <label className="text-md font-bold" htmlFor="linkedin_url">LinkedIn Profile</label>
            <input name="linkedin_url" className="text-md w-full border p-3 rounded" value={formData.linkedin_url} onChange={handleChange} />
          </div>
          <div>
            <label className="text-md font-bold" htmlFor="github_url">GitHub Profile</label>
            <input name="github_url" className="text-md w-full border p-3 rounded" value={formData.github_url} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <label className="text-md font-bold" htmlFor="bio">Professional Bio</label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
          </div>

          <div className="md:col-span-2 text-center">
            <Button className="w-3/5 p-8 bg-gradient-primary-2" type="submit" disabled={formState === 'loading'}>
              {formState === 'loading' ? 'Saving...' : 'Save Info'}
            </Button>
          </div>

          {formState !== 'idle' && (
            <div className="md:col-span-2 text-center">
              {formState === 'success' && <p className="text-green-600 mt-2">✅ Personal Info added successfully!</p>}
              {formState === 'error' && <p className="text-red-600 mt-2">❌ Failed to save Personal Info. Try again.</p>}
              {formState === 'loading' && <p className="text-blue-600 mt-2">⏳ Saving...</p>}
            </div>
          )}
        </div>
      </form>

      {showImageModal && (
        <ProfileImageModal
          onClose={() => setShowImageModal(false)}
          onSave={handleImageSave}
        />
      )}
    </div>
  );
}
