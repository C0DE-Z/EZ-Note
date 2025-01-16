'use client';

interface InputProps {
  textinput: string;
  setinput: (value: string) => void;
  onEnter?: () => void;
}

function Input({ textinput, setinput, onEnter }: InputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <input 
      value={textinput}
      onChange={(e) => setinput(e.target.value)}
      onKeyPress={handleKeyPress}
      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-white text-sm border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
      placeholder="Add a new todo..." 
    />
  );
}

export default Input;