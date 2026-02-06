import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext(null);

// Mock translation history data
const mockHistory = [
    {
        id: '1',
        date: new Date('2026-02-06T10:30:00'),
        type: 'ISL to Speech',
        inputMethod: 'Camera',
        output: 'Hello, how are you?',
        language: 'English',
        status: 'Success'
    },
    {
        id: '2',
        date: new Date('2026-02-06T14:15:00'),
        type: 'Speech to ISL',
        inputMethod: 'Voice',
        output: 'Thank you very much',
        language: 'English',
        status: 'Success'
    },
    {
        id: '3',
        date: new Date('2026-02-05T16:45:00'),
        type: 'ISL to Speech',
        inputMethod: 'Camera',
        output: 'Good morning',
        language: 'English',
        status: 'Success'
    },
    {
        id: '4',
        date: new Date('2026-02-05T11:20:00'),
        type: 'Speech to ISL',
        inputMethod: 'Text',
        output: 'Welcome to our event',
        language: 'English',
        status: 'Partial'
    },
    {
        id: '5',
        date: new Date('2026-02-04T09:10:00'),
        type: 'ISL to Speech',
        inputMethod: 'Camera',
        output: 'Please help me',
        language: 'English',
        status: 'Success'
    }
];

export const TranslationProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [filters, setFilters] = useState({
        type: 'all',
        dateRange: 'all',
        searchQuery: ''
    });

    useEffect(() => {
        // Load history from localStorage or use mock data
        const storedHistory = localStorage.getItem('isl_translation_history');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        } else {
            setHistory(mockHistory);
            localStorage.setItem('isl_translation_history', JSON.stringify(mockHistory));
        }
    }, []);

    const addTranslation = (translation) => {
        const newTranslation = {
            id: Date.now().toString(),
            date: new Date(),
            ...translation
        };
        const updatedHistory = [newTranslation, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('isl_translation_history', JSON.stringify(updatedHistory));
    };

    const deleteTranslation = (id) => {
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
        localStorage.setItem('isl_translation_history', JSON.stringify(updatedHistory));
    };

    const clearAllHistory = () => {
        setHistory([]);
        localStorage.removeItem('isl_translation_history');
    };

    const getFilteredHistory = () => {
        let filtered = [...history];

        // Filter by type
        if (filters.type !== 'all') {
            filtered = filtered.filter(item => item.type === filters.type);
        }

        // Filter by search query
        if (filters.searchQuery) {
            filtered = filtered.filter(item =>
                item.output.toLowerCase().includes(filters.searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const value = {
        history,
        filters,
        setFilters,
        addTranslation,
        deleteTranslation,
        clearAllHistory,
        getFilteredHistory
    };

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};
