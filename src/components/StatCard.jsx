import React from 'react'

function StatCard({ label, value, icon: Icon, color }) {
    return (
        <div className="glass-card stat-card" style={{ '--accent-color': color }}>
            <div className="stat-content">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
            </div>
            {Icon && <div className="stat-icon"><Icon size={24} /></div>}

            <style jsx>{`
        .stat-card {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--accent-color, var(--primary));
        }
        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          font-family: 'Outfit', sans-serif;
        }
        .stat-icon {
          background: rgba(212, 163, 115, 0.1);
          color: var(--accent-color, var(--primary));
          padding: 12px;
          border-radius: 12px;
        }
      `}</style>
        </div>
    )
}

export default StatCard
