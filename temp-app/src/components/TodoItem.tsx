import { Todo } from "../types";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <li className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 overflow-hidden">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500 border-gray-300 cursor-pointer accent-pink-500"
                />
                <span
                    className={`text-lg truncate cursor-pointer select-none ${todo.completed ? "text-gray-400 line-through" : "text-gray-800"
                        }`}
                    onClick={() => onToggle(todo.id)}
                >
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="ml-2 px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
                aria-label="Delete todo"
            >
                削除
            </button>
        </li>
    );
};
