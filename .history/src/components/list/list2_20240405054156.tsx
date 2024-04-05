import React, { useState, useEffect } from "react";
import './list.css'
import { FaCheck } from 'react-icons/fa';

interface Task {
    name: string;
    description?: string;
}

const List: React.FC = () => {

    const [expandedIndex, setExpandedIndex] = useState<number[]>([]);
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const [addNote, setAddNote] = useState<boolean>(false);
    const [input, setInput] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [deleteNoteSelected, setDeleteNoteSelected] = useState<boolean>(false);
    const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
    const [finalDeletion, setFinalDeletion] = useState<boolean>(false);
    const [hoveredCheck, setHoveredCheck] = useState<number | null>(null);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    useEffect(() => {
        const filteredTasks = tasks.filter(task =>
            task.name.toLowerCase().includes(searchInput.toLowerCase())
        );

        const matchingTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(searchInput.toLowerCase()));
        const nonMatchingTasks = tasks.filter(task => !matchingTasks.includes(task));

        const sortedTasks = [...matchingTasks, ...nonMatchingTasks];

        setTasks(sortedTasks);
    }, [searchInput]);

    const addCompleteTask = (index: number) => {
        const taskIndex = completedTasks.findIndex(taskIndex => taskIndex === index);
    
        if (taskIndex !== -1) {
            setCompletedTasks(prevTasks => prevTasks.filter((_, i) => i !== taskIndex));
        } else {
            setCompletedTasks(prevTasks => [...prevTasks, index]);
        }
    }

    const handleCheckHover = (index: number) => {
        setHoveredCheck(index)
    }

    const handleCheckLeave = () => {
        setHoveredCheck(null)
    }

    const checkStyle = (index: number) => {
        const hovered = hoveredCheck === index;

        return {
            color: hovered ? 'rgb(0, 200, 0)' : 'white',
            transition:'all 0.3s ease-in'
        }
    }

    const markAsCompletedStyle = (index: number) => {
        const hovered = hoveredCheck === index;

        return {
            transition:'all 0.3s ease-in-out',
            opacity: hovered ? 1 : 0,
            zIndex: hovered ? 2 : 1
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isDescription: boolean) => {
        if(isDescription){
            setDescription(event.target.value)
        } else {
            setInput(event.target.value)
        }
    }

    const handleFinalDeletion = (index: number) => {
        setFinalDeletion(true);
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setDeleteNoteSelected(false)
        setNoteToDelete(null)
    };

    useEffect(() => {
        setFinalDeletion(false)
    }, [finalDeletion])

    const handleCancelDeletion = () => {
        setFinalDeletion(false)
        setDeleteNoteSelected(false)
        setNoteToDelete(null)
    }
    
    const handleDeleteClick = () => {
        if(tasks.length === 0){
            window.alert('There are no tasks to delete')
            return
        }
        setDeleteNoteSelected(true)
    }

    const handleCancelSubmission = () => {
        setAddNote(false)
    }

    const handleMouseEnter = (index: number) => {
        setIsHovered(index)
    }

    const handleMouseLeave = () => {
        setIsHovered(null)
    }

    const handleContentClick = (index: number) => {
        const indexInExpandedIndex = expandedIndex.findIndex(idx => idx === index);

        if(deleteNoteSelected){
            setNoteToDelete(index)
            console.log('we have the note to delete')
        } else if (indexInExpandedIndex !== -1) {
            setExpandedIndex(prevIndex => prevIndex.filter((_, i) => i !== indexInExpandedIndex));
            console.log('already in there');
        } else {
            setExpandedIndex(prevIndex => [...prevIndex, index]);
        }
    }

    const taskStyle = (index: number) => {
        const hovered = isHovered === index;
        const noteDelete =  deleteNoteSelected && hovered;
        const completed = completedTasks.includes(index)
    
        return {
            transition: 'background-color 0.3s ease-in, border-bottom 0.3s ease-in, border 0.3s ease-in, width 0.3s ease-in 1.3s',
            backgroundColor: noteDelete ? '#540000' :completed? 'rgb(17, 153, 17)' : hovered ? '#005672' : 'transparent',
        };
    };

    const contentStyle = (index: number, description?: string) => {
        const isExpanded = expandedIndex.includes(index);
        const wordCount = description ? description.split(" ").length : 0;
        const height = isExpanded ? `${Math.max((wordCount / 5) * 20, 20)}px` : '0';
    
        return {
            height: height,
            transition: isExpanded ? 'height 0.2s ease-in, opacity 0.5s ease-in' : 'height 0.2s ease-in, opacity 0.5s ease-in 0.3s',
            overflow: isExpanded ? 'scroll' : 'hidden',
        };
    };

    const handleAddNote = () => {
        if(!deleteNoteSelected){
            setAddNote(true)
        }
    }

    const handleSubmitNote = () => {
        if(input === null) {
            window.alert('Please name your task before submitting!')
            return
        }

        const newTask: Task = {
            name: input,
            description: description
        }

        setTasks(() => [...tasks, newTask])
        setAddNote(false)
    }

    const finalWarningStyle = () => {
        const inView = noteToDelete !== null
        
        return {
            transform: inView ? 'scale(1) translateX(-50%)' : 'scale(0) translateX(-50%)',
            transition: 'all 0.3s ease-in'
        }
    }

    return (
        <>
            <div className="main-list-container">
                {/* Your JSX goes here */}
            </div>
        </>
    )
}

export default List;
