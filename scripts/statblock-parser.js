// ============================================================================
// DnD 5e - Traduzione Italina
// File: statblock-parser.js
// ============================================================================

console.log("STATBLOCK: file caricato");

const damageTypes = {
  acid: "Acido",
  bludgeoning: "Contundente",
  cold: "Freddo",
  fire: "Fuoco",
  force: "Forza",
  lightning: "Fulmine",
  necrotic: "Necrotico",
  piercing: "Perforante",
  poison: "Veleno",
  psychic: "Psichico",
  radiant: "Radioso",
  slashing: "Tagliente",
  thunder: "Tuono"
};

const conditionTypes = {
  blinded: "Accecato",
  charmed: "Affascinato",
  deafened: "Assordato",
  frightened: "Spaventato",
  grappled: "Afferrato",
  incapacitated: "Incapacitato",
  invisible: "Invisibile",
  paralyzed: "Paralizzato",
  petrified: "Pietrificato",
  poisoned: "Avvelenato",
  prone: "Prono",
  restrained: "Intrappolato",
  stunned: "Stordito",
  unconscious: "Incosciente",
  exhaustion: "Sfinimento"
};

const subtypeLabels = {
  "Any Race": "Qualsiasi Razza",
  Asimar: "Aasimar",
  Bugbear: "Bugbear",
  Centaur: "Centauro",
  Changeling: "Mutaforma",
  Deepgnome: "Gnomo delle Profondità",
  Duergar: "Duergar",
  Eladrin: "Eladrin",
  Firbolg: "Firbolg",
  Genasi: "Genasi",
  Githyanki: "Githyanki",
  Githzerai: "Githzerai",
  Goblin: "Goblin",
  Goliath: "Goliath",
  Harengon: "Harengon",
  Hobgoblin: "Hobgoblin",
  Kalashtar: "Kalashtar",
  Kenku: "Kenku",
  Kobold: "Coboldo",
  Lizardfolk: "Lucertoloide",
  Minotaur: "Minotauro",
  Orc: "Orco",
  Satyr: "Satiro",
  Seaelf: "Elfo del Mare",
  Shadarkai: "Shadar-Kai",
  Shifter: "Mutapelle",
  Tabaxi: "Tabaxi",
  Tiefling: "Tiefling",
  Tortle: "Tortle",
  Triton: "Tritone",
  Yuanti: "Yuan-ti",
  Warforged: "Forgiato",
  Gnome: "Gnomo",
  Dwarf: "Nano",
  Elf: "Elfo",
  Halfling: "Halfling",
  Human: "Umano",
  Dragonborn: "Dragonide",
  Demon: "Demone",
  Devil: "Diavolo",
  Yugoloth: "Yugoloth",
  Zombie: "Zombie",
  Skeleton: "Scheletro",
  Vampire: "Vampiro",
  Lycanthrope: "Licantropo",
  Werewolf: "Licantropo (Lupo Mannaro)",
  Wererat: "Licantropo (Ratto Mannaro)",
  Werebear: "Licantropo (Orso Mannaro)",
  Merfolk: "Tritone",
  Giant: "Gigante",
  Goblinoid: "Goblinoide",
  Shapechanger: "Mutaforma"
};

const senseLabels = {
  blindsight: "Vista Cieca",
  darkvision: "Scurovisione",
  tremorsense: "Senso del Tremore",
  truesight: "Visione del Vero",
  special: "Speciale"
};

const typeLabels = {
  aberration: "Aberrazione",
  beast: "Bestia",
  celestial: "Celestiale",
  construct: "Costrutto",
  dragon: "Drago",
  elemental: "Elementale",
  fey: "Fata",
  fiend: "Demone",
  giant: "Gigante",
  humanoid: "Umanoide",
  monstrosity: "Mostruosità",
  ooze: "Melma",
  plant: "Pianta",
  undead: "Non Morto"
};

const sizeLabels = {
  tiny: "Minuscola",
  sm: "Piccola",
  med: "Media",
  lg: "Grande",
  huge: "Enorme",
  grg: "Garganuesca"
};

