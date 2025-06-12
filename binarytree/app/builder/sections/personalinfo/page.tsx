'use client';

import { useRef, useState } from "react";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User } from "lucide-react";
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function PersonalInfoForm() {
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (file: File, userId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `user-profile-image/${fileName}`;

    const { error } = await supabase.storage
      .from("user-profile-image")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("user-profile-image")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
      alert("You must be logged in to submit your profile.");
      return;
    }

    const userId = session.user.id;
    const accessToken = session.access_token;

    console.log

    let profileImageUrl = "";

    if (profileImageFile) {
      try {
        profileImageUrl = await uploadProfileImage(profileImageFile, userId);
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed.");
        return;
      }
    }

    const payload = {
      full_name: fullName,
      email,
      phone,
      location,
      linkedin_url: linkedinUrl,
      github_url: githubUrl,
      bio,
      profile_image_url: profileImageUrl,
    };

    const res = await fetch(
      "https://vlgjnvjuxgorhowvkfzt.supabase.co/functions/v1/save-personal-info-function",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      alert("Data saved successfully!");
    } else {
      console.error("Error saving:", await res.json());
      alert("Failed to save.");
    }
  };

  return (
    <form className="max-w-3xl mx-auto p-6 space-y-6" onSubmit={handleSubmit}>
      {/* Profile Picture Upload */}
      <div>
        <Label className="text-md">Profile Image</Label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {profileImagePreview ? (
            <div className="space-y-4">
              <img
                src={profileImagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Image uploaded successfully!</p>
                <Button type="button" variant="outline" size="sm" onClick={() => {
                  setProfileImagePreview("");
                  setProfileImageFile(null);
                }}>
                  Remove Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-600 mb-2">Drop your profile image here or click to upload</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Image
                </Button>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Recommended: Square image, at least 400x400px for best quality
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-md" htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <Label className="text-md" htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label className="text-md" htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <Label className="text-md" htmlFor="location">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <Label className="text-md" htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
        </div>
        <div>
          <Label className="text-md" htmlFor="github">GitHub</Label>
          <Input id="github" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
        </div>
      </div>

      <div>
        <Label className="text-md" htmlFor="bio">Professional Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full text-md p-8 bg-gradient-primary-2">
        Save Info
      </Button>
    </form>
  );
}
