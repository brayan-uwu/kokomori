import { useState, useEffect } from 'react';

const MOODS = [
  { key: 'Bien', color: '#EAD2AC', dark: '#8B6E3A' },
  { key: 'Tranquilo', color: '#9CAFB7', dark: '#2E5A6E' },
  { key: 'Triste', color: '#4281A4', dark: '#1a3a5c' },
  { key: 'Ansioso', color: '#E6B89C', dark: '#9B5E35' },
  { key: 'Enojado', color: '#FE938C', dark: '#9B3A35' },
];

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default function HistorialPage() {
  const [datos, setDatos] = useState({});
  const [mesActivo, setMesActivo] = useState(new Date().getMonth());
  const [anioActivo, setAnioActivo] = useState(new Date().getFullYear());
  const [curUser, setCurUser] = useState('');
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [moodMasFrecuente, setMoodMasFrecuente] = useState('');

  useEffect(() => {
    try {
      const db = JSON.parse(localStorage.getItem('kokomori_v2') || '{}');
      setCurUser(db.currentUser || '');
    } catch (e) {}
    cargarDatos();
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [mesActivo, anioActivo]);

  const cargarDatos = () => {
    const diasEnMes = new Date(anioActivo, mesActivo + 1, 0).getDate();
    const conteo = {};
    MOODS.forEach(m => conteo[m.key] = 0);
    let total = 0;

    for (let i = 1; i <= diasEnMes; i++) {
      const key = `koko-${anioActivo}-${mesActivo}-${i}`;
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data.mood && conteo[data.mood] !== undefined) {
          conteo[data.mood]++;
          total++;
        }
      } catch (e) {}
    }

    setDatos(conteo);
    setTotalEntradas(total);

    const mas = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0];
    setMoodMasFrecuente(mas && mas[1] > 0 ? mas[0] : '');
  };

  const moverMes = (dir) => {
    let m = mesActivo + dir;
    let a = anioActivo;
    if (m > 11) { m = 0; a++; }
    if (m < 0) { m = 11; a--; }
    setMesActivo(m);
    setAnioActivo(a);
  };

  const maxVal = Math.max(...Object.values(datos), 1);
  const moodActivo = MOODS.find(m => m.key === moodMasFrecuente);

  const s = {
    page: { minHeight: '100vh', background: '#FDF8F4', fontFamily: "'DM Sans', sans-serif", color: '#2C2420' },
    topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#fff', borderBottom: '1px solid rgba(226,180,160,0.3)', position: 'sticky', top: 0, zIndex: 100 },
    brand: { fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#4281A4', fontWeight: 'bold' },
    backBtn: { background: 'none', border: '1px solid rgba(226,180,160,0.5)', borderRadius: '10px', padding: '.5rem 1rem', cursor: 'pointer', color: '#7A5F55', fontSize: '.85rem' },
    container: { maxWidth: '500px', margin: '0 auto', padding: '1.5rem' },
    heading: { fontFamily: 'Georgia, serif', fontSize: '1.6rem', color: '#2C2420', marginBottom: '.25rem' },
    sub: { color: '#7A5F55', fontSize: '.85rem', marginBottom: '1.5rem' },
    card: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '18px', padding: '1.25rem', marginBottom: '1rem' },
    mesNav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' },
    mesLabel: { fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#2C2420', fontWeight: 600 },
    navBtn: { background: 'none', border: '1px solid rgba(226,180,160,0.4)', borderRadius: '8px', padding: '.4rem .8rem', cursor: 'pointer', color: '#4281A4', fontSize: '.9rem' },
    statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', marginBottom: '1rem' },
    statCard: { background: '#FAF3EE', borderRadius: '14px', padding: '1rem', textAlign: 'center' },
    statNum: { fontSize: '1.8rem', fontWeight: 700, color: '#4281A4', lineHeight: 1 },
    statLabel: { fontSize: '.72rem', color: '#7A5F55', marginTop: '.25rem', textTransform: 'uppercase', letterSpacing: '.05em' },
    chartArea: { padding: '0 .5rem' },
    barRow: { display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.75rem' },
    barLabel: { width: '72px', fontSize: '.78rem', color: '#2C2420', fontWeight: 500, textAlign: 'right', flexShrink: 0 },
    barTrack: { flex: 1, height: '32px', background: '#FAF3EE', borderRadius: '10px', overflow: 'hidden', position: 'relative' },
    barCount: { width: '28px', fontSize: '.78rem', color: '#7A5F55', textAlign: 'left', flexShrink: 0 },
    emptyState: { textAlign: 'center', padding: '2.5rem 1rem', color: '#7A5F55' },
    emptyIcon: { fontSize: '2.5rem', marginBottom: '.75rem' },
    legendRow: { display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '1rem' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '.35rem', fontSize: '.75rem', color: '#7A5F55' },
    legendDot: (color) => ({ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }),
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={s.topbar}>
        <span style={s.brand}>Kokomori</span>
        <button style={s.backBtn} onClick={() => window.location.href = '/'}>← Volver</button>
      </div>

      <div style={s.container}>
        <div style={s.heading}>Historial emocional</div>
        <div style={s.sub}>Como te has sentido mes a mes</div>

        <div style={s.mesNav}>
          <button style={s.navBtn} onClick={() => moverMes(-1)}>❮</button>
          <span style={s.mesLabel}>{MESES[mesActivo]} {anioActivo}</span>
          <button style={s.navBtn} onClick={() => moverMes(1)}>❯</button>
        </div>

        <div style={s.statsRow}>
          <div style={s.statCard}>
            <div style={s.statNum}>{totalEntradas}</div>
            <div style={s.statLabel}>Registros del mes</div>
          </div>
          <div style={{ ...s.statCard, background: moodActivo ? `${moodActivo.color}40` : '#FAF3EE' }}>
            <div style={{ ...s.statNum, color: moodActivo ? moodActivo.dark : '#4281A4', fontSize: '1.3rem' }}>
              {moodMasFrecuente || '—'}
            </div>
            <div style={s.statLabel}>Estado mas frecuente</div>
          </div>
        </div>

        <div style={s.card}>
          <div style={{ fontSize: '.8rem', fontWeight: 600, color: '#7A5F55', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '1rem' }}>
            Distribucion de estados
          </div>

          {totalEntradas === 0 ? (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>📊</div>
              <div style={{ fontWeight: 600, marginBottom: '.25rem' }}>Sin registros este mes</div>
              <div style={{ fontSize: '.82rem' }}>Ve al calendario y registra como te sientes cada dia</div>
            </div>
          ) : (
            <div style={s.chartArea}>
              {MOODS.map(mood => {
                const val = datos[mood.key] || 0;
                const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
                const diasEnMes = new Date(anioActivo, mesActivo + 1, 0).getDate();
                const pctTotal = totalEntradas > 0 ? Math.round((val / totalEntradas) * 100) : 0;
                return (
                  <div key={mood.key} style={s.barRow}>
                    <div style={s.barLabel}>{mood.key}</div>
                    <div style={s.barTrack}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: mood.color,
                        borderRadius: '10px',
                        transition: 'width .6s cubic-bezier(.34,1.56,.64,1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: val > 0 ? '8px' : 0,
                        minWidth: val > 0 ? '32px' : 0,
                      }}>
                        {val > 0 && <span style={{ fontSize: '.65rem', color: mood.dark, fontWeight: 700 }}>{pctTotal}%</span>}
                      </div>
                    </div>
                    <div style={s.barCount}>{val}d</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={s.card}>
          <div style={{ fontSize: '.8rem', fontWeight: 600, color: '#7A5F55', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.75rem' }}>
            Resumen del mes
          </div>
          {totalEntradas === 0 ? (
            <div style={{ fontSize: '.85rem', color: '#7A5F55' }}>Aun no hay datos para este mes.</div>
          ) : (
            <>
              <div style={{ fontSize: '.875rem', color: '#2C2420', lineHeight: 1.7 }}>
                Este mes registraste <strong>{totalEntradas} dias</strong> de {new Date(anioActivo, mesActivo + 1, 0).getDate()} posibles.
                {moodMasFrecuente && <> Tu estado mas frecuente fue <strong style={{ color: MOODS.find(m => m.key === moodMasFrecuente)?.dark }}>{moodMasFrecuente}</strong>.</>}
                {totalEntradas >= 15 && <> Llevas una racha consistente de registros, sigue asi.</>}
                {totalEntradas < 5 && <> Intenta registrar mas dias para obtener mejores estadisticas.</>}
              </div>
              <div style={s.legendRow}>
                {MOODS.filter(m => (datos[m.key] || 0) > 0).map(m => (
                  <div key={m.key} style={s.legendItem}>
                    <div style={s.legendDot(m.color)} />
                    {m.key}: {datos[m.key]} dia{datos[m.key] !== 1 ? 's' : ''}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => window.location.href = '/calendar.html'}
          style={{ width: '100%', padding: '.9rem', background: '#4281A4', border: 'none', borderRadius: '14px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', fontWeight: 600, cursor: 'pointer' }}
        >
          Ir al calendario para registrar
        </button>
      </div>
    </div>
  );
}