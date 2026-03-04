# CypressTaskIBA
Task for creating basic cypress tests for public website (Wikipedia) testing basic functions and view.

## 🛠️ Tech Stack
Projekt je postaven na moderním a typově bezpečném stacku:
* **Cypress** (^15.11.0) - E2E testovací framework
* **TypeScript** (^5.9.3) - pro typovou bezpečnost a lepší auto-complete
* **Node.js** - běhové prostředí

## ⚙️ Co projekt aktuálně obsahuje
Testovací sada se zaměřuje na úvodní stránku (Landing Page) Wikipedie a zahrnuje pokročilé techniky testování:

* **Custom Commands:** Vlastní Cypress příkazy (např. `cy.visitLandingPage()`, `cy.checkBackendHealth()`) pro čistší a udržitelnější kód.
* **Data-Driven Testing:** Ověřování elementů (např. seznamu 76 jazyků) dynamicky pomocí dat načítaných z `fixtures/languages.json`.
* **Responsive Testing:** Kontrola chování UI a CSS vlastností na mobilních zařízeních (např. zobrazení pseudo-elementu `::after` na iPhone SE vs. Desktop).
* **Backend Health Checks:** Testy ověřují dostupnost serveru (HTTP 200) přes `cy.request` před samotným renderováním UI.
* **Stavová čistota:** Použití `cy.clearAllCookies()`, `clearAllLocalStorage()` a `clearAllSessionStorage()` pro izolaci jednotlivých testů.

## 🚀 Jak projekt zprovoznit

1. **Naklonování repozitáře:**
```bash
   git clone [https://github.com/ZdenekSVB/CypressTaskIBA.git](https://github.com/ZdenekSVB/CypressTaskIBA.git)
   cd CypressTaskIBA
```

2. **Instalace závislostí:**
Projekt používá standardní balíčkovací systém:
```bash
pnpm install
```

## 🎯 Jak testy spustit

V souboru `package.json` jsou připraveny skripty pro snadné spouštění:

**Pro interaktivní režim (Cypress Test Runner):**

```bash
npm run cypress:open
```

**Pro bezhlavý režim (Headless mode - pro CI/CD):**

```bash
npm run cypress:run
```