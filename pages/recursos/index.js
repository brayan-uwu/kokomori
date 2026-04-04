import { useState } from 'react';

const LINEAS = [
  {
    pais: 'Mexico',
    bandera: '🇲🇽',
    recursos: [
      { nombre: 'SAPTEL', numero: '55 5259-8121', desc: 'Crisis emocional 24 horas', tipo: 'crisis' },
      { nombre: 'INPRF Linea de la Vida', numero: '800 911-2000', desc: 'Salud mental y adicciones gratuita', tipo: 'salud' },
      { nombre: 'CRIJUAP', numero: '55 5658-1111', desc: 'Apoyo psicologico universitario', tipo: 'salud' },
      { nombre: 'Locatel', numero: '55 5658-1111', desc: 'Orientacion y apoyo ciudadano', tipo: 'general' },
      { nombre: 'Linea de la Mujer', numero: '800 911-2511', desc: 'Violencia de genero 24 horas', tipo: 'mujer' },
    ]
  },
  {
    pais: 'Estados Unidos',
    bandera: '🇺🇸',
    recursos: [
      { nombre: '988 Suicide & Crisis Lifeline', numero: '988', desc: 'Crisis y suicidio 24 horas', tipo: 'crisis' },
      { nombre: 'Crisis Text Line', numero: 'Text HOME to 741741', desc: 'Apoyo por mensaje de texto', tipo: 'crisis' },
      { nombre: 'SAMHSA Helpline', numero: '1-800-662-4357', desc: 'Salud mental y adicciones', tipo: 'salud' },
    ]
  },
  {
    pais: 'España',
    bandera: '🇪🇸',
    recursos: [
      { nombre: 'Telefono de la Esperanza', numero: '717 003 717', desc: 'Crisis emocional 24 horas', tipo: 'crisis' },
      { nombre: 'Telefono contra el Suicidio', numero: '024', desc: 'Linea de atencion inmediata', tipo: 'crisis' },
      { nombre: 'Cruz Roja', numero: '900 107 917', desc: 'Apoyo psicosocial gratuito', tipo: 'salud' },
    ]
  },
  {
    pais: 'Argentina',
    bandera: '🇦🇷',
    recursos: [
      { nombre: 'Centro de Asistencia al Suicida', numero: '135', desc: 'Prevencion 24 horas gratuito', tipo: 'crisis' },
      { nombre: 'SAME', numero: '107', desc: 'Emergencias medicas y psiquiatricas', tipo: 'crisis' },
    ]
  },
];

const TECNICAS = [
  {
    id: 1,
    titulo: 'Respiracion 4-7-8',
    icon: '🌬️',
    color: '#9CAFB7',
    colorDark: '#2E5A6E',
    cuando: 'Para ansiedad aguda y ataques de panico',
    pasos: [
      'Siéntate en una posición cómoda y cierra los ojos',
      'Inhala lentamente por la nariz contando 4 segundos',
      'Retén el aire contando 7 segundos',
      'Exhala completamente por la boca contando 8 segundos',
      'Repite el ciclo 3 o 4 veces',
    ]
  },
  {
    id: 2,
    titulo: 'Técnica 5-4-3-2-1 (Grounding)',
    icon: '🌍',
    color: '#EAD2AC',
    colorDark: '#8B6E3A',
    cuando: 'Para disociacion, flashbacks o ansiedad intensa',
    pasos: [
      'Nombra 5 cosas que puedes VER a tu alrededor',
      'Nombra 4 cosas que puedes TOCAR y sientelas',
      'Nombra 3 cosas que puedes ESCUCHAR ahora mismo',
      'Nombra 2 cosas que puedes OLER en este momento',
      'Nombra 1 cosa que puedes SABOREAR',
    ]
  },
  {
    id: 3,
    titulo: 'Relajación muscular progresiva',
    icon: '💆',
    color: '#E6B89C',
    colorDark: '#9B5E35',
    cuando: 'Para tension fisica, estres acumulado e insomnio',
    pasos: [
      'Acuestate o siéntate cómodamente y cierra los ojos',
      'Tensa los músculos de los pies por 5 segundos',
      'Suelta la tension y siente la relajación por 10 segundos',
      'Sube por el cuerpo: pantorrillas, muslos, abdomen, pecho',
      'Termina con hombros, cuello y cara. Respira profundo',
    ]
  },
  {
    id: 4,
    titulo: 'Autocalmado con frase de apoyo',
    icon: '💙',
    color: '#4281A4',
    colorDark: '#1a3a5c',
    cuando: 'Para momentos de autocritica intensa o tristeza profunda',
    pasos: [
      'Pon una mano en tu corazón y siente su calor',
      'Reconoce: "Estoy pasando por un momento difícil"',
      'Recuerda: "El sufrimiento es parte de la experiencia humana"',
      'Diciete: "Me doy permiso de sentir esto sin juzgarme"',
      'Preguntate: "¿Qué necesito ahora mismo?"',
    ]
  },
];

