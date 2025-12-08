import React, { useState } from "react";
import { 
  MessageSquare,
  Search,
  Filter,
  Mail,
  Calendar,
  Clock,
  Eye,
  Trash2,
  CheckCircle,
  Reply,
  X,
  Send,
  ArrowLeft,
  Download
} from "lucide-react";

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

function StatusBadge({ status }) {
  const config = {
    new: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30", Icon: MessageSquare },
    read: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/30", Icon: Eye },
    replied: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30", Icon: CheckCircle },
  }[status];

  const { Icon } = config;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function MessageModal({ message, onClose, onDelete }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replySubject, setReplySubject] = useState(`Re: Message from ${message.name}`);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;
    
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert(`Reply sent to ${message.email}!\n\nSubject: ${replySubject}\nMessage: ${replyMessage}`);
    setIsSending(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this message from ${message.name}?`)) {
      onDelete(message.id);
      onClose();
    }
  };

  if (isReplying) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div 
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 w-full max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-slate-700/50 p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsReplying(false)} 
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400" />
              </button>
              <h2 className="text-lg sm:text-xl font-semibold text-white">Reply to Message</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-semibold text-sm">
                    {message.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">To: {message.name}</div>
                  <div className="text-xs text-slate-400 truncate">{message.email}</div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
              <input
                type="text"
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Your Reply</label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none"
                placeholder="Type your reply here..."
              />
              <div className="text-xs text-slate-400 mt-1">
                {replyMessage.length} characters
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSendReply}
                disabled={!replyMessage.trim() || isSending}
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSending ? "Sending..." : "Send Reply"}
              </button>
              <button
                onClick={() => setIsReplying(false)}
                className="px-4 py-2.5 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-700/50 p-5 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Message Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-semibold text-lg">
                {message.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{message.name}</h3>
              <p className="text-sm text-slate-400 break-all">{message.email}</p>
              <p className="text-sm text-slate-400 mt-1">{message.phone}</p>
            </div>
            <StatusBadge status={message.status} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50 text-sm text-white leading-relaxed">
              {message.message}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Message ID</label>
              <p className="text-sm text-white font-mono">{message.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Submitted</label>
              <p className="text-sm text-white">{message.date} at {message.time}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsReplying(true)}
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center justify-center gap-2"
            >
              <Reply className="w-4 h-4" />
              Reply
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500/30 text-red-400 text-sm transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageCard({ message, onView }) {
  return (
    <div 
      className="p-4 border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors cursor-pointer" 
      onClick={() => onView(message)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-400 font-semibold text-sm">
              {message.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white mb-1 truncate">{message.name}</div>
            <div className="text-xs text-slate-400 truncate">{message.email}</div>
          </div>
        </div>
        <StatusBadge status={message.status} />
      </div>

      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{message.message}</p>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Calendar className="w-3 h-3" />
        <span>{message.date}</span>
        <span className="mx-1">•</span>
        <Clock className="w-3 h-3" />
        <span>{message.time}</span>
      </div>
    </div>
  );
}

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
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}