const alignments = {
  "chaotic evil": "Caotico Malvagio",
  "chaotic neutral":"Caotico Neutrale",
  "chaotic good":"Caotico Buono",
  "neutral evil":"Neutrale Malvagio",
  "true neutral":"Neutrale",
  "neutral":"Neutrale",
  "neutral good":"Neutre Buono",
  "lawful evil":"Legale Malvagio",
  "lawful neutral":"Legale Neutrale",
  "lawful good":"Legale Buono",
  "chaotic good evil":"Caotico Buono/Malvagio",
  "lawful chaotic evil":"Legale/Caotico Malvagio",
  "unaligned":"Senza Allineamento",
  "any non-lawful": "Qualsiasi non legale",
  "any": "Qualsiasi",
  "Any Alignment": "Qualsiasi Allineamento",
  "Any Non-Lawful Alignment": "Qualsiasi Allineamento non Legale"
};

const languages = {
  "giant eagle": "Acquila Gigante",
  "worg":"Worg",
  "winter wolf":"Lupo Artico",
  "sahuagin":"Sahuagin",
  "giant owl, understands but cannot speak all but giant owl":"gufo gigante, capisce tutto ma non può parlare tranne che in gigante",
  "giant elk but can't speak them":"alce gigante ma non può parlare loro",
  "understands infernal but can't speak it":"capisce l'infernale ma non può parlare",
  "understands draconic but can't speak":"capisce il draconico ma non può parlare",
  "understands common but doesn't speak it":"capisce il comune ma non può parlare",
  "understands abyssal but can't speak":"capisce l'abissale ma non può parlare",
  "understands all languages it knew in life but can't speak":"capisce tutte le lingue che conosceva in vita ma non sa parlare",
  "understands commands given in any language but can't speak":"capisce i comandi dati in qualsiasi lingua ma non sa parlare",
  "(can't speak in rat form)":"(non può parlare in forma di ratto)",
  "(can't speak in boar form)":"(non può parlare in forma di cinghiale)",
  "(can't speak in bear form)":"(non può parlare in forma d'orso)",
  "(can't speak in tiger form)":"(non può parlare in forma di tigre)",
  "any one language (usually common)":"uno quasiasi, normalmente il comune",
  "any two languages":"2 linguaggi qualsiasi",
  "any four languages":"4 linguaggi qualsiasi",
  "5 other languages":"5 altri linguaggi",
  "any, usually common":"quasiasi, normalmente il comune",
  "one language known by its creator":"un linguaggio conosciuto dal suo creatore",
  "the languages it knew in life":"i linguaggi che conosceva in vita",
  "those it knew in life":"i linguaggi che conosceva in vita",
  "all it knew in life":"i linguaggi che conosceva in vita",
  "any it knew in life":"i linguaggi che conosceva in vita",
  "all, telepathy 120 ft.":"tutti, telepatia 36m",
  "telepathy 60 ft.":"telepatia 18m",
  "telepathy 60ft. (works only with creatures that understand abyssal)":"telepatia 18m (solo per creature che capiscono l'abissale)",
  "telepathy 120 ft.":"telepatia 36m",
  "but can't speak":"ma non può parlare",
  "but can't speak it":"ma non può parlare",
  "choice":"a scelta",
  "understands the languages of its creator but can't speak":"capisce le lingue del suo creatore ma non sa parlare",
  "understands common and giant but can't speak":"capisce il comune e il gigante ma non sa parlare",
  "cannot speak": "Non parla"
};

// ------------------------------------------------------------
//  HOOKS JOURNAL
// ------------------------------------------------------------

const JOURNAL_HOOKS = [
  "renderJournalSheet",
  "renderJournalPageSheet",
  "renderJournalTextPageSheet",
  "renderJournalEntryPageSheet",
  "renderJournalImagePageSheet",
  "renderJournalEntrySheet5e"
];

for (const hook of JOURNAL_HOOKS) {
  Hooks.on(hook, (app, html) => {
    console.log("STATBLOCK: hook triggered =", hook);
    statblockProcess(app, html);
  });
}

// ------------------------------------------------------------
//  PROCESSORE PRINCIPALE
// ------------------------------------------------------------

function statblockProcess(app, html) {
  console.log("STATBLOCK: statblockProcess triggered");

  if (!html) return;

  const root = html[0] ?? html;
  if (!root || !root.querySelector) return;

  const content = root.querySelector(
    ".journal-page-content, .journal-entry-page, .editor-content, .journal-entry-content"
  );

  console.log("STATBLOCK: content =", content);
  if (!content) return;

  const text = content.innerHTML;
  const matches = [...text.matchAll(/@Statblock\[(.*?)\](?:{(.*?)})?/g)]; 

  console.log("STATBLOCK: matches =", matches);
  if (!matches.length) return;

  for (const match of matches) {
    const query = match[1].trim();
    console.log("STATBLOCK: query =", query);

    const actor =
      fromUuidSync(query) ||
      game.actors.get(query) ||
      game.actors.getName(query);

    console.log("STATBLOCK: actor =", actor);
    if (!actor) continue;

    const block = renderStatblock(actor);
    content.innerHTML = content.innerHTML.replace(match[0], block);
  }
}

