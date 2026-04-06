"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Trash2, X, Briefcase } from "lucide-react"
import { createStaff, deleteStaff } from "@/app/actions/staff"
import { Teacher } from "@prisma/client"

export default function StaffClient({ initialStaff }: { initialStaff: Teacher[] }) {
  const [staff, setStaff] = useState<Teacher[]>(initialStaff)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.employeeId.toLowerCase().includes(search.toLowerCase())
  )

  async function handleAddStaff(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await createStaff(formData)
    if (res.success && res.staffMember) {
      setStaff([res.staffMember, ...staff])
      setIsModalOpen(false)
    } else {
      alert("Error: " + res.error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this staff member?")) return
    const res = await deleteStaff(id)
    if (res.success) {
      setStaff(staff.filter(s => s.id !== id))
    } else {
      alert("Error: " + res.error)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-500">Staff Management</h1>
          <p className="text-foreground/60 text-sm mt-1">Manage teachers, accountants, and other staff members.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(var(--brand-500),0.3)]"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Staff</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-panel p-2 rounded-xl flex items-center gap-3">
        <Search className="w-5 h-5 text-foreground/40 ml-2" />
        <input 
          type="text" 
          placeholder="Search by Name or Employee ID..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-foreground placeholder:text-foreground/40 py-1"
        />
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-foreground/80 text-sm font-semibold">
                <th className="p-4">Emp ID</th>
                <th className="p-4">Staff Member</th>
                <th className="p-4 hidden sm:table-cell">Contact</th>
                <th className="p-4 hidden md:table-cell">Specialization</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-foreground/50">No staff found.</td>
                  </tr>
                ) : (
                  filteredStaff.map((member) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      key={member.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 font-mono text-sm text-brand-300">{member.employeeId}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-xs text-foreground/50">{member.email || "No email"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-foreground/70 hidden sm:table-cell">{member.phone || "N/A"}</td>
                      <td className="p-4 text-sm text-foreground/70 hidden md:table-cell">
                        {member.specialization ? (
                          <span className="bg-brand-500/10 text-brand-300 px-2 py-1 rounded-md text-xs border border-brand-500/20">
                            {member.specialization}
                          </span>
                        ) : "N/A"}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <button onClick={() => handleDelete(member.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add New Staff</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddStaff} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-foreground/70 ml-1">Full Name *</label>
                    <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-brand-500 transition-colors" placeholder="e.g. Jane Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-foreground/70 ml-1">Employee ID *</label>
                    <input required name="employeeId" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-brand-500 transition-colors" placeholder="e.g. EMP-105" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-foreground/70 ml-1">Email *</label>
                    <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-brand-500 transition-colors" placeholder="teacher@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-foreground/70 ml-1">Phone</label>
                    <input name="phone" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-brand-500 transition-colors" placeholder="+1..." />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-foreground/70 ml-1">Specialization</label>
                  <input name="specialization" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-brand-500 transition-colors" placeholder="e.g. Mathematics, Physics..." />
                </div>

                <button type="submit" className="w-full bg-brand-500 hover:bg-brand-400 text-white font-bold py-3 rounded-xl transition-colors shadow-lg mt-4">
                  Create Staff Member
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
