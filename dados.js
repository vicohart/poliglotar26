/* Poliglotar 26 — shared data for index.html and painel.html.
 *
 * The 13 Fluency languages are verified in NF source:
 * rest_api/gamification/data/game2_items.py :: SUPPORTED_GAME2_ITEM_LANGUAGE_CODES
 *
 * DIFFICULTY MODEL — read this before arguing with a number.
 *
 * horasB2 = estimated hours of study for a PORTUGUESE speaker to reach B2.
 *   Base is the FSI category system (built for English speakers) shifted for a
 *   Portuguese speaker: Romance languages drop a lot, everything else roughly holds.
 *   These are estimates, not measurements. They are the most arguable numbers here.
 *
 * From horasB2 we derive hours to C2, because the micro-level ladder runs to C2.10:
 *   cumulative share of total-hours-to-C2 at B2 = 58%  ->  horasC2 = horasB2 / 0.58
 *
 * Band weights (share of total hours to C2). Lower bands are narrower, which is why
 * a Pre-A1 micro-level is worth far less time than a C2 one — the NF doc puts that
 * ratio at ~4x and this table gives ~4.4x, so the two agree.
 *   Pre-A1 5% · A1 9% · A2 10% · B1 16% · B2 18% · C1 20% · C2 22%
 *
 * Each band holds 10 micro-levels (70 total, Pre-A1.1 -> C2.10).
 * We rate everyone at the B1 band rate:  horasPorMicro = 0.16 * horasC2 / 10
 *   - It is mid-scale, and most people in a study group sit between A2 and B2.
 *   - It is CONSERVATIVE for beginners, who move through the narrow early bands
 *     much faster. They will beat the estimate, which is the direction we want.
 *
 * SANITY CHECK: Japanese lands at ~3,790 h to C2. The gamification doc anchors
 * Lenda (300k points, ~3,000 engaged hours) to "roughly one hard language from
 * zero to C2". Same order of magnitude, independently derived. Good.
 */

/* ============================================================
   O EVENTO — mude isto e o resto se ajusta. Para a próxima feira,
   estas linhas são a única coisa que precisa ser tocada.
   ============================================================ */
const EVENTO = {
  nome:      "Poliglotar",
  ano:       "26",
  comunidade:"POLIGLOTAR26",
  quando:    "sábado, dia 19, às 16h",
  titulo:    "O Poliglotar não acaba no domingo",
  // URL público desta página de captação. Entra no painel (tela 0) e no QR.
  // NÃO gere o QR antes de este valor estar definitivo.
  urlCaptura:"https://poliglotar26.vercel.app",
  // Endpoint do Apps Script (POST grava, GET devolve tudo).
  urlApi:    "https://script.google.com/macros/s/AKfycbzN1S79Cqia2YtJjDqLN3-wmZduHIwr3AaGIGMvCETLVu43BiRTnqafcTlFcCMe0lND/exec",
};

const CUMULATIVO_B2 = 0.58;        // share of hours-to-C2 already spent at B2
const PESO_BANDA_B1 = 0.16;        // B1's share of hours-to-C2
const MICRO_POR_BANDA = 10;

/* The 13 Fluency languages. `horasB2` is for a Portuguese speaker. */
const IDIOMAS_FLUENCY = [
  { cod: "es", nome: "Espanhol",   horasB2:  250 },
  { cod: "it", nome: "Italiano",   horasB2:  350 },
  { cod: "fr", nome: "Francês",    horasB2:  450 },
  { cod: "en", nome: "Inglês",     horasB2:  600 },
  { cod: "de", nome: "Alemão",     horasB2:  750 },
  { cod: "pl", nome: "Polonês",    horasB2: 1100 },
  { cod: "cs", nome: "Tcheco",     horasB2: 1100 },
  { cod: "ru", nome: "Russo",      horasB2: 1100 },
  { cod: "hi", nome: "Híndi",      horasB2: 1100 },
  { cod: "ja", nome: "Japonês",    horasB2: 2200 },
  { cod: "ko", nome: "Coreano",    horasB2: 2200 },
  { cod: "zh", nome: "Chinês",     horasB2: 2200 },
  /* Portuguese is on the list for the foreigners in the room. The hours figure
     assumes a Spanish or English speaking learner; for anyone else it is wrong,
     and that is acceptable for a handful of people. */
  { cod: "pt", nome: "Português",  horasB2:  350 },
];

/* Languages Fluency does NOT have yet. These feed the "which language do we add"
   result. The list is deliberately broad and ends in a free-text field, because
   the point is to discover what we are missing.

   TEST BEFORE ADDING ONE (Victor, 2026-09-14 — the first version of this list
   failed all three and included Libras, a SIGNED language, in a spoken-
   conversation product):
     1. Azure has a neural voice AND speech-to-text for it. Verified against
        learn.microsoft.com/azure/ai-services/speech-service/language-support
        on 2026-09-14. No voice, no offer.
     2. It is genuinely CONVERSATIONAL — normally spoken between two people.
        Rules out Latin, and rules out signed languages entirely.
     3. Real speaker base OR real study demand. One of the two is enough:
        Bengali qualifies on speakers, Irish qualifies purely on demand.

   Removed for failing the test: Libras (signed), Latim (not conversational),
   Esperanto (no Azure voice). Guarani also has no Azure voice — it arrives
   through the free-text field instead, which is the honest way to hear it. */
