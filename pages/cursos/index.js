import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const EMAILJS_SERVICE_ID = 'service_8qbocpl';
const EMAILJS_TEMPLATE_ID = 'template_0bg3xkg';
const EMAILJS_PUBLIC_KEY = 'EZYCaM7cQlpZd9noS';

const CURSOS = [
  {
    id: 1,
    titulo: 'Manejo de la ansiedad',
    desc: 'Herramientas practicas para reducir la ansiedad en tu vida cotidiana.',
    duracion: '4 semanas',
    color: '#9CAFB7',
    medalla: '🧘',
    video: 'https://www.youtube.com/embed/KHbj8_FkqkM',
    modulos: [
      {
        titulo: 'Que es la ansiedad y como funciona',
        texto: 'La ansiedad es una respuesta natural del sistema nervioso ante situaciones percibidas como amenazantes. El cerebro activa el modo "lucha o huida", liberando adrenalina y cortisol. Esto es util en peligros reales, pero cuando se activa de forma cronica puede afectar tu calidad de vida. Reconocer los sintomas fisicos (tension muscular, respiracion acelerada, pensamientos intrusivos) es el primer paso para manejarla.',
        ejercicio: 'Escribe en un papel 3 situaciones que te generan ansiedad esta semana. Junto a cada una escribe: es real el peligro o es percibido? Esto ayuda a identificar patrones.',
      },
      {
        titulo: 'Tecnicas de respiracion y relajacion',
        texto: 'La respiracion consciente es una de las herramientas mas poderosas para calmar el sistema nervioso. La tecnica 4-7-8 consiste en inhalar 4 segundos, retener 7 y exhalar 8. La respiracion diafragmatica activa el nervio vago y reduce la frecuencia cardiaca en minutos. Practicar 5 minutos diarios tiene efectos acumulativos significativos.',
        ejercicio: 'Practica la tecnica 4-7-8 durante 5 minutos ahora mismo. Luego escribe como te sentiste antes y despues en tu diario de Kokomori.',
      },
      {
        titulo: 'Pensamientos automaticos negativos',
        texto: 'Los pensamientos automaticos negativos (PAN) son interpretaciones rapidas y distorsionadas de la realidad. Algunos ejemplos: catastrofizar (lo peor siempre pasara), lectura mental (se lo que piensan de mi), generalizacion (siempre me pasa esto). Identificarlos y cuestionarlos es la base de la terapia cognitivo-conductual.',
        ejercicio: 'Cuando notes un pensamiento negativo automatico, escribe: el pensamiento, la evidencia a favor y en contra, y una version mas equilibrada del mismo.',
      },
      {
        titulo: 'Construyendo rutinas de bienestar',
        texto: 'Las rutinas reducen la ansiedad porque el cerebro gasta menos energia en decisiones. Incorporar ejercicio (30 min diarios), sueno de calidad (7-8 horas), alimentacion balanceada y momentos de descanso activo crea una base solida de bienestar. No necesitas hacer todo a la vez, empieza con un habito pequeño.',
        ejercicio: 'Disenha tu rutina matutina ideal de 30 minutos. Incluye al menos: movimiento, algo nutritivo y un momento de silencio. Comprometete a probarla 7 dias.',
      },
    ],
    quiz: [
      { pregunta: 'Que activa el cerebro durante la ansiedad?', opciones: ['El modo descanso', 'El modo lucha o huida', 'El sistema digestivo', 'La memoria a largo plazo'], correcta: 1 },
      { pregunta: 'Cuanto tiempo se recomienda practicar respiracion consciente diariamente?', opciones: ['30 minutos', '1 hora', '5 minutos', '2 minutos'], correcta: 2 },
      { pregunta: 'Que son los pensamientos automaticos negativos?', opciones: ['Suenos recurrentes', 'Interpretaciones distorsionadas de la realidad', 'Recuerdos del pasado', 'Planes futuros'], correcta: 1 },
    ],
  },
  {
    id: 2,
    titulo: 'Autoestima y amor propio',
    desc: 'Reconecta con tu valor personal y construye una relacion sana contigo mismo.',
    duracion: '3 semanas',
    color: '#E6B89C',
    medalla: '⭐',
    video: 'https://www.youtube.com/embed/l_NYrWqUR40',
    modulos: [
      {
        titulo: 'Origen de la autoestima',
        texto: 'La autoestima se forma desde la infancia a traves de las experiencias, los mensajes que recibimos de otros y como interpretamos lo que nos pasa. No es fija ni definitiva. La neurociencia muestra que el cerebro tiene plasticidad: puedes reaprender a valorarte. El primer paso es reconocer que tu autoestima actual es el resultado de un proceso, no una verdad absoluta sobre quien eres.',
        ejercicio: 'Escribe 5 mensajes negativos que recibiste en tu infancia sobre ti mismo. Junto a cada uno escribe: de quien vino ese mensaje y si realmente define quien eres hoy.',
      },
      {
        titulo: 'Dialogo interno y autocritica',
        texto: 'El dialogo interno es la voz con la que te hablas a ti mismo. Cuando es muy critico y exigente, actua como un enemigo interno que sabotea tu bienestar. La autocompasion, propuesta por la Dra. Kristin Neff, plantea tratarte con la misma amabilidad que tratarias a un amigo querido. No significa ser complaciente, significa ser justo contigo mismo.',
        ejercicio: 'Durante un dia completo, observa como te hablas cuando cometes un error. Cada vez que notes autocritica, reescribe el pensamiento como si se lo dijeras a tu mejor amigo.',
      },
      {
        titulo: 'Celebrando tus fortalezas',
        texto: 'El sesgo de negatividad hace que recordemos mas los errores que los logros. Entrenar la mente para reconocer fortalezas no es vanidad, es equilibrio. Las fortalezas no son solo talentos innatos, tambien incluyen valores, habilidades aprendidas y formas de relacionarte con el mundo. Reconocerlas construye una identidad mas solida.',
        ejercicio: 'Haz una lista de 10 fortalezas tuyas. Si se te dificulta, preguntale a alguien de confianza que admira de ti. Lee la lista en voz alta frente a un espejo.',
      },
      {
        titulo: 'Limites y autocuidado',
        texto: 'Establecer limites es un acto de amor propio. Un limite sano comunica tus necesidades sin agredir a otros. Muchas personas con baja autoestima tienen dificultad para decir no por miedo al rechazo. Practicar limites pequenos primero (como decir no a algo menor) entrena la habilidad de cuidarte.',
        ejercicio: 'Identifica una situacion donde necesitas poner un limite esta semana. Escribe exactamente como lo vas a comunicar usando la formula: cuando haces X, yo siento Y, necesito Z.',
      },
    ],
    quiz: [
      { pregunta: 'La autoestima es algo fijo con lo que nacemos?', opciones: ['Si, es genetica', 'No, se puede trabajar y cambiar', 'Solo cambia en la infancia', 'Depende del coeficiente intelectual'], correcta: 1 },
      { pregunta: 'Que propone la autocompasion de Kristin Neff?', opciones: ['Ignorar los errores', 'Tratarte con la misma amabilidad que a un amigo', 'Ser mas exigente contigo mismo', 'Evitar el dialogo interno'], correcta: 1 },
      { pregunta: 'Por que es importante poner limites?', opciones: ['Para alejar a las personas', 'Porque es un acto de amor propio', 'Para tener mas control', 'No es importante'], correcta: 1 },
    ],
  },
  {
    id: 3,
    titulo: 'Mindfulness para principiantes',
    desc: 'Descubre como vivir el momento presente mejora tu bienestar general.',
    duracion: '2 semanas',
    color: '#9CAFB7',
    medalla: '🌿',
    video: 'https://www.youtube.com/embed/w6T02g5hnT4',
    modulos: [
      {
        titulo: 'Que es mindfulness',
        texto: 'Mindfulness es la capacidad de prestar atencion al momento presente de forma intencional y sin juzgar. Tiene raices en tradiciones meditativas orientales pero ha sido adaptado por la psicologia occidental con evidencia cientifica solida. El programa MBSR (Mindfulness-Based Stress Reduction) de Jon Kabat-Zinn ha demostrado reducir el estres, la ansiedad y mejorar el bienestar en miles de estudios.',
        ejercicio: 'Practica 3 minutos de observacion consciente: sienta, observa 5 cosas que ves, 4 que puedes tocar, 3 que escuchas, 2 que hueles, 1 que puedes saborear. Esto ancla tu atencion al presente.',
      },
      {
        titulo: 'Respiracion consciente',
        texto: 'La respiracion es el ancla mas accesible al momento presente porque siempre esta con nosotros. En mindfulness no se controla la respiracion, se observa: la sensacion del aire entrando, el movimiento del abdomen, la pausa entre inhalar y exhalar. Cuando la mente se distrae (y lo hara), simplemente regresas la atencion a la respiracion sin juzgarte.',
        ejercicio: 'Pon un temporizador de 5 minutos. Cierra los ojos y solo observa tu respiracion. Cada vez que tu mente se vaya, pon una marca en un papel. Al final cuenta las marcas, no como fracaso sino como practica de regresar.',
      },
      {
        titulo: 'Escaner corporal',
        texto: 'El escaner corporal es una practica de mindfulness que recorre el cuerpo con atencion de forma sistematica. Comienza desde los pies y sube hasta la cabeza, notando sensaciones sin intentar cambiarlas. Esta practica mejora la conexion mente-cuerpo, reduce la tension fisica acumulada y ayuda a identificar donde guardas el estres en tu cuerpo.',
        ejercicio: 'Haz un escaner corporal de 10 minutos acostado. Nota sin juzgar: hay tension en algun lugar? Calor o frio? Luego escribe en que partes de tu cuerpo sientes mas tension normalmente.',
      },
      {
        titulo: 'Mindfulness en lo cotidiano',
        texto: 'No necesitas meditar 1 hora al dia para practicar mindfulness. Puedes integrarlo en actividades cotidianas: comer sin pantallas, caminar prestando atencion a cada paso, lavarte los dientes observando las sensaciones. Estas micro-practicas acumuladas durante el dia tienen un impacto significativo en tu nivel de atencion y calma.',
        ejercicio: 'Elige una actividad cotidiana (comer, ducharte, caminar) y hazla completamente en mindfulness durante 7 dias seguidos. Al final escribe que notaste diferente.',
      },
    ],
    quiz: [
      { pregunta: 'Que significa mindfulness?', opciones: ['Pensar en el futuro', 'Prestar atencion al momento presente sin juzgar', 'Meditar 1 hora diaria', 'Controlar los pensamientos'], correcta: 1 },
      { pregunta: 'Que haces cuando la mente se distrae en mindfulness?', opciones: ['Te juzgas por distraerte', 'Paras la practica', 'Regresas la atencion sin juzgarte', 'Piensas en otra cosa'], correcta: 2 },
      { pregunta: 'El mindfulness solo se practica meditando formalmente?', opciones: ['Si, necesitas 1 hora diaria', 'No, se puede integrar en actividades cotidianas', 'Solo funciona en silencio total', 'Necesitas un maestro'], correcta: 1 },
    ],
  },
];

