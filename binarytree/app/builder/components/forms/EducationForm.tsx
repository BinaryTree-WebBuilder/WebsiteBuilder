'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import { submitEducation, updateEducation } from '@/app/builder/actions/education'
import { useRouter } from 'next/navigation'


export interface EducationFormData {
  institution_name: string
  course: string
  field_of_study: string
  location: string
  start_month: number
  start_year: number
  end_month: number
  end_year: number
  highlights: string[]
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

const years = Array.from({ length: 70 }, (_, i) => `${new Date().getFullYear() - i}`)

export default function EducationForm({
  initialData,
  isEdit = false,
  educationId,
  onSuccess,
}: {
  initialData?: EducationFormData
  isEdit?: boolean
  educationId?: string
  onSuccess?: () => void
}) {
  const [formData, setFormData] = useState<EducationFormData>(
    initialData || {
      institution_name: '',
      course: '',
      field_of_study: '',
      location: '',
      start_month: 0,
      start_year: 0,
      end_month: 0,
      end_year: 0,
      highlights: [],
    }
  )
  const router = useRouter()
  const [highlightInput, setHighlightInput] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddHighlight = () => {
    const trimmed = highlightInput.trim()
    if (trimmed && !formData.highlights.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, trimmed],
      }))
      setHighlightInput('')
    }
  }

  const handleRemoveHighlight = (item: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(h => h !== item),
    }))
  }

  const handleHighlightKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddHighlight()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      institution_name,
      course,
      field_of_study,
      location,
      start_month,
      start_year,
      end_month,
      end_year,
    } = formData

    if (
      !institution_name ||
      !course ||
      !field_of_study ||
      !location ||
      !start_month ||
      !start_year ||
      !end_month ||
      !end_year
    ) {
      toast.error('Please fill in all required fields.')
      return
    }


    if (end_year < start_year || (end_year === start_year && end_month < start_month)) {
      toast.error('End date cannot be before start date.')
      return
    }

    startTransition(async () => {
        const dataToSubmit = { ...formData }

    const res = isEdit
      ? await updateEducation(educationId!, dataToSubmit)
      : await submitEducation([dataToSubmit])

      if (res.success) {
        toast.success(isEdit ? '✅ Education updated!' : '✅ Education added!')
        onSuccess?.()
        router.push('/builder/sections/education')
      } else {
        toast.error('❌ Failed to save education. Please try again.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 shadow-lg bg-white rounded-3xl p-8">
      <section>
        <h2 className="font-bold text-lg mb-4">1. Education Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField name="institution_name" label="Institution Name*" placeholder="e.g. NUS" value={formData.institution_name} onChange={handleChange} />
          <InputField name="course" label="Course*" placeholder="e.g. Bachelor of Computing" value={formData.course} onChange={handleChange} />
          <InputField name="field_of_study" label="Field of Study*" placeholder="e.g. Computer Science" value={formData.field_of_study} onChange={handleChange} />
          <InputField name="location" label="Location" placeholder="e.g. Singapore" value={formData.location} onChange={handleChange} />
          
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4">2. Education Date</h2>
        <div className='grid md:grid-cols-2 gap-4'>
          {/* Start Date */}
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
            <label className="text-sm font-medium block mb-1">Start Month*</label>
            <select name="start_month" value={formData.start_month} onChange={handleChange} className="w-full border px-3 py-2 rounded-md">
              <option value="">Select Month</option>
              {months.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            </div>
            <div>
            <label className="text-sm font-medium block mb-1">Start Year*</label>
            <select name="start_year" value={formData.start_year} onChange={handleChange} className="w-full border px-3 py-2 rounded-md">
              <option value="">Select Year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            </div>
          </div>

          {/* End Date */}
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <label className="text-sm font-medium block mb-1">End Month*</label>
              <select name="end_month" value={formData.end_month} onChange={handleChange} className="w-full border px-3 py-2 rounded-md">
                <option value="">Select Month</option>
                {months.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">End Year*</label>
              <select name="end_year" value={formData.end_year} onChange={handleChange} className="w-full border px-3 py-2 rounded-md">
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>



    <section>
      <h2 className="font-bold text-lg mb-4">3. Highlights / Achievements</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Press Enter: Dean’s List, Captain of AI Club..."
          value={highlightInput}
          onChange={(e) => setHighlightInput(e.target.value)}
          onKeyDown={handleHighlightKeyDown}
        />
        <Button
          type="button"
          onClick={handleAddHighlight}
          className="bg-color-tertiary-1 px-4 h-auto w-2/9"
        >
          Add
        </Button>
      </div>
      {formData.highlights.length > 0 && (
        <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-700">
          {formData.highlights.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {item}
              <button type="button" onClick={() => handleRemoveHighlight(item)}>
                <X className="w-4 h-4 text-red-500 hover:text-red-700" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>

      <div className="pt-6 text-center">
        <Button
          type="submit"
          className="bg-gradient-primary-2 px-8 py-6 text-lg font-semibold disabled:opacity-50"
        >
          {isPending ? (isEdit ? 'Updating...' : 'Adding...') : isEdit ? 'Update Education' : 'Add Education'}
        </Button>
      </div>
    </form>
  )
}

function InputField({
  name,
  label,
  placeholder,
  value,
  onChange,
}: {
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium block mb-1">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

