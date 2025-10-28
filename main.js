Hooks.on("init", () => {
  if (typeof Babele !== "undefined") {
    Babele.get().register({
      module: "dnd5e-it-translation",
      lang: "it",
      dir: "compendium",
      entries: {
        "dnd5e.rules": "dnd5e.rules.json"
      }
    });
  }
});
