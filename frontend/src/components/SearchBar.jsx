import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ onSearch, onFilter, filters }) => {
    return (
        <div className="card p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by customer or invoice #" 
                    className="input-field pl-12 h-12"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <div className="flex items-center gap-2 pr-4 border-r border-slate-100 mr-2 shrink-0">
                    <Filter className="text-slate-400" size={18} />
                    <span className="text-sm font-semibold text-slate-500 font-outfit uppercase tracking-wider">Filter</span>
                </div>
                
                {['All', 'Paid', 'Unpaid', 'Pending'].map((status) => (
                    <button
                        key={status}
                        onClick={() => onFilter(status)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 border font-outfit uppercase tracking-widest ${
                            filters.status === status 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
