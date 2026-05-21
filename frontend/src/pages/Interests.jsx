import { useEffect, useState } from 'react';
import { getInterests } from '../api';

export default function Interests() {
  const [interests, setInterests] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => { getInterests().then(r => setInterests(r.data)); }, []);

  return (
    <div>
      <h2>Interests & Activities</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.7 }}>
        Things that inspire and energise me beyond the screen.
      </p>
      <div className="grid-3">
        {interests.map(item => (
          <div
            key={item.id}
            className="glass-card"
            style={{
              cursor: 'default',
              transform: hovered === item.id ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              {item.icon || '✨'}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}