const TIPO_COLORS = {
  crisis: { bg: 'rgba(254,147,140,.1)', text: '#9B3A35', label: 'Crisis' },
  salud: { bg: 'rgba(66,129,164,.1)', text: '#1a3a5c', label: 'Salud mental' },
  general: { bg: 'rgba(156,175,183,.1)', text: '#2E5A6E', label: 'General' },
  mujer: { bg: 'rgba(230,184,156,.1)', text: '#9B5E35', label: 'Mujer' },
};

export default function RecursosPage() {
  const [paisActivo, setPaisActivo] = useState('Mexico');
  const [tecnicaActiva, setTecnicaActiva] = useState(null);
  const [tab, setTab] = useState('lineas');

  const paisData = LINEAS.find(l => l.pais === paisActivo);

  const s = {
    page: { minHeight: '100vh', background: '#FDF8F4', fontFamily: "'DM Sans', sans-serif", color: '#2C2420' },
    topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#fff', borderBottom: '1px solid rgba(226,180,160,0.3)', position: 'sticky', top: 0, zIndex: 100 },
    brand: { fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#4281A4', fontWeight: 'bold' },
    backBtn: { background: 'none', border: '1px solid rgba(226,180,160,0.5)', borderRadius: '10px', padding: '.5rem 1rem', cursor: 'pointer', color: '#7A5F55', fontSize: '.85rem' },
    container: { maxWidth: '500px', margin: '0 auto', padding: '1.5rem' },
    heading: { fontFamily: 'Georgia, serif', fontSize: '1.6rem', color: '#2C2420', marginBottom: '.25rem' },
    sub: { color: '#7A5F55', fontSize: '.85rem', marginBottom: '1.25rem' },
    tabs: { display: 'flex', gap: '.5rem', marginBottom: '1.5rem', background: '#FAF3EE', borderRadius: '14px', padding: '.3rem' },
    tab: (active) => ({ flex: 1, padding: '.6rem', border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', fontWeight: 600, background: active ? '#fff' : 'transparent', color: active ? '#4281A4' : '#7A5F55', boxShadow: active ? '0 1px 4px rgba(0,0,0,.08)' : 'none', transition: 'all .2s' }),
    emergCard: { background: 'rgba(254,147,140,.08)', border: '1.5px solid rgba(254,147,140,.3)', borderRadius: '16px', padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '.75rem' },
    paisGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '.5rem', marginBottom: '1.25rem' },
    paisBtn: (active) => ({ padding: '.65rem', border: `1.5px solid ${active ? '#4281A4' : 'rgba(226,180,160,0.3)'}`, borderRadius: '12px', background: active ? 'rgba(66,129,164,.08)' : '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', color: active ? '#4281A4' : '#2C2420', fontWeight: active ? 600 : 400, transition: 'all .2s', textAlign: 'center' }),
    recursoCard: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '14px', padding: '1rem', marginBottom: '.65rem', display: 'flex', alignItems: 'center', gap: '.75rem' },
    tecCard: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '16px', padding: '1.1rem', marginBottom: '.75rem', cursor: 'pointer', transition: 'all .2s' },
    tecHeader: { display: 'flex', alignItems: 'center', gap: '.75rem' },
    tecIcon: (color) => ({ width: '44px', height: '44px', borderRadius: '12px', background: `${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }),
    paso: { display: 'flex', gap: '.75rem', alignItems: 'flex-start', marginBottom: '.65rem' },
    pasoNum: (color) => ({ width: '24px', height: '24px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: '.1rem' }),
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={s.topbar}>
        <span style={s.brand}>Kokomori</span>
        <button style={s.backBtn} onClick={() => window.location.href = '/'}>← Volver</button>
      </div>

      <div style={s.container}>
        <div style={s.heading}>Recursos de apoyo</div>
        <div style={s.sub}>Lineas de crisis y tecnicas de emergencia</div>

        <div style={s.emergCard}>
          <div style={{ fontSize: '1.8rem' }}>🆘</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '.875rem', color: '#9B3A35', marginBottom: '.15rem' }}>Si estas en crisis ahora mismo</div>
            <div style={{ fontSize: '.78rem', color: '#7A5F55', lineHeight: 1.5 }}>Llama a una linea de crisis. No tienes que estar solo. Hay personas capacitadas esperando tu llamada.</div>
          </div>
        </div>

        <div style={s.tabs}>
          <button style={s.tab(tab === 'lineas')} onClick={() => setTab('lineas')}>Lineas de ayuda</button>
          <button style={s.tab(tab === 'tecnicas')} onClick={() => setTab('tecnicas')}>Tecnicas rapidas</button>
        </div>

        {tab === 'lineas' && (
          <>
            <div style={s.paisGrid}>
              {LINEAS.map(l => (
                <button key={l.pais} style={s.paisBtn(paisActivo === l.pais)} onClick={() => setPaisActivo(l.pais)}>
                  {l.bandera} {l.pais}
                </button>
              ))}
            </div>

            {paisData?.recursos.map((r, i) => {
              const tc = TIPO_COLORS[r.tipo];
              return (
                <div key={i} style={s.recursoCard}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.25rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '.875rem' }}>{r.nombre}</span>
                      <span style={{ fontSize: '.6rem', background: tc.bg, color: tc.text, padding: '.15rem .4rem', borderRadius: '6px', fontWeight: 600 }}>{tc.label}</span>
                    </div>
                    <div style={{ fontSize: '.72rem', color: '#7A5F55', marginBottom: '.4rem' }}>{r.desc}</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#4281A4' }}>{r.numero}</div>
                  </div>
                  <a href={`tel:${r.numero.replace(/\s/g,'')}`} style={{ background: '#4281A4', border: 'none', borderRadius: '10px', color: '#fff', padding: '.5rem .9rem', cursor: 'pointer', fontSize: '.8rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textDecoration: 'none', flexShrink: 0 }}>
                    Llamar
                  </a>
                </div>
              );
            })}
          </>
        )}

        {tab === 'tecnicas' && (
          <>
            <div style={{ fontSize: '.78rem', color: '#7A5F55', marginBottom: '1rem', lineHeight: 1.6, background: 'rgba(156,175,183,.1)', borderRadius: '12px', padding: '.75rem' }}>
              Estas tecnicas estan basadas en evidencia cientifica. Toca cualquiera para ver los pasos detallados.
            </div>
            {TECNICAS.map(t => (
              <div key={t.id} style={{ ...s.tecCard, borderColor: tecnicaActiva?.id === t.id ? t.color : 'rgba(226,180,160,0.3)' }} onClick={() => setTecnicaActiva(tecnicaActiva?.id === t.id ? null : t)}>
                <div style={s.tecHeader}>
                  <div style={s.tecIcon(t.color)}>{t.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '.9rem', marginBottom: '.15rem' }}>{t.titulo}</div>
                    <div style={{ fontSize: '.72rem', color: '#7A5F55' }}>{t.cuando}</div>
                  </div>
                  <div style={{ fontSize: '.8rem', color: '#7A5F55' }}>{tecnicaActiva?.id === t.id ? '▲' : '▼'}</div>
                </div>

                {tecnicaActiva?.id === t.id && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(226,180,160,0.3)' }}>
                    {t.pasos.map((p, i) => (
                      <div key={i} style={s.paso}>
                        <div style={s.pasoNum(t.color)}>{i + 1}</div>
                        <div style={{ fontSize: '.85rem', lineHeight: 1.6, color: '#2C2420' }}>{p}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}