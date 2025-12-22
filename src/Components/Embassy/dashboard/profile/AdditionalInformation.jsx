import { Calendar, Clock } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const AdditionalInformation = () => {
  /* ---------------- Static Profile Data ---------------- */
  const [profileData, setProfileData] = useState({
    establishedDate: '2015',
    workingHours: '10:00 - 17:00'
  })

  /* ---------------- Edit State ---------------- */
  const [isEditing, setIsEditing] = useState(false)
  const [workingHoursFrom, setWorkingHoursFrom] = useState('')
  const [workingHoursTo, setWorkingHoursTo] = useState('')

  /* ---------------- Time Slots ---------------- */
  const timeSlots = useMemo(() => {
    const slots = []
    for (let hour = 10; hour <= 17; hour++) {
      const value = `${hour.toString().padStart(2, '0')}:00`
      const label =
        hour === 12
          ? '12:00 PM'
          : hour > 12
          ? `${hour - 12}:00 PM`
          : `${hour}:00 AM`
      slots.push({ value, label })
    }
    return slots
  }, [])

  /* ---------------- Load Existing Data When Editing ---------------- */
  useEffect(() => {
    if (isEditing && profileData?.workingHours) {
      const parts = profileData.workingHours.split(' - ')
      if (parts.length === 2) {
        setWorkingHoursFrom(parts[0])
        setWorkingHoursTo(parts[1])
      }
    }
  }, [isEditing])

  /* ---------------- Filter End Time ---------------- */
  const availableEndSlots = useMemo(() => {
    if (!workingHoursFrom) return []
    return timeSlots.filter(slot => slot.value > workingHoursFrom)
  }, [workingHoursFrom, timeSlots])

  /* ---------------- Save (Static) ---------------- */
  const handleSave = () => {
    if (workingHoursFrom && workingHoursTo) {
      setProfileData(prev => ({
        ...prev,
        workingHours: `${workingHoursFrom} - ${workingHoursTo}`
      }))
    }
    setIsEditing(false)
  }

  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Additional Details
        </h3>

        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* -------- Established -------- */}
        <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-lg border border-pink-100">
          <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
            <Calendar size={20} className="text-pink-600" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Established
            </label>
            <p className="text-gray-900 font-medium">
              {profileData.establishedDate}
            </p>
          </div>
        </div>

        {/* -------- Working Hours -------- */}
        <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg border border-teal-100">
          <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-teal-600" />
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Working Hours
            </label>

            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* From */}
                <select
                  value={workingHoursFrom}
                  onChange={(e) => {
                    setWorkingHoursFrom(e.target.value)
                    setWorkingHoursTo('')
                  }}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">From</option>
                  {timeSlots.map(slot => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>

                {/* To */}
                <select
                  value={workingHoursTo}
                  disabled={!workingHoursFrom}
                  onChange={(e) => setWorkingHoursTo(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {workingHoursFrom ? 'To' : 'Select start time'}
                  </option>
                  {availableEndSlots.map(slot => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-gray-900 font-medium">
                {profileData.workingHours || '—'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalInformation
