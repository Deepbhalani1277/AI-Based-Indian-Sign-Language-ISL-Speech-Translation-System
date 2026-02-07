import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const TranslationProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: 'all',
        dateRange: 'all',
        searchQuery: ''
    });

    // Fetch translation history from database
    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/translation-history?limit=50`);
            if (response.ok) {
                const data = await response.json();
                // Transform database format to frontend format
                const transformedData = data.map(item => ({
                    id: item.id.toString(),
                    date: new Date(item.created_at),
                    type: item.type === 'sign-to-speech' ? 'ISL to Speech' : 'Speech to ISL',
                    inputMethod: item.type === 'sign-to-speech' ? 'Camera' : 'Voice/Text',
                    output: item.output_data || item.input_data || 'N/A',
                    language: 'English', // Default, can be enhanced later
                    status: item.confidence_score > 0.7 ? 'Success' : item.confidence_score > 0.4 ? 'Partial' : 'Success',
                    confidence: item.confidence_score,
                    duration: item.duration_ms
                }));
                setHistory(transformedData);
            }
        } catch (error) {
            console.error('Error fetching translation history:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const addTranslation = (translation) => {
        // Optimistically add to UI (it's already saved to DB by the API)
        const newTranslation = {
            id: Date.now().toString(),
            date: new Date(),
            ...translation
        };
        setHistory([newTranslation, ...history]);
    };

    const deleteTranslation = async (id) => {
        // TODO: Add delete endpoint in backend
        // For now, just remove from local state
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
    };

    const clearAllHistory = async () => {
        // TODO: Add clear all endpoint in backend
        // For now, just clear local state
        setHistory([]);
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
        loading,
        filters,
        setFilters,
        addTranslation,
        deleteTranslation,
        clearAllHistory,
        getFilteredHistory,
        refreshHistory: fetchHistory
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
