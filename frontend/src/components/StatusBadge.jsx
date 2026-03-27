import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const configs = {
        Paid: {
            bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            icon: <CheckCircle size={14} className="mr-1.5" />,
            label: 'Paid'
        },
        Unpaid: {
            bg: 'bg-rose-50 text-rose-700 border-rose-100',
            icon: <AlertCircle size={14} className="mr-1.5" />,
            label: 'Unpaid'
        },
        Pending: {
            bg: 'bg-amber-50 text-amber-700 border-amber-100',
            icon: <Clock size={14} className="mr-1.5" />,
            label: 'Pending'
        }
    };

    const config = configs[status] || configs.Pending;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold font-outfit uppercase tracking-wider ${config.bg}`}>
            {config.icon}
            {config.label}
        </span>
    );
};

export default StatusBadge;
