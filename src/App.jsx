import React, { useState, useEffect } from 'react'
import { LayoutDashboard, Users, Clock, Upload, Coffee } from 'lucide-react'
import UploadZone from './components/UploadZone'
import AttendanceTable from './components/AttendanceTable'
import StatCard from './components/StatCard'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [attendanceData, setAttendanceData] = useState([])
  const [employees, setEmployees] = useState([
    { id: 1, name: '유선우', totalHours: 59.5 },
    { id: 2, name: '김민준', totalHours: 42.0 },
    { id: 3, name: '이서윤', totalHours: 38.5 }
  ])

  const handleDataExtracted = ({ records }) => {
    // In a real app, we'd associate this with an employee
    setAttendanceData(prev => [...prev, ...records])
    setActiveTab('upload-result')
  }

  const totalMonthlyHours = employees.reduce((acc, emp) => acc + emp.totalHours, 0) +
    attendanceData.reduce((acc, rec) => acc + rec.subtotal, 0)

  return (
    <div className="app-container">
      <nav className="glass-card main-nav">
        <div className="logo">
          <Coffee size={24} color="var(--primary)" />
          <span>Cafe Admin</span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />대시보드
          </button>
          <button
            className={`nav-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            <Users size={20} />직원관리
          </button>
          <button
            className={`nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={20} />기록업로드
          </button>
        </div>
      </nav>

      <main className="container animate-fade-in">
        {activeTab === 'dashboard' && (
          <Dashboard totalHours={totalMonthlyHours} employeeCount={employees.length} />
        )}
        {activeTab === 'employees' && (
          <EmployeeList employees={employees} />
        )}
        {activeTab === 'upload' && (
          <UploadView onDataExtracted={handleDataExtracted} />
        )}
        {activeTab === 'upload-result' && (
          <div className="result-view">
            <div className="header">
              <h2>추출된 근무 기록</h2>
              <button className="primary" onClick={() => setActiveTab('dashboard')}>확인 및 저장</button>
            </div>
            <AttendanceTable
              records={attendanceData}
              onUpdate={() => { }}
              onDelete={(idx) => setAttendanceData(prev => prev.filter((_, i) => i !== idx))}
            />
          </div>
        )}
      </main>

      <style jsx>{`
        .main-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 2rem;
          margin: 1rem 2rem;
          position: sticky;
          top: 1rem;
          z-index: 1000;
        }
        .logo { display: flex; align-items: center; gap: 12px; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.4rem; color: var(--primary); }
        .nav-links { display: flex; gap: 8px; }
        .nav-btn { background: transparent; color: var(--text-muted); padding: 8px 16px; border-radius: 12px; font-size: 0.95rem; }
        .nav-btn:hover { background: rgba(212, 163, 115, 0.1); color: var(--primary); }
        .nav-btn.active { background: var(--primary); color: white; }
        .result-view .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
      `}</style>
    </div>
  )
}

function Dashboard({ totalHours, employeeCount }) {
  return (
    <div className="dashboard">
      <h2 style={{ marginBottom: '2rem' }}>실시간 근무 현황</h2>
      <div className="stats-grid">
        <StatCard label="이번 달 전체 근무 시간" value={`${totalHours.toFixed(1)}h`} icon={Clock} color="#d4a373" />
        <StatCard label="관리 중인 직원" value={`${employeeCount}명`} icon={Users} color="#6d4c3d" />
        <StatCard label="오늘의 예상 인건비" value="₩1.2M" icon={Coffee} color="#ccd5ae" />
      </div>
      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
    </div>
  )
}

function EmployeeList({ employees }) {
  return (
    <div className="employee-list">
      <h2 style={{ marginBottom: '2rem' }}>직원별 근무 요약</h2>
      <div className="list-container glass-card">
        {employees.map(emp => (
          <div key={emp.id} className="emp-item">
            <Users size={20} color="var(--primary)" />
            <span className="name">{emp.name}</span>
            <span className="hours">{emp.totalHours}시간</span>
            <button className="text-btn">상세보기</button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .list-container { padding: 1rem; }
        .emp-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .emp-item:last-child { border-bottom: none; }
        .name { font-weight: 600; flex: 1; }
        .hours { color: var(--text-muted); }
        .text-btn { background: transparent; color: var(--primary); font-size: 0.9rem; padding: 4px 8px; }
      `}</style>
    </div>
  )
}

function UploadView({ onDataExtracted }) {
  return (
    <div className="upload-view">
      <h2 style={{ marginBottom: '2.5rem' }}>새로운 근무기록지 업로드</h2>
      <UploadZone onDataExtracted={onDataExtracted} />
    </div>
  )
}

export default App
