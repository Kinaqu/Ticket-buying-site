import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';

const PlaneItem = ({ plane, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [newPlane, setNewPlane] = useState('');
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    if (!newPlane.trim()) return;
    setSaving(true);
    await onUpdate(plane, newPlane);
    setNewPlane('');
    setOpen(false);
    setSaving(false);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 14, padding: '18px 20px',
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>✈</div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{plane}</span>
        </div>
        <button onClick={() => setOpen(!open)} style={{
          padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem',
          background: open ? 'rgba(220,38,38,0.1)' : 'var(--bg-elevated)',
          color: open ? '#dc2626' : 'var(--text-secondary)',
          border: `1px solid ${open ? 'rgba(220,38,38,0.2)' : 'var(--border-subtle)'}`,
          transition: 'all 0.2s',
        }}>
          {open ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {open && (
        <div style={{
          marginTop: 16, paddingTop: 16,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <input
            type="text"
            value={newPlane}
            onChange={e => setNewPlane(e.target.value)}
            placeholder="New plane name…"
            onKeyDown={e => e.key === 'Enter' && handleUpdate()}
            style={{
              flex: 1, padding: '10px 14px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              borderRadius: 9, color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#dc2626'}
            onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
          />
          <button onClick={handleUpdate} disabled={saving || !newPlane.trim()} style={{
            padding: '10px 20px', borderRadius: 9, border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem',
            background: '#dc2626', color: '#fff',
            opacity: saving || !newPlane.trim() ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      )}
    </div>
  );
};

const EditPlanesPage = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlanes = () => {
    axios.get('http://localhost:3001/api/admin/flights')
      .then(response => { setPlanes(response.data); setLoading(false); })
      .catch(error => { console.error(error); setLoading(false); });
  };

  useEffect(() => { fetchPlanes(); }, []);

  const handleUpdatePlane = async (oldPlane, newPlane) => {
    await axios.put(`http://localhost:3001/api/admin/flights/${oldPlane}`, { newPlane, oldPlane });
    fetchPlanes();
  };

  return (
    <div className="page-wrapper">
      <AdminNavbar />
      <section style={{ padding: '50px 24px 40px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ marginBottom: 6 }}>Manage Planes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Rename aircraft across all associated flight tickets.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading planes…</div>
        ) : planes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '48px 24px',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16,
            color: 'var(--text-muted)',
          }}>
            No planes found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {planes.map(plane => (
              <PlaneItem key={plane} plane={plane} onUpdate={handleUpdatePlane} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default EditPlanesPage;