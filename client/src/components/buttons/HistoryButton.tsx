import { ClockIcon } from "@heroicons/react/24/outline"


const HistoryButton = () => {
    return (
        <button className="flex justify-center items-center p-3 mx-6 border-2 border-secondary rounded-lg bg-white shadow-lg">
            <ClockIcon className="w-5 h-5 text-secondary"/>
            <span className="text-secondary font-semibold ml-1">History</span>
        </button>
    )
}

export default HistoryButton;