// ------------------------------------------------------------
//  RENDERER STATBLOCK
// ------------------------------------------------------------

function renderStatblock(actor) {
  const s = actor.system;
  const abilities = s.abilities;

  // Mod e TS (gestiamo sia numero che oggetto)
  function abilityRow(key, label) {
  const abil = abilities[key];
  const score = abil.value ?? 10;
  const mod = abil.mod ?? Math.floor((score - 10) / 2);

  const save = abil.save?.value ?? mod;

  return `
    <tr>
      <th>${label}</th>
      <td>${score}</td>
      <td class="modifier">
        <a class="sb-roll-ability" data-ability="${key}" data-uuid="${actor.uuid}">
        ${mod >= 0 ? "+" : ""}${mod}
      </a>
      </td>
      <td class="modifier">
        <a class="sb-roll-save" data-ability="${key}" data-uuid="${actor.uuid}">
        ${save >= 0 ? "+" : ""}${save}
        </a>
      </td>
    </tr>
  `;
}


  const skillsBlock = renderSkills(actor); // già esistente
  const defenses = renderDefenses(s.traits);
  const sensesBlock = renderSenses(s.attributes.senses, actor);
  const languagesBlock = renderLanguagesBlock(s.traits.languages);
  const crpbBlock = renderCRPB(s.details.cr, s.attributes.prof);

  return `
  <div class="mon-stat-block-2024">
    <div class="mon-stat-block-2024__container">
    <div class="mon-stat-block-2024__header">
      <div class="mon-stat-block-2024__name">
        <a class="mon-stat-block-2024__name-link" data-uuid="${actor.uuid}">
          ${actor.name}
        </a>
      </div>
    </div>
    
    <div class="mon-stat-block-2024__portrait">
      <img src="${actor.img}" alt="${actor.name}">
    </div>

    <div class="mon-stat-block-2024__meta">
      ${translateSizeLabel(s.traits.size)} ${translateTypeLabel(s.details.type?.value)}, ${translateAlignmentLabel(s.details.alignment)}
    </div>
    
    <div class="mon-stat-block-2024__attributes">
      <div class="mon-stat-block-2024__attribute">
        <span class="mon-stat-block-2024__attribute-label">CA</span>
        <span class="mon-stat-block-2024__attribute-value">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${s.attributes.ac.value}
          </span>
          ${s.attributes.ac.label ? `<span class="mon-stat-block-2024__attribute-data-extra">(${s.attributes.ac.label})</span>` : ""}
        </span>&nbsp;&nbsp;
        <span class="mon-stat-block-2024__attribute-label">Iniziativa</span>
        <span class="mon-stat-block-2024__attribute-data">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${s.attributes.init?.total >= 0 ? "+" : ""}${s.attributes.init?.total ?? 0}
          </span>
        </span>
      </div>

      <div class="mon-stat-block-2024__attribute">
        <span class="mon-stat-block-2024__attribute-label">PF</span>
        <span class="mon-stat-block-2024__attribute-data">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${s.attributes.hp.value}
          </span>
          <span class="mon-stat-block-2024__attribute-data-extra">
            (${hpFormula(s)})
          </span>
        </span>
      </div>

      <div class="mon-stat-block-2024__attribute">
        <span class="mon-stat-block-2024__attribute-label">Velocità</span>
        <span class="mon-stat-block-2024__attribute-data">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${renderSpeed(s.attributes.movement)}
          </span>
        </span>
      </div>
    </div>

    <div class="mon-stat-block-2024__stats">
      <table class="stat-table physical">
        <thead>
          <tr>
            <th></th><th></th><th>Mod</th><th>TS</th>
          </tr>
        </thead>
        <tbody>
          ${abilityRow("str", "FOR")}
          ${abilityRow("dex", "DES")}
          ${abilityRow("con", "COS")}
        </tbody>
      </table>
      <table class="stat-table mental">
        <thead>
          <tr>
            <th></th><th></th><th>Mod</th><th>TS</th>
          </tr>
        </thead>
        <tbody>
          ${abilityRow("int", "INT")}
          ${abilityRow("wis", "SAG")}
          ${abilityRow("cha", "CAR")}
        </tbody>
      </table>
    </div>

    <div class="mon-stat-block-2024__tidbits">
      ${skillsBlock ? `
      <div class="mon-stat-block-2024__tidbit">
        <span class="mon-stat-block-2024__tidbit-label">Abilità</span>
        <span class="mon-stat-block-2024__tidbit-data">
          ${skillsBlock.replace('<div class="sb-block"><strong>Abilità</strong> ', "").replace("</div>", "")}
        </span>
      </div>` : ""}

      ${sensesBlock ? `
      <div class="mon-stat-block-2024__tidbit">
        <span class="mon-stat-block-2024__tidbit-label">Sensi</span>
        <span class="mon-stat-block-2024__tidbit-data">
          ${sensesBlock.replace('<div class="sb-block"><strong>Sensi</strong> ', "").replace("</div>", "")}
        </span>
      </div>` : ""}
      
      ${defenses.di ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">Immunità ai danni</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.di}
    </span>
  </div>` : ""}

