import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, incrementVisitor } from '../api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [views, setViews] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then(r => setProfile(r.data));
    incrementVisitor().then(r => setViews(r.data.count));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      {/* Profile card — centered */}
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {profile.photo_url && (
          <img src={profile.photo_url} alt={profile.name}
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', marginBottom: '1rem' }} />
        )}
        <h1>{profile.name}</h1>
        <p style={{ fontSize: '1.1rem', color: '#a0c4ff', marginBottom: '0.5rem' }}>{profile.title}</p>
        <p style={{ maxWidth: 600 }}>{profile.bio}</p>

        {/* Centered contact links */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {profile.email && <a href={`mailto:${profile.email}`} className="tag">📧 {profile.email}</a>}
          {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="tag">🐙 GitHub</a>}
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="tag">💼 LinkedIn</a>}
          {profile.location && <span className="tag">📍 {profile.location}</span>}
        </div>
      </div>

      {/* Visitor badge */}
      {views && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <span className="visitor-badge">👁️ {views.toLocaleString()} portfolio views</span>
        </div>
      )}

      {/* Navigation cards — clicking navigates to pages */}
      <div className="grid-3">
        {[
          { icon: '🚀', label: 'Projects', desc: '4 featured projects across data, AI & automation', path: '/projects' },
          { icon: '🎓', label: 'Education', desc: 'SSLC → HSLC → UG → PG journey', path: '/education' },
          { icon: '🎯', label: 'Interests', desc: 'Hobbies, passions & things that drive me', path: '/interests' },
        ].map(card => (
          <div
            key={card.label}
            className="glass-card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(card.path)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.icon}</div>
            <h3>{card.label}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}