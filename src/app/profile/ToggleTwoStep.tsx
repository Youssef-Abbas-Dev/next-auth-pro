"use client";
import { toggleTwoStepAction } from "@/actions/auth.action";
import { useState } from "react";
import { toast } from 'react-hot-toast';

interface ToggleTwoStepProps {
    userId: string;
    isTwoStepEnabled: boolean;
}


const ToggleTwoStep = ({ userId, isTwoStepEnabled }: ToggleTwoStepProps) => {
    const [isEnabled, setIsEnabled] = useState(isTwoStepEnabled);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        toggleTwoStepAction(userId, isEnabled)
          .then(() => toast.success(`two step ${isEnabled ? "enabled": "disabled"} successfullyy`))
          .catch(() => toast.error("Something went wrong, try again"));
    }

    return (
        <form onSubmit={formSubmitHandler} className="mt-7 border-2 border-gray-400 rounded p-4">
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="twoStep"
                    checked={isEnabled}
                    onChange={(e) => setIsEnabled(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                />
                <label className="ms-2 text-sm font-medium text-blue-900" htmlFor="twoStep">
                    Enable/Disable 2 Step
                </label>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-xl w-full text-white cursor-pointer rounded p-2" type="submit">
                Save
            </button>
        </form>
    )
}

export default ToggleTwoStep