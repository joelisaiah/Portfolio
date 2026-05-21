import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../api';

const CATEGORY_ICONS = {
  data: '📊',
  automation: '🤖',
  ai: '🧠',
  web: '🌐',
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { getProjects().then(r => setProjects(r.data)); }, []);

  return (
    <div>
      <h2>Projects</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Click on any project to learn more.</p>
      <div className="grid-2">
        {projects.map(p => (
          <div
            key={p.slug}
            className="glass-card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/projects/${p.slug}`)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {CATEGORY_ICONS[p.category] || '💻'}
            </div>
            <h3>{p.name}</h3>
            <p style={{ marginBottom: '1rem' }}>{p.short_description}</p>
            <div>
              {(p.tech_stack || []).map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}