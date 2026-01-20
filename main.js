var alignments = {
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
};

var languages = {
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

function roundToTwoDecimals(num) {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
}
function lbToKg(lb) { if(!lb) return lb; return roundToTwoDecimals(Number(lb) / 2); }
function footsToMeters(ft) { if(!ft) return ft; return roundToTwoDecimals(Number(ft) * 0.3); }
function milesToMeters(mi) { if(!mi) return mi; return roundToTwoDecimals(Number(mi) * 1.5); }

function convertEnabled() {
  return game.settings.get("dnd5e-it-translation", "convert");
}
function setEncumbranceData() {
  let convert = convertEnabled();
  game.settings.set("dnd5e", "metricWeightUnits", convert);
}

class OpenCompendiumMenu extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "open-compendium-menu",
      title: "Macro del Modulo",
      width: 100,
      height: 100
    });
  }
  async render(force=false, options={}) {
    const pack = game.packs.get("dnd5e-it-translation.macro"); // <-- link al compendio di macro
    if (pack) pack.render(true);
    else ui.notifications.error("Compendio non trovato!");
    return super.render(force, options);
  }
}

Hooks.once('init', () => {
  // Impostazioni conversione
  game.settings.register("dnd5e-it-translation", "convert", {
    name: "Conversione Automatica",
    hint: "Applica automaticamente la conversione da sistema imperiale a metrico",
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: convert => setEncumbranceData()
  });
  game.settings.register("dnd5e-it-translation", "convertScenes", {
    name: "Converti nuove Scene",
    int: "Applica automaticamente il sistema metrico alle nuove scene",
    scope: "world",
    type: Boolean,
    default: false,
    config: true
  });
  game.settings.register("dnd5e-it-translation", "convertActors", {
    name: "Converti nuovi Attori",
    int: "Applica automaticamente il sistema metrico ai nuovi attori creati. Non funziona con gli attori importati, per quelli usare le macro nel compendio",
    scope: "world",
    type: Boolean,
    default: false,
    config: true
  });
  game.settings.register("dnd5e-it-translation", "convertItems", {
    name: "Converti nuovi Incantesimi",
    int: "Applica automaticamente il sistema metrico ai nuovi incantesimi creati. Non funziona con gli incatesimi importati, per quelli usare le macro nel compendio",
    scope: "world",
    type: Boolean,
    default: false,
    config: true
  });
  // Impostazioni notifica macro
  game.settings.registerMenu("dnd5e-it-translation", "infoMacros", {
    name: "Nota sulle macro",
    label: "Apri Compendio Macro",
    hint: "Nel caso attori, incantesimi e oggetti non venissero convertiti in automatico o siano stati creati/importati in precedenza, usare le macro che si trovano nel compendio di questo modulo.",
    icon: "fas fa-info-circle",
    type: OpenCompendiumMenu,
    restricted: false
  });

  // Registrazione Babele
  Babele.get().register({
    module: 'dnd5e-it-translation',
    lang: 'it',
    dir: "compendium",
    entries: {
      "dnd5e.rules": "dnd5e.rules.json"
    }
  });
});
Hooks.once('init', () => {
  if (typeof Babele !== 'undefined') {
    Babele.get().registerConverters({
      "weight": (value) => convertEnabled() ? lbToKg(value) : value,
      "range": (range) => {
        if (!convertEnabled() || !range) return range;
        if (range.units === "ft") {
          return mergeObject(range, {
            value: footsToMeters(range.value),
            long: footsToMeters(range.long),
            units: "m"
          });
        }
        if (range.units === "mi") {
          return mergeObject(range, {
            value: milesToMeters(range.value),
            long: milesToMeters(range.long),
            units: "km"
          });
        }
        return range;
      },
      "movement": (movement) => {
        if (!convertEnabled()) return movement;
        let convert = (v) => v;
        let units = movement.units;
        if (units === 'ft') { convert = footsToMeters; units = "m"; }
        if (units === 'ml') { convert = milesToMeters; units = "m"; }
        return mergeObject(movement, {
          burrow: convert(movement.burrow),
          climb: convert(movement.climb),
          fly: convert(movement.fly),
          swim: convert(movement.swim),
          walk: convert(movement.walk),
          units: units
        });
      },
      "token": (token) => {
        return mergeObject(token, {
          dimSight: footsToMeters(token.dimSight),
          brightSight: footsToMeters(token.brightSight)
        });
      }
    });
  }
});

Hooks.once('ready', () => { setEncumbranceData(); });

// Conversione automatica nuove scene
Hooks.on('createScene', (scene) => {
  if (convertEnabled() && game.settings.get("dnd5e-it-translation", "convertScenes")) {
    scene.update({ grid: { units: "m", distance: 1.5 } });
  }
});

