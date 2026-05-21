import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject } from '../api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => { getProject(slug).then(r => setProject(r.data)); }, [slug]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <button className="back-btn" onClick={() => navigate('/projects')}>← Back to Projects</button>
      <div className="glass-card">
        <h1 style={{ marginBottom: '0.5rem', wordBreak: 'break-word', overflowWrap: 'break-word', lineHeight: '1.3'}}>{project.name} </h1>
        <p style={{ color: '#a0c4ff', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
          {project.category} project
        </p>
        <div style={{ marginBottom: '1.5rem' }}>
          {(project.tech_stack || []).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{ lineHeight: '1.9', whiteSpace: 'pre-line' }}>
          {project.full_description}
        </div>
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', marginTop: '1.5rem', color: '#a0c4ff' }}>
            🐙 View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
}