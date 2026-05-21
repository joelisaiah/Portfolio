import { useEffect, useState } from 'react';
import { getEducation } from '../api';

const LEVEL_ICONS = {
  sslc: '📚',
  hslc: '🏫',
  ug: '🎓',
  pg: '🎯',
};

const LEVEL_LABELS = {
  sslc: 'SSLC — 10th Standard',
  hslc: 'HSLC — 12th Standard',
  ug: 'Under Graduate',
  pg: 'Post Graduate',
};

export default function Education() {
  const [education, setEducation] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { getEducation().then(r => setEducation(r.data)); }, []);

  return (
    <div>
      <h2>Education</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Click on any level to see details.</p>

      <div className="grid-2">
        {education.map(edu => (
          <div
            key={edu.id}
            className="glass-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelected(edu)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {LEVEL_ICONS[edu.level] || '📖'}
            </div>
            <h3>{LEVEL_LABELS[edu.level]}</h3>
            <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{edu.year_of_passing}</p>
          </div>
        ))}
      </div>

      {/* Dialog overlay */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '1rem',
          }}
        >
          {/* Dialog box — stop click from closing when clicking inside */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(20, 30, 60, 0.92)',
              border: '1px solid rgba(160,196,255,0.3)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: 32,
                height: 32,
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {/* Icon + title */}
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {LEVEL_ICONS[selected.level]}
            </div>
            <h2 style={{ marginBottom: '1.5rem', color: '#a0c4ff' }}>
              {LEVEL_LABELS[selected.level]}
            </h2>

            {/* Details */}
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              {[
                { label: 'Institution', value: selected.institution },
                { label: 'Board / University', value: selected.board_or_university },
                { label: 'Year of Passing', value: selected.year_of_passing },
                { label: 'Grade / Percentage', value: selected.grade_or_percentage },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.6rem',
                  gap: '1rem',
                }}>
                  <span style={{ opacity: 0.6, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{row.label}</span>
                  <span style={{ fontWeight: 500, textAlign: 'right' }}>{row.value}</span>
                </div>
              ))}
              {selected.description && (
                <p style={{ marginTop: '0.5rem', opacity: 0.8, lineHeight: 1.7 }}>
                  {selected.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}