${defenses.dr ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">Resistenze</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.dr}
    </span>
  </div>` : ""}

${defenses.dv ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">Vulnerabilità</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.dv}
    </span>
  </div>` : ""}

${defenses.ci ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">Immunità alle condizioni</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.ci}
    </span>
  </div>` : ""}


      ${languagesBlock ? `
      <div class="mon-stat-block-2024__tidbit">
        <span class="mon-stat-block-2024__tidbit-label">Linguaggi</span>
        <span class="mon-stat-block-2024__tidbit-data">
          ${languagesBlock.replace('<div class="sb-block"><strong>Linguaggi</strong> ', "").replace("</div>", "")}
        </span>
      </div>` : ""}

      ${crpbBlock ? `
      <div class="mon-stat-block-2024__tidbit-container">
        <div class="mon-stat-block-2024__tidbit">
          <span class="mon-stat-block-2024__tidbit-label">GS</span>
          <span class="mon-stat-block-2024__tidbit-data">
            ${crpbBlock.replace('<div class="sb-block"><strong>GS</strong> ', "").replace("</div>", "")}
          </span>
        </div>
      </div>` : ""}
    </div>
    </div>
  </div>
  `;
}

// ------------------------------------------------------------
//  FUNZIONI DI SUPPORTO
// ------------------------------------------------------------

function hpFormula(s) {
  if (s.attributes.hp.formula) return s.attributes.hp.formula;
  const hd = s.attributes.hd;
  if (hd?.max && hd?.denomination) {
    const avg = Math.floor((hd.denomination + 1) / 2);
    const bonus = s.attributes.hp.max - (hd.max * avg);
    const bonusStr = bonus ? (bonus >= 0 ? ` + ${bonus}` : ` - ${Math.abs(bonus)}`) : "";
    return `${hd.max}d${hd.denomination}${bonusStr}`;
  }
  return `${s.attributes.hp.max}`;
}

function renderSpeed(m) {
  const parts = [];
  if (m.walk) parts.push(`${m.walk} m`);
  if (m.fly) parts.push(`volare ${m.fly} m`);
  if (m.swim) parts.push(`nuotare ${m.swim} m`);
  if (m.climb) parts.push(`scalare ${m.climb} m`);
  if (m.burrow) parts.push(`scavare ${m.burrow} m`);
  return parts.join(", ");
}

function renderAbilitiesAndSaves(a) {
  const order = ["str", "dex", "con", "int", "wis", "cha"];
  const labels = { str: "FOR", dex: "DES", con: "COS", int: "INT", wis: "SAG", cha: "CAR" };

  const rows = order.map(k => {
    const v = a[k].value;
    const mod = a[k].mod ?? Math.floor((v - 10) / 2);
    const save = a[k].save ?? mod;
    return `
      <div class="sb-ability-row">
        <div class="sb-ability-name">${labels[k]}</div>
        <div class="sb-ability-val">${v} (${mod >= 0 ? "+" : ""}${mod})</div>
        <div class="sb-ability-save">TS ${save >= 0 ? "+" : ""}${save}</div>
      </div>
    `;
  }).join("");

  return `
  <div class="sb-abilities-wrap">
    <div class="sb-abilities-title">Caratteristiche e Tiri Salvezza</div>
    <div class="sb-abilities">${rows}</div>
  </div>`;
}