const IDIOMAS_OUTROS = [
  { cod: "ar", nome: "Árabe",      horasB2: 2200 },
  { cod: "bn", nome: "Bengali",    horasB2: 1100 },
  { cod: "ur", nome: "Urdu",       horasB2: 1100 },
  { cod: "fa", nome: "Persa",      horasB2: 1100 },
  { cod: "yue",nome: "Cantonês",   horasB2: 2200 },
  { cod: "tr", nome: "Turco",      horasB2: 1100 },
  { cod: "el", nome: "Grego",      horasB2: 1100 },
  { cod: "he", nome: "Hebraico",   horasB2: 1100 },
  { cod: "uk", nome: "Ucraniano",  horasB2: 1100 },
  { cod: "nl", nome: "Holandês",   horasB2:  600 },
  { cod: "sv", nome: "Sueco",      horasB2:  650 },
  { cod: "no", nome: "Norueguês",  horasB2:  650 },
  { cod: "da", nome: "Dinamarquês",horasB2:  650 },
  { cod: "fi", nome: "Finlandês",  horasB2: 1100 },
  { cod: "hu", nome: "Húngaro",    horasB2: 1100 },
  { cod: "ro", nome: "Romeno",     horasB2:  400 },
  { cod: "ca", nome: "Catalão",    horasB2:  300 },
  { cod: "ga", nome: "Irlandês",   horasB2:  900 },
  { cod: "th", nome: "Tailandês",  horasB2: 1400 },
  { cod: "vi", nome: "Vietnamita", horasB2: 1400 },
  { cod: "id", nome: "Indonésio",  horasB2:  700 },
  { cod: "sw", nome: "Suaíli",     horasB2:  900 },
];

const TODOS_IDIOMAS = [...IDIOMAS_FLUENCY, ...IDIOMAS_OUTROS];

/* Usado dos dois lados para casar o que a pessoa escreve com o que já existe.
   Sem isto, quem DIGITA "Turco" cria uma entrada separada de quem TOCA no chip
   Turco — e o mesmo idioma se parte em dois, sem nenhum dos dois atingir o
   limite de 5 pessoas. */
const normalizar = t => String(t || "").trim().toLowerCase()
  .normalize("NFD").replace(/[̀-ͯ]/g, "");

function acharIdioma(texto){
  const n = normalizar(texto);
  if (!n) return null;
  return TODOS_IDIOMAS.find(i => normalizar(i.nome) === n || i.cod === n)
      || TODOS_IDIOMAS.find(i => normalizar(i.nome).startsWith(n) && n.length >= 3)
      || null;
}
const POR_CODIGO = Object.fromEntries(TODOS_IDIOMAS.map(i => [i.cod, i]));
const EH_FLUENCY = new Set(IDIOMAS_FLUENCY.map(i => i.cod));

/* ---- the three conservatism factors, all tunable in one place ---- */
const FATORES = {
  realismo:      0.5,   // people study about half of what they declare
  participacao:  0.5,   // half will take no Natural Fluency classes at all
  fatiaAulas:    0.25,  // of the rest, this share goes to NF class time
};
/* Class-time goal keeps all three: 0.5 * 0.5 * 0.25 = 6.25% of declared.
   Level estimate keeps only the first two: 0.5 * 0.5 = 25% of declared,
   because levels move on ALL study, not only on Fluency classes. */

/* Horas legíveis. "1.3 h" é unidade de engenheiro; ninguém pensa assim.
   Arredonda para 5 minutos porque isto é uma META, não uma medição. */
function horasBonito(h) {
  if (!h || h < 0) return "0";
  var min = Math.round(h * 60 / 5) * 5;
  if (min < 60) return min + " min";
  var hh = Math.floor(min / 60), mm = min % 60;
  return mm ? hh + "h" + String(mm).padStart(2, "0") : hh + "h";
}

/* Níveis são PREVISÃO, não meta. O conservadorismo já está nos fatores
   (25% do declarado); arredondar para baixo de novo seria contar duas vezes,
   e uma previsão baixa demais desmotiva — o contrário do objetivo da tela. */
function niveisBonito(n) {
  if (!n || n < 0.5) return "menos de 1";
  return "+" + Math.round(n);
}

function horasPorMicroNivel(cod) {
  const idioma = POR_CODIGO[cod];
  if (!idioma) return null;
  const horasC2 = idioma.horasB2 / CUMULATIVO_B2;
  return (PESO_BANDA_B1 * horasC2) / MICRO_POR_BANDA;
}

/* minutosDia: total declared for this language, summed across the group.
   pessoas: how many people declared it. */
function metaAulasMensalPorPessoa(minutosDiaGrupo, pessoas) {
  if (!pessoas) return 0;
  const horasMes = (minutosDiaGrupo / 60) * 30;
  const efetivo = horasMes * FATORES.realismo * FATORES.participacao * FATORES.fatiaAulas;
  return efetivo / pessoas;
}

function microNiveisAno(cod, minutosDiaGrupo, pessoas) {
  const hpm = horasPorMicroNivel(cod);
  if (!hpm || !pessoas) return 0;
  const horasAno = (minutosDiaGrupo / 60) * 365;
  const efetivo = horasAno * FATORES.realismo * FATORES.participacao;
  return (efetivo / pessoas) / hpm;
}

/* Thresholds, per Victor 2026-09-14. */
const LIMITE_FLUENCY = 2;   // an existing Fluency language: 2 people -> study group now
const LIMITE_NOVO    = 5;   // a language we do not have: 5 members -> added by end of October
const TOP_NOVOS      = 3;   // plus the top 3 regardless of count

if (typeof module !== "undefined") {
  module.exports = {
    EVENTO, normalizar, acharIdioma, IDIOMAS_FLUENCY, IDIOMAS_OUTROS, TODOS_IDIOMAS, POR_CODIGO, EH_FLUENCY,
    FATORES, horasBonito, niveisBonito, horasPorMicroNivel, metaAulasMensalPorPessoa, microNiveisAno,
    LIMITE_FLUENCY, LIMITE_NOVO, TOP_NOVOS,
  };
}
