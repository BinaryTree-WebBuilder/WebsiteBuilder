'use client'

import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { RefreshCw } from 'lucide-react'
import { useSkills } from '../../stores/useSkillsEntries'
import { addSkill, syncSkillsClientSide, updateSkillSet } from '@/app/builder/actions/skills'
import { useQueryClient } from '@tanstack/react-query'

export default function SkillsPage() {
  const { data: entries = [], isLoading, refetch } = useSkills()
  const [, setError] = useState<string | null>(null)
  const [skillInput, setSkillInput] = useState('')
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()

  // Track which skill index is being edited & the current edit value
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    if (!isLoading) {
      refetch().catch(() => setError('Failed to load skills'))
    }
  }, [isLoading, refetch])

  const handleAddSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed) return

    const totalSkills = entries?.[0]?.skills?.length || 0
    if (totalSkills >= 100) {
      toast.warning('Skill limit reached (100).')
      return
    }

    startTransition(async () => {
      const result = await addSkill(trimmed)
      if (result.success) {
        toast.success('Skill added')
        setSkillInput('')
        refetch()
      } else {
        toast.error(result.message || 'Failed to add skill')
      }
    })
  }

  const handleSyncFromCache = () => {
    type EntriesCache = { entries?: any[] }

    const projCache = queryClient.getQueryData(['projectEntries']) as EntriesCache | undefined
    const expCache = queryClient.getQueryData(['experienceEntries']) as EntriesCache | undefined

    const expSkills = Array.isArray(expCache?.entries)
      ? expCache.entries.flatMap((exp: any) => exp.skills || [])
      : []

    const projSkills = Array.isArray(projCache?.entries)
      ? projCache.entries.flatMap((proj: any) => proj.technologies || [])
      : []

    const combined = [...expSkills, ...projSkills].map((s) => s.trim()).filter(Boolean)

    const existing = entries?.[0]?.skills || []
    const merged = Array.from(new Set([...existing, ...combined]))

    if (merged.length > 100) {
      toast.warning('Sync would exceed the 100 skill limit.')
      return
    }

    startTransition(async () => {
      const res = await syncSkillsClientSide(combined)
      if (res.success) {
        toast.success('Synced from cache!')
        refetch()
      } else {
        toast.error(res.message || 'Failed to sync')
      }
    })
  }

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleDeleteSkill = async (index: number) => {
    if (!entries?.[0]?.skills) return
    const updated = entries[0].skills.filter((_, i) => i !== index)
    const res = await updateSkillSet(updated)
    if (res.success) {
      toast.success('Skill deleted')
      setEditingSkillIndex(null)
      refetch()
    } else {
      toast.error(res.message || 'Failed to delete')
    }
  }

  const handleSaveEdit = async () => {
    if (editingSkillIndex === null || !entries?.[0]?.skills) return
    const trimmed = editValue.trim()
    const currentSkill = entries[0].skills[editingSkillIndex]

    if (!trimmed || trimmed === currentSkill) {
      setEditingSkillIndex(null)
      return
    }

    const updated = [...entries[0].skills]
    updated[editingSkillIndex] = trimmed
    const deduped = Array.from(new Set(updated)).slice(0, 100)

    const res = await updateSkillSet(deduped)
    if (res.success) {
      toast.success('Skill updated')
      setEditingSkillIndex(null)
      refetch()
    } else {
      toast.error(res.message || 'Failed to update')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">🛠️ Skills</h2>
        <Button
          onClick={handleSyncFromCache}
          className="bg-gradient-primary-2 p-6 flex items-center gap-2 w-1/5"
          disabled={isPending}
        >
          <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
          {isPending ? 'Syncing...' : 'Sync'}
        </Button>
      </div>

      {/* Skill Input */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="e.g. React, Node.js..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
          />
          <Button className="bg-color-tertiary-1 px-4 h-auto" type="button" onClick={handleAddSkill} disabled={isPending}>
            Add
          </Button>
        </div>
      </div>

      {/* Display Skills */}
      {entries.length > 0 ? (
        entries.map((entry, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-6 mb-4 min-h-[300px]">
            <p className='font-semibold my-3 text-xl'>Skills - Click to edit</p>
            {Array.isArray(entry.skills) && entry.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {entry.skills.map((skill, i) =>
                  editingSkillIndex === i ? (
                    <div
                      key={i}
                      className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1"
                    >
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                        className="text-lg bg-transparent border-none focus:ring-0 w-auto px-1"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <Badge
                      key={i}
                      variant="outline"
                      className="rounded-full bg-gray-100 text-gray-800 px-3 py-1 text-lg flex items-center gap-1 cursor-pointer group"
                      onClick={() => {
                        setEditingSkillIndex(i)
                        setEditValue(skill)
                      }}
                    >
                      <span>{skill}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteSkill(i)
                        }}
                        className="ml-1 text-gray-400 hover:text-red-600"
                        aria-label={`Delete ${skill}`}
                      >
                        &times;
                      </button>
                    </Badge>
                  )
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No skills added.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">No skills found.</p>
      )}
    </div>
  )
}
