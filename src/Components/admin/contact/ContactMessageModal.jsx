import React, { useState } from 'react'
import { Trash2, Reply, X, Send, ArrowLeft } from "lucide-react";
import ContactStatusBadge from './ContactStatusBadge';
import ReplyModal from './ReplyModal';

const ContactMessageModal = ({ message, onClose, onDelete }) => {
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
            <ReplyModal onClose={onClose} setIsReplying={setIsReplying} message={message} setReplySubject={setReplySubject} setReplyMessage={setReplyMessage}/>
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
                        <ContactStatusBadge status={message.status} />
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
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactMessageModal