import { useState, FormEvent } from "react";

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="新しいタスクを入力..."
                className="flex-1 px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-gray-700 placeholder-gray-400 bg-white"
            />
            <button
                type="submit"
                disabled={!text.trim()}
                className="px-6 py-2 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
                追加
            </button>
        </form>
    );
};
