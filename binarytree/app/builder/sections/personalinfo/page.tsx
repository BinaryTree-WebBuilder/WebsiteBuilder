'use client';

import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { savePersonalInfo, getPersonalInfo, uploadProfileImage } from './action';
import ProfileImageModal from '../../components/ProfileImageModal';

export default function PersonalInfoPage() {
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showImageModal, setShowImageModal] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    bio: '',
  });

  // Fetch personal info on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonalInfo();
        if (data) {
          setFormData({
            full_name: data.full_name || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            linkedin_url: data.linkedin_url || '',
            github_url: data.github_url || '',
            bio: data.bio || '',
          });
          if (data.profile_image_url) setProfileImagePreview(data.profile_image_url);
        }
      } catch (err) {
        console.error('Failed to fetch personal info', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');

    const form = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      form.append(key, value);
    }

    try {
      await savePersonalInfo(form);
      setFormState('success');
    } catch (err) {
      console.error(err);
      setFormState('error');
    }
  };

  const handleImageSave = async (file: File) => {
    try {
      const { profileImageUrl } = await uploadProfileImage(file); // extract URL
      setProfileImagePreview(profileImageUrl);
    } catch (err) {
      console.error('Failed to upload image', err);
      alert('Upload failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Personal Info</h2>
      <p className="text-gray-600 mb-6">Add your Personal Information and your Socials</p>


      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md border shadow-sm">
        {/* Profile Image Upload */}
        <div>
          <label className="text-md font-bold">Profile Image</label>
          <div className="text-center">
            {profileImagePreview ? (
              <img src={profileImagePreview} alt="Profile Image Preview" className="w-32 h-32 mx-auto rounded-full mb-2" />
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

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-md font-bold" htmlFor="full_name">Full Name</label>
            <input name="full_name" className="text-md w-full border p-3 rounded" value={formData.full_name} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-md font-bold" htmlFor="email">Email</label>
            <input name="email" className="text-md w-full border p-3 rounded" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-md font-bold" htmlFor="phone">Phone</label>
            <input name="phone" className="text-md w-full border p-3 rounded" value={formData.phone} onChange={handleChange} />
          </div>
          <div> 
            <label className="text-md font-bold" htmlFor="location">Location</label>
            <input name="location" className="text-md w-full border p-3 rounded" value={formData.location} onChange={handleChange} />
          </div>
          <div>
            <label className="text-md font-bold" htmlFor="linkedin_url">LinkedIn</label>
            <input name="linkedin_url" className="text-md w-full border p-3 rounded" value={formData.linkedin_url} onChange={handleChange} />
          </div>
          <div>
            <label className="text-md font-bold" htmlFor="github_url">GitHub</label>
            <input name="github_url" className="text-md w-full border p-3 rounded" value={formData.github_url} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="text-md font-bold" htmlFor="bio">Professional Bio</label>
          <Textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
        </div>

        <div className="text-center">
          <Button className='w-1/2 p-8 bg-gradient-primary-2' type="submit" disabled={formState === 'loading'}>
            {formState === 'loading' ? 'Saving...' : 'Save Info'}
          </Button>
        </div>

        {formState === 'success' && (
          <p className="text-green-600 mt-2">✅ Personal Info added successfully!</p>
        )}
        {formState === 'error' && (
          <p className="text-red-600 mt-2">❌ Failed to save Personal Info. Try again.</p>
        )}
        {formState === 'loading' && (
          <p className="text-blue-600 mt-2">⏳ Saving...</p>
        )}
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
