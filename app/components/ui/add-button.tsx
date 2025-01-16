'use client';
import { motion } from 'framer-motion';

interface AddButtonProps {
    onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="relative w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl shadow-lg flex items-center justify-center text-2xl font-bold hover:shadow-xl transition-shadow"
        >
            +
        </motion.button>
    );
};

export default AddButton;
