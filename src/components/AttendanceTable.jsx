import React from 'react'
import { Edit2, Trash2, Check } from 'lucide-react'

function AttendanceTable({ records, onUpdate, onDelete }) {
    if (!records || records.length === 0) return null;

    return (
        <div className="table-container glass-card">
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>출근 시간</th>
                        <th>퇴근 시간</th>
                        <th>근무 시간 (소계)</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {records.sort((a, b) => a.date - b.date).map((record, index) => (
                        <tr key={index}>
                            <td>12월 {record.date}일</td>
                            <td>{record.start}</td>
                            <td>{record.end}</td>
                            <td>{record.subtotal}h</td>
                            <td className="actions">
                                <button className="icon-btn" onClick={() => onUpdate(index)}><Edit2 size={16} /></button>
                                <button className="icon-btn delete" onClick={() => onDelete(index)}><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
        .table-container {
          overflow-x: auto;
          margin-top: 2rem;
          padding: 1rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th {
          padding: 1rem;
          color: var(--text-muted);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          border-bottom: 1px solid var(--border);
        }
        td {
          padding: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .actions {
          display: flex;
          gap: 8px;
        }
        .icon-btn {
          background: transparent;
          color: var(--text-muted);
          padding: 6px;
        }
        .icon-btn:hover {
          color: var(--primary);
          background: rgba(0,0,0,0.04);
        }
        .icon-btn.delete:hover {
          color: #e63946;
          background: rgba(230, 57, 70, 0.05);
        }
      `}</style>
        </div>
    )
}

export default AttendanceTable
