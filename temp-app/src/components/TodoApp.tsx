"use client";

import { useState, useEffect } from "react";
import { Todo } from "../types";
import { AddTodo } from "./AddTodo";
import { TodoItem } from "./TodoItem";

export const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedTodos = localStorage.getItem("todo-app-data");
        if (savedTodos) {
            try {
                setTodos(JSON.parse(savedTodos));
            } catch (e) {
                console.error("Failed to parse todos", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever todos change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("todo-app-data", JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const handleAddTodo = (text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const handleToggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDeleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    if (!isLoaded) {
        return null; // or a loading spinner
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50">
            <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                My Todo List
            </h1>

            <AddTodo onAdd={handleAddTodo} />

            <div className="space-y-2">
                {todos.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                        タスクがありません。<br />新しいタスクを追加しましょう！
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={handleToggleTodo}
                                onDelete={handleDeleteTodo}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-6 text-center text-xs text-gray-400">
                {todos.filter(t => !t.completed).length} items left
            </div>
        </div>
    );
};
