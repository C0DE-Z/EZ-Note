'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Checkbox from './components/ui/checkbox';
import ThemeToggle from './components/ui/theme-toggle';
import Input from './components/ui/input';
import AddButton from './components/ui/add-button';
import SmallInput from './components/ui/small-input';
import DeleteButton from './components/ui/delete-button';
interface TodoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoDesc, setNewTodoDesc] = useState('');

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
        description: newTodoDesc.trim() || 'No description provided',
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
      setNewTodoDesc('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <ThemeToggle />
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Ez Todo</h1>
          <h2 className="text-gray-600 dark:text-gray-400 mb-8">Simple locally cached todo list</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-8" />
          
          <div className="flex flex-col gap-2 items-center justify-center mb-8">
            <div className="flex w-full max-w-md gap-2">
              <Input 
                textinput={newTodoText} 
                setinput={setNewTodoText}
                onEnter={handleAddTodo}
                placeholder="Add a title..."
              />
              <AddButton onClick={handleAddTodo} />
            </div>
            <div className="w-full max-w-md">
              <Input 
                textinput={newTodoDesc} 
                setinput={setNewTodoDesc}
                onEnter={handleAddTodo}
                placeholder="Add a description..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id}>
                <div className="flex items-center">
                  <Checkbox 
                    toggled={todo.completed}
                    setToggled={() => toggleTodo(todo.id)}
                    onToggle={() => {}}
                    Header={todo.title}
                    subText={todo.description}
                  />
                  <DeleteButton onClick={() => handleDeleteTodo(todo.id)} />
                </div>
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
