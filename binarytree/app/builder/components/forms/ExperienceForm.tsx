'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import { submitExperience,updateExperience } from '../../actions/experience'
import { useRouter } from 'next/navigation'

export interface ExperienceFormData {
  company: string
  employment_type: string
  position: string
  location: string
  start_month: number
  start_year: number
  end_month: number
  end_year: number
  ongoing: boolean
  job_description: string
  skills: string[]
}

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Freelance",
  "Temporary",
  "Self-employed",
]

const years = Array.from({ length: 70 }, (_, i) => `${new Date().getFullYear() - i}`)

export default function ExperienceForm({
  initialData,
  isEdit = false,
  experienceId,
  onSuccess,
}: {
  initialData?: ExperienceFormData
  isEdit?: boolean
  experienceId?: string
  onSuccess?: () => void
}) {
  const [formData, setFormData] = useState<ExperienceFormData>(
    initialData || 
        {company: '',
        employment_type: '',
        position: '',
        location: '',
        start_month: 0,
        start_year: 0,
        end_month: 0,
        end_year: 0,
        ongoing: false,
        job_description: '',
        skills: [],
  })

  const router = useRouter()
  const [skillInput, setSkillInput] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    let fieldValue: any = value

    if (type === 'checkbox' && 'checked' in e.target) {
      const isChecked = (e.target as HTMLInputElement).checked

      // Auto-clear end date if ongoing is checked
      if (name === 'ongoing' && isChecked) {
        setFormData(prev => ({
          ...prev,
          ongoing: true,
          end_month: 0,
          end_year: 0,
        }))
        return
      }

      fieldValue = isChecked
    }

    const numberFields = ['start_month', 'start_year', 'end_month', 'end_year']

    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? parseInt(value) || 0 : fieldValue,
    }))
  }

  const handleAddSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }))
      setSkillInput('')
    }
  }

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (item: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== item),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const {
      company,
      employment_type,
      position,
      location,
      start_month,
      start_year,
      end_month,
      end_year,
      ongoing,
    } = formData

    if (!company || !employment_type || !position || !location || !start_month || !start_year) {
      toast.error('Please fill in all required fields.')
      return
    }

    if (!ongoing && (!end_month || !end_year)) {
      toast.error('Please complete the end date or mark as ongoing.')
      return
    }

    if (!ongoing && (end_year! < start_year || (end_year === start_year && end_month! < start_month))) {
      toast.error('End date cannot be before start date.')
      return
    }

    startTransition(async () => {
        const dataToSubmit = { ...formData }

    const res = isEdit
      ? await updateExperience(experienceId!, dataToSubmit)
      : await submitExperience([dataToSubmit])

      if (res.success) {
        toast.success(isEdit ? '✅ Experience updated!' : '✅ Experience added!')
        onSuccess?.()
        router.push('/builder/sections/experience')

      } else {
        toast.error('❌ Failed to save experience. Please try again.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 shadow-lg bg-white rounded-3xl p-8">
      <section>
        <h2 className="font-bold text-lg mb-4">1. Experience Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField name="company" label="Company*" placeholder="e.g. Google" value={formData.company} onChange={handleChange} />
          <SelectField name="employment_type" label="Employment Type*" value={formData.employment_type} onChange={handleChange} options={employmentTypes} />
          <InputField name="position" label="Position*" placeholder="e.g. Software Engineer" value={formData.position} onChange={handleChange} />
          <InputField name="location" label="Location" placeholder="e.g. Singapore" value={formData.location} onChange={handleChange} />
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4">2. Education Date</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {/* Start Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Start Month*</label>
              <select name="start_month" value={formData.start_month} onChange={handleChange} className="w-full border px-3 py-2 rounded-md">
                <option value="">Select Month</option>
                {months.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Start Year*</label>
              <select name="start_year" value={formData.start_year} onChange={handleChange} className="w-full border px-3 py-2 rounded-md">
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* End Date */}
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium block mb-1">End Month*</label>
              <select
                name="end_month"
                value={formData.end_month}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${formData.ongoing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                disabled={formData.ongoing}
              >
                <option value="">Select Month</option>
                {months.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">End Year*</label>
              <select
                name="end_year"
                value={formData.end_year}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${formData.ongoing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                disabled={formData.ongoing}
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="ongoing" checked={formData.ongoing} onChange={handleChange} />
                <span>Ongoing</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4">3. Description</h2>
        <Textarea
          name="job_description"
          placeholder="e.g. Worked on scalable microservices..."
          value={formData.job_description}
          onChange={handleChange}
          className="w-full min-h-[100px]"
        />
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4">4. Skills / Technologies Used</h2>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. React, Node.js..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
          />
          <Button type="button" onClick={handleAddSkill} className="bg-color-tertiary-1 px-4 h-auto w-2/9">
            Add
          </Button>
        </div>
        {formData.skills.length > 0 && (
          <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-700">
            {formData.skills.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {item}
                <button type="button" onClick={() => handleRemoveSkill(item)}>
                  <X className="w-4 h-4 text-red-500 hover:text-red-700" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="pt-6 text-center">
        <Button type="submit" className="bg-gradient-primary-2 px-8 py-6 text-lg font-semibold disabled:opacity-50">
          {isPending ? (isEdit ? 'Updating...' : 'Adding...') : isEdit ? 'Update Education' : 'Add Education'}
        </Button>
      </div>
    </form>
  )
}

function InputField({ name, label, placeholder, value, onChange }: any) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium block mb-1">{label}</label>
      <Input id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} required />
    </div>
  )
}

function SelectField({ name, label, value, onChange, options }: any) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium block mb-1">{label}</label>
      <Select
        value={value}
        onValueChange={(val: any) => {
          onChange({
            target: {
              name,
              value: val,
              type: 'select-one',
            }
          })
        }}
      >
        <SelectTrigger className="w-full px-3 py-6" id={name}>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
