import { useState, useEffect } from 'react';

const FRECUENCIAS = ['Diario', 'Cada 2 dias', 'Semanal'];
const HORAS = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2,'0')}:00`);
const TIPOS = [
  { key: 'diario', label: 'Escribir en el diario', icon: '📓', color: '#FE938C' },
  { key: 'respiracion', label: 'Ejercicio de respiracion', icon: '🌬️', color: '#9CAFB7' },
  { key: 'mood', label: 'Registrar estado de animo', icon: '🎨', color: '#EAD2AC' },
  { key: 'agua', label: 'Tomar agua', icon: '💧', color: '#4281A4' },
  { key: 'pausa', label: 'Pausa de bienestar', icon: '🌿', color: '#E6B89C' },
  { key: 'gratitud', label: 'Momento de gratitud', icon: '⭐', color: '#9CAFB7' },
];

export default function RecordatoriosPage() {
  const [recordatorios, setRecordatorios] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [hora, setHora] = useState('08:00');
  const [frecuencia, setFrecuencia] = useState('Diario');
  const [permisoNotif, setPermisoNotif] = useState('default');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarRecordatorios();
    if ('Notification' in window) {
      setPermisoNotif(Notification.permission);
    }
  }, []);

  const cargarRecordatorios = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('kokomori_recordatorios') || '[]');
      setRecordatorios(saved);
    } catch (e) { setRecordatorios([]); }
  };

  const pedirPermiso = async () => {
    if (!('Notification' in window)) {
      alert('Tu navegador no soporta notificaciones');
      return;
    }
    const result = await Notification.requestPermission();
    setPermisoNotif(result);
  };

  const programarNotificacion = (rec) => {
    if (Notification.permission !== 'granted') return;
    const [h, m] = rec.hora.split(':').map(Number);
    const ahora = new Date();
    const objetivo = new Date();
    objetivo.setHours(h, m, 0, 0);
    if (objetivo <= ahora) objetivo.setDate(objetivo.getDate() + 1);
    const diff = objetivo - ahora;
    setTimeout(() => {
      new Notification(`Kokomori - ${rec.tipo.label}`, {
        body: `Es hora de: ${rec.tipo.label}`,
        icon: '/favicon.ico',
      });
    }, diff);
  };

  const guardarRecordatorio = () => {
    setGuardando(true);
    const nuevo = {
      id: Date.now(),
      tipo,
      hora,
      frecuencia,
      activo: true,
      creadoEn: new Date().toLocaleDateString('es-MX'),
    };
    const nuevos = [...recordatorios, nuevo];
    localStorage.setItem('kokomori_recordatorios', JSON.stringify(nuevos));
    setRecordatorios(nuevos);
    programarNotificacion(nuevo);
    setTimeout(() => {
      setGuardando(false);
      setMostrarForm(false);
    }, 800);
  };

  const toggleRecordatorio = (id) => {
    const actualizados = recordatorios.map(r =>
      r.id === id ? { ...r, activo: !r.activo } : r
    );
    localStorage.setItem('kokomori_recordatorios', JSON.stringify(actualizados));
    setRecordatorios(actualizados);
  };

  const eliminarRecordatorio = (id) => {
    const filtrados = recordatorios.filter(r => r.id !== id);
    localStorage.setItem('kokomori_recordatorios', JSON.stringify(filtrados));
    setRecordatorios(filtrados);
  };

  const s = {
    page: { minHeight: '100vh', background: '#FDF8F4', fontFamily: "'DM Sans', sans-serif", color: '#2C2420' },
    topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#fff', borderBottom: '1px solid rgba(226,180,160,0.3)', position: 'sticky', top: 0, zIndex: 100 },
    brand: { fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#4281A4', fontWeight: 'bold' },
    backBtn: { background: 'none', border: '1px solid rgba(226,180,160,0.5)', borderRadius: '10px', padding: '.5rem 1rem', cursor: 'pointer', color: '#7A5F55', fontSize: '.85rem' },
    container: { maxWidth: '500px', margin: '0 auto', padding: '1.5rem' },
    heading: { fontFamily: 'Georgia, serif', fontSize: '1.6rem', color: '#2C2420', marginBottom: '.25rem' },
    sub: { color: '#7A5F55', fontSize: '.85rem', marginBottom: '1.5rem' },
    card: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '18px', padding: '1.25rem', marginBottom: '1rem' },
    btnPrimary: { width: '100%', padding: '.9rem', background: '#4281A4', border: 'none', borderRadius: '14px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' },
    btnSecondary: { width: '100%', padding: '.9rem', background: 'none', border: '1px solid rgba(226,180,160,0.5)', borderRadius: '14px', color: '#7A5F55', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', cursor: 'pointer', marginBottom: '1rem' },
    label: { fontSize: '.75rem', fontWeight: 600, color: '#7A5F55', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem', display: 'block' },
    select: { width: '100%', padding: '.75rem 1rem', border: '1.5px solid rgba(226,180,160,0.4)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', color: '#2C2420', background: '#fff', outline: 'none', marginBottom: '1rem', appearance: 'none' },
    tipoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '1rem' },
    tipoBtn: (selected, color) => ({
      padding: '.75rem .5rem', borderRadius: '12px', border: `2px solid ${selected ? color : 'rgba(226,180,160,0.3)'}`,
      background: selected ? `${color}20` : '#fff', cursor: 'pointer', textAlign: 'center',
      fontFamily: "'DM Sans', sans-serif", fontSize: '.78rem', color: '#2C2420', transition: 'all .2s',
    }),
    recCard: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '16px', padding: '1rem', marginBottom: '.75rem', display: 'flex', alignItems: 'center', gap: '.75rem' },
    recIcon: (color) => ({ width: '42px', height: '42px', borderRadius: '12px', background: `${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }),
    recInfo: { flex: 1 },
    recLabel: { fontWeight: 600, fontSize: '.875rem', color: '#2C2420', marginBottom: '.15rem' },
    recMeta: { fontSize: '.72rem', color: '#7A5F55' },
    toggle: (activo) => ({ width: '44px', height: '24px', borderRadius: '12px', background: activo ? '#4281A4' : '#D0C5BC', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background .2s' }),
    toggleDot: (activo) => ({ position: 'absolute', top: '3px', left: activo ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left .2s' }),
    permisoBanner: { background: 'rgba(66,129,164,.08)', border: '1px solid rgba(66,129,164,.2)', borderRadius: '14px', padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.75rem' },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={s.topbar}>
        <span style={s.brand}>Kokomori</span>
        <button style={s.backBtn} onClick={() => window.location.href = '/'}>← Volver</button>
      </div>

      <div style={s.container}>
        <div style={s.heading}>Recordatorios</div>
        <div style={s.sub}>Programa avisos de bienestar para tu dia</div>

        {permisoNotif !== 'granted' && (
          <div style={s.permisoBanner}>
            <div style={{ fontSize: '1.5rem' }}>🔔</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '.875rem', marginBottom: '.15rem' }}>Activa las notificaciones</div>
              <div style={{ fontSize: '.78rem', color: '#7A5F55' }}>Para recibir recordatorios en tu dispositivo</div>
            </div>
            <button onClick={pedirPermiso} style={{ background: '#4281A4', border: 'none', borderRadius: '10px', color: '#fff', padding: '.5rem .9rem', cursor: 'pointer', fontSize: '.8rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, flexShrink: 0 }}>
              Activar
            </button>
          </div>
        )}

        {permisoNotif === 'granted' && (
          <div style={{ ...s.permisoBanner, background: 'rgba(46,125,94,.08)', borderColor: 'rgba(46,125,94,.2)' }}>
            <div style={{ fontSize: '1.2rem' }}>✅</div>
            <div style={{ fontSize: '.82rem', color: '#2E7D5E', fontWeight: 500 }}>Notificaciones activadas en este dispositivo</div>
          </div>
        )}

        <button style={s.btnPrimary} onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Nuevo recordatorio'}
        </button>

        {mostrarForm && (
          <div style={s.card}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', marginBottom: '1rem', color: '#2C2420' }}>Nuevo recordatorio</div>

            <span style={s.label}>Tipo de recordatorio</span>
            <div style={s.tipoGrid}>
              {TIPOS.map(t => (
                <button key={t.key} style={s.tipoBtn(tipo.key === t.key, t.color)} onClick={() => setTipo(t)}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '.2rem' }}>{t.icon}</div>
                  <div>{t.label}</div>
                </button>
              ))}
            </div>

            <span style={s.label}>Hora</span>
            <select style={s.select} value={hora} onChange={e => setHora(e.target.value)}>
              {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>

            <span style={s.label}>Frecuencia</span>
            <select style={s.select} value={frecuencia} onChange={e => setFrecuencia(e.target.value)}>
              {FRECUENCIAS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            <button
              style={{ ...s.btnPrimary, marginBottom: 0, background: guardando ? '#9CAFB7' : '#4281A4' }}
              onClick={guardarRecordatorio}
              disabled={guardando}
            >
              {guardando ? 'Guardando...' : 'Guardar recordatorio'}
            </button>
          </div>
        )}

        {recordatorios.length === 0 && !mostrarForm ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#7A5F55' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>🔔</div>
            <div style={{ fontWeight: 600, marginBottom: '.25rem' }}>Sin recordatorios</div>
            <div style={{ fontSize: '.82rem' }}>Crea tu primer recordatorio de bienestar</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '.8rem', fontWeight: 600, color: '#7A5F55', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.75rem' }}>
              Tus recordatorios ({recordatorios.length})
            </div>
            {recordatorios.map(rec => (
              <div key={rec.id} style={{ ...s.recCard, opacity: rec.activo ? 1 : .5 }}>
                <div style={s.recIcon(rec.tipo.color)}>{rec.tipo.icon}</div>
                <div style={s.recInfo}>
                  <div style={s.recLabel}>{rec.tipo.label}</div>
                  <div style={s.recMeta}>{rec.hora} · {rec.frecuencia}</div>
                </div>
                <button style={s.toggle(rec.activo)} onClick={() => toggleRecordatorio(rec.id)}>
                  <div style={s.toggleDot(rec.activo)} />
                </button>
                <button onClick={() => eliminarRecordatorio(rec.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B89A8E', fontSize: '1rem', padding: '.25rem', marginLeft: '.25rem' }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}