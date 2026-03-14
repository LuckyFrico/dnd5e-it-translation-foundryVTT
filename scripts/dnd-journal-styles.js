// ============================================================================
// DnD 5e - Traduzione Italina
// File: dnd-journal-styles.js
// ============================================================================

console.log("DND5E-IT | Journal Styles attivo");

export const MODULE_ID = "dnd5e-it-translation";

function insertHTML(view, htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = ProseMirror.DOMParser.fromSchema(view.state.schema).parseSlice(doc.body);
  const transaction = view.state.tr.replaceSelection(fragment);
  view.dispatch(transaction);
}

Hooks.once("init", () => {
  console.log("DND5E-IT | Carico CSS Journal Styles");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `modules/${MODULE_ID}/styles/dnd-journal-styles.css`;
  document.head.appendChild(link);
});


Hooks.on("getProseMirrorMenuDropDowns", (menu, dropdowns) => {
  dropdowns.dndJournal = {
    title: "DnD Style Blocks",
    action: "dnd-it-blocks",
    entries: [
      {
        title: "Read Aloud",
        description: "Blocco narrativo da leggere ai giocatori",
        action: "dnd-it-readaloud",
        cmd: async () => {
          const html = await foundry.applications.handlebars.renderTemplate(
            `modules/${MODULE_ID}/templates/readaloud.html`
          );
          insertHTML(menu.view, html);
        }
      },
      {
        title: "GM Note",
        description: "Inserisce un riquadro informativo per il Dungeon Master",
        action: "dnd-it-gm-hint",
        cmd: async () => {
          const html = await foundry.applications.handlebars.renderTemplate(
          `modules/${MODULE_ID}/templates/gm-hint.html`
          );
          insertHTML(menu.view, html);
        }
      },
      {
        title: "Epigrafe",
        description: "Inserisce un riquadro per una citazione presa da un testo o un personaggio",
        action: "dnd-it-cite",
        cmd: async () => {
          const html = await foundry.applications.handlebars.renderTemplate(
          `modules/${MODULE_ID}/templates/epigrafe.html`
          );
          insertHTML(menu.view, html);
        }
      },
      {
        title: "Statblock",
        description: "Scegli un attore e inserisci automaticamente il suo Statblock",
        action: "dnd-it-statblock",
        cmd: async () => {
          const actors = game.actors.contents;

        new Dialog({
          title: "Inserisci Statblock",
          content: `
            <div class="form-group">
              <label>Seleziona un attore:</label>
              <select id="dnd-it-statblock-select">
                ${actors.map(a => `<option value="${a.uuid}">${a.name}</option>`).join("")}
              </select>
            </div>
          `,
        buttons: {
          ok: {
            label: "Inserisci",
            callback: html => {
              const uuid = html.find("#dnd-it-statblock-select").val();
              const tag = `@Statblock[${uuid}]`;

              insertHTML(menu.view, `<p>${tag}</p>`);
            }
          },
          cancel: { label: "Annulla" }
          }
          }).render(true);
        }
      }
    ]
  };
});

Hooks.once("ready", () => {
  console.log("DND5E-IT | Journal Styles pronto");
});
