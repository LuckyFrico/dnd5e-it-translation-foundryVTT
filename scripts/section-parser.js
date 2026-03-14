// ============================================================================
// DnD 5e - Traduzione Italina
// File: section-praser.js
// ============================================================================

console.log("SECTION PARSER FILE LOADED");

function safeSlug(text) {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")               
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")           
        .replace(/^-+/, "")            
        .replace(/^[0-9]/, "sec-$&");    
}

Hooks.once("init", () => {
    console.log("SECTION PARSER INIT HOOK");
    CONFIG.TextEditor.enrichers.push({
        pattern: /@Section\[(.*?)\](?:{(.*?)})?/g,
        enricher: async (match, options) => {

            console.log("DND SECTION PARSER TRIGGERED", match);

            const raw = match[1].trim();
            const label = match[2] ?? "";
            let [uuid, anchor] = raw.split("#");
            if (anchor) anchor = safeSlug(anchor);


            const doc = await fromUuid(uuid);

            if (!doc) {
                const broken = document.createElement("span");
                broken.classList.add("broken-link");
                broken.innerHTML = `<i class="fas fa-unlink"></i> ${label || raw}`;
                return broken;
            }

            let html = "";
            if (doc.type === "text" && doc.text?.content) {
                html = doc.text.content;
            } else if (doc.pages && doc.pages.size > 0) {
                const firstPage = doc.pages.contents[0];
                html = firstPage.text?.content ?? "";
            }

            if (!anchor) {
                const wrapper = document.createElement("div");
                wrapper.classList.add("section-block");

                const finalHTML = `
                    <div class="section-content">
                        ${label ? `<h2 class="section-title">${label}</h2>` : ""}
                        ${html}
                    </div>

                    <div class="section-link">
                        @UUID[${uuid}]{Apri nota originale}
                    </div>
                `;

                wrapper.innerHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(finalHTML, { async: true });
                return wrapper;
            }

            const temp = document.createElement("div");
            temp.innerHTML = html;

            [...temp.querySelectorAll("h1, h2, h3, h4, h5, h6")].forEach(h => {
                if (!h.id) {
                    h.id = safeSlug(h.textContent);
                } 
            });

            const header = temp.querySelector(`h1#${anchor}, h2#${anchor}, h3#${anchor}, h4#${anchor}, h5#${anchor}, h6#${anchor}`);

            if (!header) {
                const missing = document.createElement("span");
                missing.classList.add("broken-link");
                missing.innerHTML = `<i class="fas fa-unlink"></i> Sezione non trovata: ${anchor}`;
                return missing;
            }

            const level = parseInt(header.tagName.substring(1));
            const sectionNodes = [header.cloneNode(true)];

            let next = header.nextElementSibling;
            while (next && !(next.tagName.match(/^H[1-6]$/) && parseInt(next.tagName.substring(1)) <= level)) {
                sectionNodes.push(next.cloneNode(true));
                next = next.nextElementSibling;
            }

            const extractedHTML = sectionNodes.map(n => n.outerHTML).join("\n");

            const wrapper = document.createElement("div");
            wrapper.classList.add("section-block");

            const finalHTML = `
                <div class="section-content">
                    ${extractedHTML}
                </div>

                <div class="section-link">
                    @UUID[${uuid}]{Apri nota originale}
                </div>
            `;

            wrapper.innerHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(finalHTML, { async: true });
            return wrapper;
        }
    });

});