function renderSkills(actor) {
  const skills = actor.system.skills;

  const list = Object.entries(skills)
    .filter(([_, v]) => v.proficient > 0)
    .map(([k, v]) => {
      const label = CONFIG.DND5E.skills[k]?.label ?? k;
      return `
        <a class="sb-roll-skill" data-skill="${k}" data-uuid="${actor.uuid}">
        ${label} ${v.total >= 0 ? "+" : ""}${v.total}
        </a>
      `;
    })
    .join(", ");

  return list ? `<div class="sb-block"><strong>Abilità</strong> ${list}</div>` : "";
}

function renderDefenses(t) {
  const di = Array.from(t.di?.value ?? []).map(v => damageTypes[v] ?? v);
  const dr = Array.from(t.dr?.value ?? []).map(v => damageTypes[v] ?? v);
  const dv = Array.from(t.dv?.value ?? []).map(v => damageTypes[v] ?? v);
  const ci = Array.from(t.ci?.value ?? []).map(v => conditionTypes[v] ?? v);

  return {
    di: di.length ? di.join(", ") : "",
    dr: dr.length ? dr.join(", ") : "",
    dv: dv.length ? dv.join(", ") : "",
    ci: ci.length ? ci.join(", ") : ""
  };
}

function renderSenses(s, actor) {
  const parts = [];
  if (s.blindsight) parts.push(`${senseLabels.blindsight} ${s.blindsight} m`);
  if (s.darkvision) parts.push(`${senseLabels.darkvision} ${s.darkvision} m`);
  if (s.tremorsense) parts.push(`${senseLabels.tremorsense} ${s.tremorsense} m`);
  if (s.truesight) parts.push(`${senseLabels.truesight} ${s.truesight} m`);

  const passive = actor.system.skills.prc?.passive;
  if (passive !== undefined) parts.push(`Percezione Passiva ${passive}`);

  return `<div class="sb-block"><strong>Sensi</strong> ${parts.join(", ")}</div>`;
}

function renderLanguagesBlock(traitsLang) {
  if (!traitsLang) return "";
  const labels = traitsLang.labels?.languages ?? [];
  const custom = traitsLang.custom ? [traitsLang.custom] : [];
  const all = [...labels, ...custom];
  if (!all.length) return "";
  return `<div class="sb-block"><strong>Linguaggi</strong> ${all.join(", ")}</div>`;
}


function renderCRPB(cr, pb) {
  return `<div class="sb-block"><strong>GS</strong> ${cr ?? "-"} (PB ${pb >= 0 ? "+" : ""}${pb})</div>`;
}

// ------------------------------------------------------------
//  TRADUZIONI
// ------------------------------------------------------------

function translateSizeLabel(size) {
  return sizeLabels[size] || size || "";
}

function translateTypeLabel(type) {
  return typeLabels[type] || type || "Creatura";
}

function translateAlignmentLabel(a) {
  if (!a) return "";
  return alignments[a.toLowerCase()] || a;
}

Hooks.on("ready", () => {
  document.addEventListener("click", async event => {
    const link = event.target.closest(".mon-stat-block-2024__name-link");
    if (!link) return;

    const uuid = link.dataset.uuid;
    if (!uuid) return;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.sheet.render(true);
  });
});

// --- Listener tiri statblock ---
Hooks.on("ready", () => {

  // --- Tiro Salvezza ---
  document.addEventListener("click", async event => {
    const el = event.target.closest(".sb-roll-save");
    if (!el) return;

    const uuid = el.dataset.uuid;
    const ability = el.dataset.ability;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.rollSavingThrow({ ability }, {}, {});
  });

  // --- Caratteristica pura ---
  document.addEventListener("click", async event => {
    const el = event.target.closest(".sb-roll-ability");
    if (!el) return;

    const uuid = el.dataset.uuid;
    const ability = el.dataset.ability;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.rollAbilityCheck({ ability }, {}, {});
  });

  // --- Abilità ---
  document.addEventListener("click", async event => {
    const el = event.target.closest(".sb-roll-skill");
    if (!el) return;

    const uuid = el.dataset.uuid;
    const skill = el.dataset.skill;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.rollSkill({ skill }, {}, {});
  });

});
