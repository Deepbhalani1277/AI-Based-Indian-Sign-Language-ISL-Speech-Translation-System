import React, { useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import ConfirmModal from '../common/ConfirmModal';
import './TranslationHistory.css';

const TranslationHistory = () => {
    const { getFilteredHistory, filters, setFilters, deleteTranslation, loading } = useTranslation();
    const [deleteId, setDeleteId] = useState(null);
    const history = getFilteredHistory();

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Success':
                return 'status-success';
            case 'Partial':
                return 'status-partial';
            case 'Failed':
                return 'status-failed';
            default:
                return '';
        }
    };

    const handleDelete = () => {
        if (deleteId) {
            deleteTranslation(deleteId);
            setDeleteId(null);
        }
    };

    if (loading) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <h3>Loading translation history...</h3>
                <p>Please wait while we fetch your data.</p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3>No translations yet</h3>
                <p>Start your first translation to see it here.</p>
            </div>
        );
    }

    return (
        <div className="translation-history">
            {/* Filters */}
            <div className="history-filters">
                <div className="filter-group">
                    <label>Type:</label>
                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option value="all">All Types</option>
                        <option value="ISL to Speech">ISL to Speech</option>
                        <option value="Speech to ISL">Speech to ISL</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Search:</label>
                    <input
                        type="text"
                        placeholder="Search translations..."
                        value={filters.searchQuery}
                        onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    />
                </div>
            </div>

            {/* History Table */}
            <div className="history-table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Type</th>
                            <th>Input Method</th>
                            <th>Output</th>
                            <th>Language</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td>{formatDate(item.date)}</td>
                                <td>
                                    <span className="type-badge">{item.type}</span>
                                </td>
                                <td>{item.inputMethod}</td>
                                <td className="output-text">{item.output}</td>
                                <td>{item.language}</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn-icon"
                                            title="View Details"
                                            onClick={() => alert('View details feature coming soon!')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="btn-icon btn-delete"
                                            title="Delete"
                                            onClick={() => setDeleteId(item.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <ConfirmModal
                    title="Delete Translation"
                    message="Are you sure you want to delete this translation record?"
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </div>
    );
};

export default TranslationHistory;
