import React, { useState, useCallback } from 'react'
import { Upload, FileType, CheckCircle, Loader2 } from 'lucide-react'
import { processImage, parseAttendanceText } from '../utils/ocr'

function UploadZone({ onDataExtracted }) {
    const [isDragging, setIsDragging] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleFile = async (file) => {
        if (!file || !file.type.startsWith('image/')) return

        setIsProcessing(true)
        setProgress(0)

        try {
            const text = await processImage(file, setProgress)
            const records = parseAttendanceText(text)
            onDataExtracted({ file, text, records })
        } catch (error) {
            console.error("OCR Error:", error)
            alert("이미지 처리 중 오류가 발생했습니다.")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div
            className={`upload-zone glass-card ${isDragging ? 'dragging' : ''} ${isProcessing ? 'processing' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]) }}
        >
            {isProcessing ? (
                <div className="processing-state">
                    <Loader2 className="spinner" size={48} />
                    <h3>이미지 분석 중...</h3>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span>{progress}%</span>
                </div>
            ) : (
                <>
                    <Upload size={48} className="upload-icon" />
                    <h3>기록지 사진 업로드</h3>
                    <p>도트 프린트 근무기록지 사진을 여기에 드래그하거나 클릭하여 업로드하세요</p>
                    <input
                        type="file"
                        id="file-upload"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                    <label htmlFor="file-upload" className="primary-btn">파일 선택하기</label>
                </>
            )}

            <style jsx>{`
        .upload-zone {
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
          border: 2px dashed rgba(74, 52, 39, 0.2);
          transition: var(--transition);
          min-height: 350px;
          justify-content: center;
        }
        .upload-zone.dragging {
          border-color: var(--primary);
          background: rgba(212, 163, 115, 0.1);
        }
        .upload-icon { color: var(--primary); }
        .primary-btn {
          background-color: var(--primary);
          color: white;
          padding: 12px 32px;
          border-radius: var(--radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        .primary-btn:hover {
          background-color: var(--primary-light);
          transform: translateY(-2px);
        }
        .processing-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 300px;
        }
        .spinner {
          animation: spin 2s linear infinite;
          color: var(--primary);
        }
        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0,0,0,0.05);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--primary);
          transition: width 0.3s ease;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}

export default UploadZone