// Conversione automatica nuovi attori
Hooks.on('createActor', async (actor) => {
  if (!convertEnabled()) return;
  if (!game.settings.get("dnd5e-it-translation", "convertActors")) return;
  if (actor.getFlag("babele", "translated")) return;
  if (actor.getFlag("dnd5e-it-translation", "converted")) return;

  let movement = actor.system.attributes.movement;
  let token = actor.prototypeToken;
  let weight = actor.system.traits?.weight;
  let senses = actor.system.attributes.senses;

  if (movement.units === "ft") {
    await actor.update({
      prototypeToken: {
        dimSight: footsToMeters(token.dimSight),
        brightSight: footsToMeters(token.brightSight)
      },
      system: {
        attributes: {
          movement: {
            burrow: footsToMeters(movement.burrow),
            climb: footsToMeters(movement.climb),
            fly: footsToMeters(movement.fly),
            swim: footsToMeters(movement.swim),
            walk: footsToMeters(movement.walk),
            units: 'm'
          },
          senses: {
            darkvision: footsToMeters(senses.darkvision),
            blindsight: footsToMeters(senses.blindsight),
            tremorsense: footsToMeters(senses.tremorsense),
            truesight: footsToMeters(senses.truesight)
          }
        },
        traits: {
          weight: lbToKg(weight)
        }
      }
    });
    await actor.setFlag("dnd5e-it-translation", "converted", true);
  }
});

// Conversione automatica nuovi incantesimi
Hooks.on('createItem', async (item) => {
  if (!convertEnabled()) return;
  if (!game.settings.get("dnd5e-it-translation", "convertItems")) return;
  if (item.type !== "spell") return;
  if (item.getFlag("dnd5e-it-translation", "converted")) return;

  let updates = {};
  let changed = false;

  // Range
  let range = item.system.range;
  if (range?.units === "ft") {
    updates["system.range.value"] = footsToMeters(range.value);
    updates["system.range.units"] = "m";
    changed = true;
  }
  if (range?.units === "mi") {
    updates["system.range.value"] = milesToMeters(range.value);
    updates["system.range.units"] = "km";
    changed = true;
  }

  // Target template
  let template = item.system?.target?.template;
  if (template?.size && template.size > 0) {
    if (!template.units || template.units === "ft" || template.size > 15) {
      updates["system.target.template.size"] = footsToMeters(template.size);
      updates["system.target.template.units"] = "m";
      changed = true;
    }
  }

  if (changed) {
    await item.update(updates);
    await item.setFlag("dnd5e-it-translation", "converted", true);
  }
});

// Ordinamento alfabetico delle competenze
async function skillSorting() {
  const lists = document.getElementsByClassName("skills-list");
  for (let list of lists) {
    const competences = list.childNodes;
    let complist = [];
    for (let sk of competences) {
      if (sk.innerText && sk.tagName == "LI") {
        complist.push(sk);
      }
    }
    complist.sort(function(a, b) {
      return (a.innerText > b.innerText) ? 1 : -1;
    });
    for (let sk of complist) {
      list.appendChild(sk);
    }
  }
}

// Applica l’ordinamento quando si apre la scheda attore
Hooks.on("renderActorSheet", async function() {
  skillSorting();
});

console.log("Modulo dnd5e-it-translation inizializzato");

Hooks.once("ready", async () => {
  const MODULE_ID = "dnd5e-it-translation";
  const VERSION_KEY = "shownVersion";

  // Registra un'impostazione nascosta che memorizza l'ultima versione per cui è stato mostrato il messaggio
  game.settings.register(MODULE_ID, VERSION_KEY, {
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  const module = game.modules.get(MODULE_ID);
  const currentVersion = module?.version ?? "unknown";
  const lastShownVersion = game.settings.get(MODULE_ID, VERSION_KEY);

  // Se la versione è nuova (mai mostrata), crea il messaggio
  if (currentVersion !== lastShownVersion) {
    ChatMessage.create({
      user: game.user.id,
      speaker: { alias: "Traduzione Italiana Dungenons and Dragons" },
      content: `<h4>Benvenuto nella traduzione italiana di D&D</h4>
                <p><em>Versione attuale ${currentVersion}</em></p><p></p>
                <p> Con questa versione del modulo avrai: </p>
                <ul>
                <li> Traduzione del core di sistema di D&D per Foundry VTT </li>
                <li> Traduzione del compendio delle regole SRD per D&D versione 2014 legacy</li>
                <li> Traduzione del compendio delle regole SRD per D&D versione 2024 modern</li>
                <li> Una serie di macro per la conversione di scene, attori, incantesimi ed oggetti da sistema imperiale a sistema metrico!
                <em> Nota: la gestione delle conversioni può essere fatta direttamente dalle Impostazioni del modulo!</em></li>
                </ul>
                <p>Per maggiori dettagli visita il nostro <a href="https://github.com/LuckyFrico/dnd5e-it-translation-foundryVTT" target="_blank"> GitHub </a>.</p><p></p>
                <p><em>Nota: attualmente la traduzione delle regole SRD per D&D 2024 non è ancora ultimata, ma sarà portata avanti con i prossimi aggiornamenti!</em></p>`
    });

    await game.settings.set(MODULE_ID, VERSION_KEY, currentVersion);
  }
});