export default function CursosPage() {
  const [cursoActivo, setCursoActivo] = useState(null);
  const [moduloActivo, setModuloActivo] = useState(0);
  const [fase, setFase] = useState('intro'); // intro | modulo | quiz | certificado
  const [respuestas, setRespuestas] = useState({});
  const [quizEnviado, setQuizEnviado] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [medallasSaved, setMedallasSaved] = useState([]);
  const [curUser, setCurUser] = useState('');

  useEffect(() => {
    try {
      const db = JSON.parse(localStorage.getItem('kokomori_v2') || '{}');
      setCurUser(db.currentUser || '');
      const medallas = JSON.parse(localStorage.getItem('kokomori_medallas') || '[]');
      setMedallasSaved(medallas);
    } catch (e) {}
  }, []);

  const abrirCurso = (curso) => {
    setCursoActivo(curso);
    setModuloActivo(0);
    setFase('intro');
    setRespuestas({});
    setQuizEnviado(false);
    setEnviado(false);
    setNombre('');
    setCorreo('');
  };

  const cerrarCurso = () => {
    setCursoActivo(null);
    setFase('intro');
  };

  const siguienteModulo = () => {
    if (moduloActivo < cursoActivo.modulos.length - 1) {
      setModuloActivo(moduloActivo + 1);
    } else {
      setFase('quiz');
    }
  };

  const responder = (qi, oi) => {
    if (quizEnviado) return;
    setRespuestas({ ...respuestas, [qi]: oi });
  };

  const enviarQuiz = () => {
    setQuizEnviado(true);
    const correctas = cursoActivo.quiz.filter((q, i) => respuestas[i] === q.correcta).length;
    if (correctas >= Math.ceil(cursoActivo.quiz.length * 0.6)) {
      setTimeout(() => setFase('certificado'), 1000);
    }
  };

  const puntajeQuiz = () => {
    return cursoActivo.quiz.filter((q, i) => respuestas[i] === q.correcta).length;
  };

  const generarPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFillColor(253, 248, 244);
    doc.rect(0, 0, 297, 210, 'F');
    doc.setDrawColor(66, 129, 164);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(66, 129, 164);
    doc.text('Kokomori', 148, 45, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(122, 95, 85);
    doc.text('Certificado de Completacion', 148, 58, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(44, 36, 32);
    doc.text('Este certificado se otorga a:', 148, 80, { align: 'center' });
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(66, 129, 164);
    doc.text(nombre || 'Usuario', 148, 100, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(44, 36, 32);
    doc.text('por completar exitosamente el curso:', 148, 116, { align: 'center' });
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(254, 147, 140);
    doc.text(cursoActivo.titulo, 148, 132, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(122, 95, 85);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-MX')}`, 148, 150, { align: 'center' });
    doc.text('Tu espacio seguro de bienestar emocional', 148, 165, { align: 'center' });
    doc.save(`certificado-${cursoActivo.titulo.replace(/ /g, '-')}.pdf`);
  };

  const guardarMedalla = () => {
    const medallas = JSON.parse(localStorage.getItem('kokomori_medallas') || '[]');
    if (!medallas.find(m => m.cursoId === cursoActivo.id)) {
      const nueva = { cursoId: cursoActivo.id, titulo: cursoActivo.titulo, medalla: cursoActivo.medalla, fecha: new Date().toLocaleDateString('es-MX'), usuario: curUser };
      medallas.push(nueva);
      localStorage.setItem('kokomori_medallas', JSON.stringify(medallas));
      setMedallasSaved(medallas);
    }
  };

  const enviarCertificado = async () => {
    if (!nombre || !correo) return;
    setEnviando(true);
    guardarMedalla();
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_name: nombre,
        to_email: correo,
        curso_nombre: cursoActivo.titulo,
        curso_duracion: cursoActivo.duracion,
        fecha: new Date().toLocaleDateString('es-MX'),
        mensaje: `Felicitaciones! Has completado el curso "${cursoActivo.titulo}" en Kokomori. Este es tu espacio seguro de bienestar emocional.`,
      }, EMAILJS_PUBLIC_KEY);
      setEnviado(true);
      generarPDF();
    } catch (e) {
      generarPDF();
      setEnviado(true);
    }
    setEnviando(false);
  };

  const yaCompletado = (cursoId) => medallasSaved.some(m => m.cursoId === cursoId);

  const s = {
    page: { minHeight: '100vh', background: '#FDF8F4', fontFamily: "'DM Sans', sans-serif", color: '#2C2420' },
    topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#fff', borderBottom: '1px solid rgba(226,180,160,0.3)', position: 'sticky', top: 0, zIndex: 100 },
    brand: { fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#4281A4', fontWeight: 'bold' },
    backBtn: { background: 'none', border: '1px solid rgba(226,180,160,0.5)', borderRadius: '10px', padding: '.5rem 1rem', cursor: 'pointer', color: '#7A5F55', fontSize: '.85rem', display: 'flex', alignItems: 'center', gap: '.4rem' },
    container: { maxWidth: '700px', margin: '0 auto', padding: '1.5rem' },
    heading: { fontFamily: 'Georgia, serif', fontSize: '1.6rem', color: '#2C2420', marginBottom: '.5rem' },
    subheading: { color: '#7A5F55', fontSize: '.9rem', marginBottom: '1.5rem' },
    medalGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.75rem', marginBottom: '1.5rem' },
    medalCard: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '12px', padding: '.75rem', textAlign: 'center', fontSize: '.7rem', color: '#7A5F55' },
    medalIcon: { fontSize: '1.8rem', marginBottom: '.25rem' },
    cursoGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    cursoCard: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '18px', padding: '1.25rem', cursor: 'pointer', transition: 'all .2s' },
    cursoTop: { display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' },
    cursoIconBox: { width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 },
    cursoTitle: { fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#2C2420', marginBottom: '.25rem' },
    cursoDesc: { fontSize: '.82rem', color: '#7A5F55', lineHeight: 1.5 },
    cursoDur: { fontSize: '.72rem', color: '#9CAFB7', marginTop: '.25rem' },
    btnPrimary: { background: '#4281A4', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', fontWeight: 600, padding: '.75rem 1.5rem', cursor: 'pointer', width: '100%', marginTop: '1rem' },
    btnSecondary: { background: 'none', border: '1px solid rgba(226,180,160,0.5)', borderRadius: '12px', color: '#7A5F55', fontFamily: "'DM Sans', sans-serif", fontSize: '.85rem', padding: '.65rem 1.25rem', cursor: 'pointer' },
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '1rem' },
    modal: { background: '#FDF8F4', borderRadius: '24px', width: '100%', maxWidth: '660px', padding: '2rem', margin: 'auto' },
    modalTitle: { fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#2C2420', marginBottom: '.5rem' },
    progressBar: { height: '5px', background: '#FAF3EE', borderRadius: '3px', marginBottom: '1.5rem', overflow: 'hidden' },
    progressFill: { height: '100%', background: 'linear-gradient(90deg,#9CAFB7,#4281A4)', borderRadius: '3px', transition: 'width .4s' },
    videoWrap: { borderRadius: '14px', overflow: 'hidden', marginBottom: '1.25rem', aspectRatio: '16/9' },
    moduloTexto: { fontSize: '.9rem', lineHeight: 1.75, color: '#2C2420', background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1rem' },
    ejercicioBox: { background: 'rgba(156,175,183,.1)', border: '1px solid rgba(156,175,183,.3)', borderRadius: '14px', padding: '1rem', marginBottom: '1.25rem' },
    ejercicioLabel: { fontSize: '.7rem', fontWeight: 700, color: '#4281A4', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' },
    quizCard: { background: '#fff', border: '1px solid rgba(226,180,160,0.3)', borderRadius: '14px', padding: '1rem', marginBottom: '.75rem' },
    quizPregunta: { fontWeight: 600, fontSize: '.9rem', marginBottom: '.75rem', color: '#2C2420' },
    opcion: (sel, correcta, enviado, idx, correctaIdx) => ({
      display: 'block', width: '100%', textAlign: 'left', padding: '.65rem .9rem', borderRadius: '10px', marginBottom: '.4rem', cursor: enviado ? 'default' : 'pointer', fontSize: '.85rem', border: '1.5px solid',
      borderColor: enviado ? (idx === correctaIdx ? '#2E7D5E' : sel ? '#E24B4A' : 'rgba(226,180,160,0.3)') : sel ? '#4281A4' : 'rgba(226,180,160,0.3)',
      background: enviado ? (idx === correctaIdx ? 'rgba(46,125,94,.08)' : sel ? 'rgba(226,75,74,.06)' : 'transparent') : sel ? 'rgba(66,129,164,.08)' : 'transparent',
      color: '#2C2420', fontFamily: "'DM Sans', sans-serif",
    }),
    input: { width: '100%', padding: '.75rem 1rem', border: '1.5px solid rgba(226,180,160,0.4)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', color: '#2C2420', background: '#fff', outline: 'none', marginBottom: '.75rem' },
    certBox: { textAlign: 'center', padding: '2rem 1rem' },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={s.topbar}>
        <span style={s.brand}>Kokomori</span>
        <button style={s.backBtn} onClick={() => window.location.href = '/'}>← Volver a la app</button>
      </div>

      <div style={s.container}>
        <div style={s.heading}>Cursos guiados</div>
        <div style={s.subheading}>Aprende a tu ritmo con contenido creado por profesionales</div>

        {medallasSaved.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '.8rem', fontWeight: 600, color: '#7A5F55', marginBottom: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Tus medallas — {medallasSaved.length} curso{medallasSaved.length > 1 ? 's' : ''} completado{medallasSaved.length > 1 ? 's' : ''}
            </div>
            <div style={s.medalGrid}>
              {medallasSaved.map(m => (
                <div key={m.cursoId} style={s.medalCard}>
                  <div style={s.medalIcon}>{m.medalla}</div>
                  <div style={{ fontWeight: 600, color: '#2C2420', marginBottom: '.15rem' }}>{m.titulo}</div>
                  <div>{m.fecha}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={s.cursoGrid}>
          {CURSOS.map(curso => (
            <div key={curso.id} style={{ ...s.cursoCard, borderColor: yaCompletado(curso.id) ? '#2E7D5E' : 'rgba(226,180,160,0.3)' }}>
              <div style={s.cursoTop}>
                <div style={{ ...s.cursoIconBox, background: `${curso.color}40` }}>{curso.medalla}</div>
                <div style={{ flex: 1 }}>
                  <div style={s.cursoTitle}>{curso.titulo}</div>
                  <div style={s.cursoDesc}>{curso.desc}</div>
                  <div style={s.cursoDur}>{curso.duracion} · {curso.modulos.length} modulos</div>
                </div>
                {yaCompletado(curso.id) && <span style={{ fontSize: '.7rem', background: 'rgba(46,125,94,.1)', color: '#2E7D5E', padding: '.25rem .6rem', borderRadius: '8px', fontWeight: 600, flexShrink: 0 }}>Completado</span>}
              </div>
              <button style={{ ...s.btnPrimary, background: yaCompletado(curso.id) ? '#9CAFB7' : '#4281A4' }} onClick={() => abrirCurso(curso)}>
                {yaCompletado(curso.id) ? 'Ver de nuevo' : 'Iniciar curso'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {cursoActivo && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '.75rem', color: '#7A5F55', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{cursoActivo.titulo}</span>
              <button style={{ ...s.btnSecondary, padding: '.35rem .75rem', fontSize: '.78rem' }} onClick={cerrarCurso}>Cerrar</button>
            </div>

            {fase === 'intro' && (
              <>
                <div style={s.modalTitle}>{cursoActivo.titulo}</div>
                <div style={{ color: '#7A5F55', fontSize: '.88rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>{cursoActivo.desc}</div>
                <div style={s.videoWrap}>
                  <iframe width="100%" height="100%" src={cursoActivo.video} title="intro" frameBorder="0" allowFullScreen style={{ display: 'block' }} />
                </div>
                <button style={s.btnPrimary} onClick={() => setFase('modulo')}>Comenzar modulos</button>
              </>
            )}

            {fase === 'modulo' && (
              <>
                <div style={s.progressBar}>
                  <div style={{ ...s.progressFill, width: `${((moduloActivo + 1) / cursoActivo.modulos.length) * 100}%` }} />
                </div>
                <div style={{ fontSize: '.72rem', color: '#7A5F55', marginBottom: '.75rem' }}>Modulo {moduloActivo + 1} de {cursoActivo.modulos.length}</div>
                <div style={{ ...s.modalTitle, fontSize: '1.1rem' }}>{cursoActivo.modulos[moduloActivo].titulo}</div>
                <div style={s.moduloTexto}>{cursoActivo.modulos[moduloActivo].texto}</div>
                <div style={s.ejercicioBox}>
                  <div style={s.ejercicioLabel}>Ejercicio practico</div>
                  <div style={{ fontSize: '.85rem', lineHeight: 1.65, color: '#2C2420' }}>{cursoActivo.modulos[moduloActivo].ejercicio}</div>
                </div>
                <div style={{ display: 'flex', gap: '.75rem' }}>
                  {moduloActivo > 0 && <button style={{ ...s.btnSecondary, flex: 1 }} onClick={() => setModuloActivo(moduloActivo - 1)}>Anterior</button>}
                  <button style={{ ...s.btnPrimary, flex: 2, marginTop: 0 }} onClick={siguienteModulo}>
                    {moduloActivo < cursoActivo.modulos.length - 1 ? 'Siguiente modulo' : 'Ir al quiz'}
                  </button>
                </div>
              </>
            )}

            {fase === 'quiz' && (
              <>
                <div style={{ ...s.modalTitle, marginBottom: '1rem' }}>Quiz final</div>
                {cursoActivo.quiz.map((q, qi) => (
                  <div key={qi} style={s.quizCard}>
                    <div style={s.quizPregunta}>{qi + 1}. {q.pregunta}</div>
                    {q.opciones.map((op, oi) => (
                      <button key={oi} style={s.opcion(respuestas[qi] === oi, q.correcta === oi, quizEnviado, oi, q.correcta)} onClick={() => responder(qi, oi)}>
                        {op}
                      </button>
                    ))}
                  </div>
                ))}
                {!quizEnviado ? (
                  <button style={{ ...s.btnPrimary, marginTop: '.5rem' }} onClick={enviarQuiz} disabled={Object.keys(respuestas).length < cursoActivo.quiz.length}>
                    Enviar respuestas
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1rem', background: puntajeQuiz() >= Math.ceil(cursoActivo.quiz.length * 0.6) ? 'rgba(46,125,94,.08)' : 'rgba(226,75,74,.06)', borderRadius: '12px', marginTop: '.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: puntajeQuiz() >= Math.ceil(cursoActivo.quiz.length * 0.6) ? '#2E7D5E' : '#E24B4A' }}>
                      {puntajeQuiz()} / {cursoActivo.quiz.length} correctas
                    </div>
                    <div style={{ fontSize: '.82rem', color: '#7A5F55', marginTop: '.25rem' }}>
                      {puntajeQuiz() >= Math.ceil(cursoActivo.quiz.length * 0.6) ? 'Aprobado! Preparando tu certificado...' : 'Repasa los modulos e intentalo de nuevo'}
                    </div>
                  </div>
                )}
              </>
            )}

{fase === 'certificado' && (
  <div style={s.certBox}>
    <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>{cursoActivo.medalla}</div>
    <div style={{ ...s.modalTitle, fontSize: '1.3rem' }}>Felicitaciones!</div>
    <div style={{ color: '#7A5F55', fontSize: '.88rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
      Completaste <strong>{cursoActivo.titulo}</strong>.<br/>Tu medalla ya aparece en tu perfil.
    </div>
    {!enviado ? (
      <>
        <input style={s.input} placeholder="Tu nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} />
        <button style={{ ...s.btnPrimary, marginTop: 0 }} onClick={() => { guardarMedalla(); generarPDF(); setEnviado(true); }} disabled={!nombre}>
          Descargar certificado y guardar medalla
        </button>
      </>
    ) : (
      <div style={{ background: 'rgba(46,125,94,.08)', borderRadius: '14px', padding: '1.5rem' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>✓</div>
        <div style={{ fontWeight: 600, color: '#2E7D5E', marginBottom: '.25rem' }}>Certificado descargado</div>
        <div style={{ fontSize: '.82rem', color: '#7A5F55' }}>El PDF se guardo en tu dispositivo y tu medalla ya esta en el perfil.</div>
        <button style={{ ...s.btnPrimary, marginTop: '1rem', background: '#9CAFB7' }} onClick={cerrarCurso}>Volver a cursos</button>
      </div>
    )}
  </div>
)}
          </div>
        </div>
      )}
    </div>
  );
}