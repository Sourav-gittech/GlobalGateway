import React from 'react'
import { FileText, BookOpen } from "lucide-react";
import { useDispatch } from 'react-redux';
import ApplicationDetails from './userDetails/user-row/ApplicationDetails';
import CourseDetails from './userDetails/user-row/CourseDetails';
import AdditionalInfo from './userDetails/user-row/AdditionalInfo';
import { useApplicationsByUser } from '../../../tanstack/query/getApplicationsByUser';

const UserRowExpand = ({ user }) => {
    // console.log('User Data', user);
    const dispatch = useDispatch();
    const { data: application, isLoading: isApplicationLoading, isError: isApplicationError, error } = useApplicationsByUser(user?.id);

    return (
        <tr className="bg-slate-700/10 border-b border-slate-700/50">
            <td colSpan="7" className="px-4 sm:px-6 py-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Visa Applications */}
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <h4 className="text-sm font-semibold text-white">Visa Applications</h4>
                        </div>

                        {application?.length > 0 ? (
                            <div className="space-y-2">
                                {application?.map((visa, idx) => (
                                    <ApplicationDetails key={idx} visa={visa} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-sm text-slate-400 italic">No visa applications</div>
                        )}
                    </div>

                    {/* Course Purchases */}
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-green-400" />
                            <h4 className="text-sm font-semibold text-white">Course Purchases</h4>
                        </div>

                        {user?.coursePurchases?.length > 0 ? (
                            <CourseDetails user={user} />
                        ) : (
                            <div className="text-sm text-slate-400 italic">No course purchases</div>
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className="md:col-span-2 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <h4 className="text-sm font-semibold text-white mb-3">Account Information</h4>
                        <AdditionalInfo user={user} />
                    </div>

                </div>
            </td>
        </tr>
    )
}

export default UserRowExpand