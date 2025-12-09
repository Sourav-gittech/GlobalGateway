import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import MessageCard from "../../Components/admin/contact/ContactMessageCard";
import ContactMessageModal from "../../Components/admin/contact/ContactMessageModal";
import ContactHeader from "../../Components/admin/contact/ContactHeader";
import ContactStats from "../../Components/admin/contact/ContactStats";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContactMessages } from "../../Redux/Slice/contactSlice";
import getSweetAlert from "../../util/alert/sweetAlert";

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

const ContactMessages = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState(MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { contactLoading, contactData, contactError } = useSelector(state => state.contact);

  const handleDelete = (messageId) => {
    setMessages(messages.filter(m => m.id !== messageId));
  };

  const filteredMessages = contactData?.filter(msg => {
    
    const matchesSearch =
      msg?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg?.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: contactData.length,
    new: contactData.filter(m => m.status === "pending").length,
    replied: contactData.filter(m => m.status === "replied").length,
  };

  useEffect(() => {
    dispatch(fetchAllContactMessages())
      .then(res => {
        // console.log('Response for fetching contact data',res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, [dispatch]);

  // console.log('Contact masages', contactData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <ContactHeader />

      {/* Stats */}
      <ContactStats stats={stats} />

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
              <option value="pending">Pending</option>
              <option value="replied">Replied</option>
              <option value="rejected">Rejected</option>
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

export default ContactMessages;