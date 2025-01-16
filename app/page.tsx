'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Checkbox from './components/ui/checkbox';
import ThemeToggle from './components/ui/theme-toggle';
import Input from './components/ui/input';
import AddButton from './components/ui/add-button';
import SmallInput from './components/ui/small-input';
interface TodoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  // Load todos from cookies on mount
  useEffect(() => {
    const savedTodos = Cookies.get('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to cookies whenever they change
  useEffect(() => {
    Cookies.set('todos', JSON.stringify(todos), { expires: 365 });
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        title: newTodoText,
        description: 'Added: ' + new Date().toLocaleDateString(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <ThemeToggle />
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Ez Todo</h1>
          <h2 className="text-gray-600 dark:text-gray-400 mb-8">Simple locally cached todo list</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-8" />
          
          <div className="flex gap-2 items-center justify-center mb-8">
            <div className="flex-1 max-w-md">
              <Input 
                textinput={newTodoText} 
                setinput={setNewTodoText}
                onEnter={handleAddTodo}
              />
            </div>
            <AddButton onClick={handleAddTodo} />
          </div>
          <SmallInput  textinput={newTodoText} 
                setinput={setNewTodoText}
                onEnter={handleAddTodo}/>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id}>
                <Checkbox 
                  toggled={todo.completed}
                  setToggled={() => toggleTodo(todo.id)}
                  onToggle={() => {}}
                  Header={todo.title}
                  subText={todo.description}
                />
                {todo.id !== todos[todos.length - 1].id && (
                  <div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Made with ❤️ by C0DE-Z
        </div>
      </div>
    </div>
  );
}
