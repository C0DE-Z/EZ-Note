import { motion } from 'framer-motion';

interface CheckboxProps {
    toggled: boolean;
    onToggle: () => void;
    setToggled: (toggled: boolean) => void;
    subText?: string;
    Header?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ toggled, onToggle, setToggled, subText, Header }) => {
    const handleToggle = () => {
        setToggled(!toggled);
        onToggle();
    };

    return (
        <div className="flex items-center gap-3 w-full max-w-md">
            <div className="relative" onClick={handleToggle}>
                <motion.div
                    initial={false}
                    animate={{
                        backgroundColor: toggled ? '#e5e7eb' : '#000000',
                        borderColor: toggled ? '#d1d5db' : '#000000',
                    }}
                    className="h-6 w-6 rounded cursor-pointer border-2 flex items-center justify-center"
                >
                    <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: toggled ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </motion.svg>
                </motion.div>
            </div>
            <div className="flex flex-col">
                <motion.p
                    animate={{ opacity: toggled ? 0.5 : 1 }}
                    className="font-medium text-sm"
                >
                    {Header}
                </motion.p>
                {subText && (
                    <motion.p
                        animate={{ opacity: toggled ? 0.5 : 1 }}
                        className="text-slate-500 text-sm"
                    >
                        {subText}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default Checkbox