import React from 'react'
import { Ban, CircleCheckBig, Loader2, Trash2 } from 'lucide-react';

const HolidayRow = ({ holiday, deletingId }) => {

    const formatHolidayDate = (dateStr) => {
        const [, month, day] = dateStr.match(/month:(\d+),day:(\d+)/) || [];
        if (!month || !day) return 'Invalid date';

        const date = new Date(2024, parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        });
    };

    const handleDeleteHoliday = async (id, description) => {
        try {
            const result = await getSweetAlert(
                'Delete Holiday?',
                `Remove "${description}" from the calendar?`,
                'warning',
                true
            );

            if (!result || !result.isConfirmed) return;

            setDeletingId(id);
            await new Promise(resolve => setTimeout(resolve, 500));

            setHolidays(holidays.filter(h => h.id !== id));
            getSweetAlert('Deleted', 'Holiday removed successfully', 'success');
        } catch (error) {
            console.error('Error deleting holiday:', error);
            getSweetAlert('Error', 'Failed to delete holiday', 'error');
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div
            className="flex items-center justify-between gap-3 p-3 bg-slate-700/30 border border-slate-600/40 rounded-lg hover:border-slate-500/50 hover:bg-slate-700/40 transition-all group"
        >
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                    {holiday?.event_name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                    {formatHolidayDate(holiday?.date)} (Annual)
                </p>
            </div>
            <button
                onClick={() => handleDeleteHoliday(holiday?.id, holiday?.event_name)}
                disabled={deletingId === holiday?.id}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                title="Delete"
            >
                {deletingId === holiday?.id ? (
                    <Ban className="w-4 h-4 animate-spin" />
                ) : (
                    <CircleCheckBig className="w-4 h-4 bg:text-green-400 hover:bg-green-500/10" />
                )}
            </button>
            <button
                onClick={() => handleDeleteHoliday(holiday?.id, holiday?.event_name)}
                disabled={deletingId === holiday?.id}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                title="Delete"
            >
                {deletingId === holiday?.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Trash2 className="w-4 h-4" />
                )}
            </button>
        </div>
    )
}

export default HolidayRow