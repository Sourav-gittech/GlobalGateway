import React, { useState } from "react";
import { MessageSquare, Search, Filter, Mail, CheckCircle, Download } from "lucide-react";
import MessageCard from "../../Components/admin/contact/ContactMessageCard";
import ContactMessageModal from "../../Components/admin/contact/ContactMessageModal";

// Mock data
const MESSAGES = [
  {
    id: "MSG-001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    message: "Hello, I need assistance with my work visa application. I submitted all documents last week but haven't received any update. Could you please check the status? Thank you.",
    date: "2024-12-04",
    time: "10:30 AM",
    status: "new",
  },
  {
    id: "MSG-002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    message: "I have a question about the IELTS preparation course. Is it available for immediate enrollment? What is the duration and fee structure? Please let me know.",
    date: "2024-12-03",
    time: "03:45 PM",
    status: "replied",
  },
];

export default function ContactMessages() {
  const [messages, setMessages] = useState(MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleDelete = (messageId) => {
    setMessages(messages.filter(m => m.id !== messageId));
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === "new").length,
    replied: messages.filter(m => m.status === "replied").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-slate-400">Manage and respond to user inquiries</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center gap-2 w-fit">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-slate-400">Total Messages</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
              <Mail className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm text-slate-400">New Messages</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.new}</div>
        </div>
        <div className="p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-slate-400">Replied</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.replied}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            />
          </div>
          <div className="relative sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400">
              No messages found matching your criteria
            </div>
          ) : (
            filteredMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onView={setSelectedMessage}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <ContactMessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}