'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Youtube, Linkedin, User } from 'lucide-react';
import { usePersonalInfo } from '../../stores/usePersonalInfoEntries';
import { savePersonalInfo, uploadProfileImage } from '../../actions/personalinfo';
import ProfileImageModal from '../../components/ProfileImageModal';
import { toast } from 'sonner';


export default function PersonalInfoPage() {
  const { data: personalInfo, isLoading, error, refetch } = usePersonalInfo();
  const [formState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showImageModal, setShowImageModal] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    headline: '',
    mobile_number: '',
    address: '',
    summary: '',
    github_url: '',
    instagram_url: '',
    youtube_url: '',
    linkedin_url: '',
  });

  useEffect(() => {
    if (!personalInfo) return;
    setFormData({
      first_name: personalInfo.entry.first_name || '',
      last_name: personalInfo.entry.last_name || '',
      email: personalInfo.entry.email || '',
      headline: personalInfo.entry.headline || '',
      mobile_number: personalInfo.entry.mobile_number || '',
      address: personalInfo.entry.address || '',
      summary: personalInfo.entry.professional_summary || '',
      github_url: personalInfo.entry.github_url || '',
      instagram_url: personalInfo.entry.instagram_url || '',
      youtube_url: personalInfo.entry.youtube_url || '',
      linkedin_url: personalInfo.entry.linkedin_url || '',
    });
    if (personalInfo.entry.image_url) {
      setProfileImagePreview(personalInfo.entry.image_url);
    }
  }, [personalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageSave = async (file: File) => {
    try {
      const { profileImageUrl } = await uploadProfileImage(file);
      setProfileImagePreview(profileImageUrl);
      toast.success('✅ Profile image updated successfully!', { id: 'personal-info-toast' });
      await refetch(); // refresh after upload
    } catch (err) {
      console.error('Failed to upload image', err);
      toast.success('✅ Profile image fail to update!', { id: 'personal-info-toast' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading('Saving personal info...', { id: 'personal-info-toast' });

    try {
      const form = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        form.append(key, value);
      }

      await savePersonalInfo(form);
      await refetch();

      toast.success('✅ Personal info saved successfully!', { id: 'personal-info-toast' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to save personal info. Try again.', { id: 'personal-info-toast' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">👤 Personal Information</h2>

      <form onSubmit={handleSubmit} className="space-y-10 bg-white p-8 rounded-3xl shadow-md">

        {/* Profile Image Section */}
        <section className="text-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-color-tertiary-1 text-white text-sm font-semibold">
              1
            </div>
            <h3 className="text-lg font-bold">Profile Image</h3>
          </div>          
        
        {profileImagePreview ? (
            <img src={profileImagePreview} alt="Profile" className="border w-32 h-32 mx-auto rounded-full mb-2 object-cover" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-2">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <Button variant="outline" type="button" onClick={() => setShowImageModal(true)}>
            Edit Profile Image
          </Button>
        </section>

        {/* 1. Personal Info */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-color-tertiary-1 text-white text-sm font-semibold">
              2
            </div>
            <h3 className="text-lg font-bold">Personal Info</h3>
          </div>
          <div className="grid grid-cols-1 md:!grid-cols-2 gap-4">
            {[
              { name: 'first_name', label: 'First Name', placeholder: 'e.g. John' },
              { name: 'last_name', label: 'Last Name', placeholder: 'e.g. Doe' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g. john@example.com' },
              { name: 'headline', label: 'Headline / Role', placeholder: 'e.g. Full Stack Developer' },
              { name: 'mobile_number', label: 'Phone Number', placeholder: 'e.g. +65 9876 5432' },
              { name: 'address', label: 'Address', placeholder: 'e.g. 400045, Singapore' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="text-sm font-medium mb-1 block">{label}</label>
                <Input
                  id={name}
                  name={name}
                  type={type || 'text'}
                  placeholder={placeholder}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 2. Professional Summary */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-color-tertiary-1 text-white text-sm font-semibold">
              3
            </div>
            <h3 className="text-lg font-bold">Professional Summary</h3>
          </div> 
          <label htmlFor="summary" className="text-sm font-medium mb-1 block">Summary</label>
          <Textarea
            id="summary"
            name="summary"
            placeholder="Tell us about your experience, skills, or career goals..."
            rows={5}
            maxLength={2000}
            value={formData.summary}
            onChange={handleChange}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.summary.length} / 2000 characters
          </div>
        </section>

        {/* 3. Social Links */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-color-tertiary-1 text-white text-sm font-semibold">
              4
            </div>
            <h3 className="text-lg font-bold">Social Links</h3>
          </div>

          <div className="grid grid-cols-1 md:!grid-cols-2 gap-4">
            {[
              { name: 'github_url', label: 'GitHub', icon: <Github size={16} /> },
              { name: 'instagram_url', label: 'Instagram', icon: <Instagram size={16} /> },
              { name: 'youtube_url', label: 'YouTube', icon: <Youtube size={16} /> },
              { name: 'linkedin_url', label: 'LinkedIn', icon: <Linkedin size={16} /> },
            ].map(({ name, label, icon }) => (
              <div key={name}>
                <label htmlFor={name} className="text-cd font-medium mb-1 block">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{icon}</span>
                  <Input
                    id={name}
                    name={name}
                    className="pl-10"
                    placeholder={`${label} URL`}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center pt-2">
          <Button className="px-8 py-4 bg-gradient-primary-2" type="submit" disabled={formState === 'loading'}>
            {formState === 'loading' ? 'Saving...' : 'Save Info'}
          </Button>
        </div>
      </form>

      {/* Image Crop Modal */}
      {showImageModal && (
        <ProfileImageModal
          onClose={() => setShowImageModal(false)}
          onSave={handleImageSave}
        />
      )}
    </div>
  );
}
