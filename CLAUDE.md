# ax-design-prototypes

## Icons
Never use lucide-react icons. Always use icon font classes via `<i className="icon-*" />` from the aXcelerate icon font.

**Why:** The project uses a custom aXcelerate icon font served from CDN. Lucide-react adds an external dependency and is inconsistent with the design system.

**How to apply:** Any time an icon is needed, use `<i className="icon-name-here" />`. Do not import from lucide-react. Only use icon names that are confirmed to exist in the font — do not guess. Refer to icons already used in the codebase or check the icon font CSS at `https://cdn.axcelerate.com.au/iconfont/ax-icon/style.css?v=1.62`.

### Icon blacklist
The following Unicode code point ranges must not be used:
- `e901` – `e90f`
- `e914` – `ea68`

### Icon whitelist
Icons listed here are always allowed even if they fall within a blacklisted range.

| Class | Code point | Used for |
|---|---|---|
| `icon-assignment` | `e9e8` | Assessments nav header |
| `icon-clipboard-check` | `e9c3` | Marking nav header |
| `icon-rule` | `e9d0` | Skills nav header |
| `icon-settings1` | `e9d8` | Settings nav header |

---

## CSS Design Tokens
When the user provides specific CSS values (colours, spacing, radii, shadows, etc.), look up and use the equivalent token from `design-tokens.css` rather than hardcoding the raw value.

**Why:** The project uses a design token system. Raw values bypass the token layer and make the codebase harder to maintain and theme.

**How to apply:** Before writing any CSS value the user has specified, search `design-tokens.css` for the matching token and use `var(--token-name)` instead.

---

## Avoid Inline Styles
Do not use inline `style={{}}` props. If a style change is needed, update the relevant component CSS class or add/update a design token.

**Why:** Inline styles bypass the design system, are hard to maintain, and can't be themed or overridden cleanly.

**How to apply:** If a visual change would normally result in an inline style, update the component's CSS class in `components.css` or add a new token to `design-tokens.css`.

---

## Adding new prototypes

All new prototypes must be added to `src/PrototypesApp.tsx` — never to `src/App.tsx`.

### Steps

1. Create the prototype component in `src/components/ui/` or `src/pages/`.

2. Import it in `src/PrototypesApp.tsx`:
   ```tsx
   import { MyPrototype } from './components/ui/my-prototype'
   ```

3. Add a nav entry to the `NAV_ENTRIES` array. Add it as a standalone item, or as a child under an existing group:
   ```tsx
   { type: 'item', id: 'my-prototype', label: 'My Prototype', icon: 'icon-xxx' }
   ```

4. Add a case to `renderPrototype()`:
   ```tsx
   case 'my-prototype': return <MyPrototype />
   ```

The prototype will appear in the sidebar and render inline in the main content panel next to the nav.

### Architecture
- `src/main.tsx` — entry point, renders `PrototypesApp` directly
- `src/PrototypesApp.tsx` — the prototype shell: sidebar nav + inline content panel
- `src/App.tsx` — legacy component library, accessible via the "Component Library" nav item but not the primary prototype area
- Hash-based routing: each prototype maps to a URL hash (e.g. `#supervisor-checklist`)

---

## Prototype Viewport
Mobile prototypes must be built to **376px wide × 750px high**, centred on screen.

**Why:** Prototypes represent mobile UI designs. Building to this size ensures they render correctly and match the Figma designs they are based on.

---

## ai-instructions.md sync
Whenever this file is updated, also update `ai-instructions.md` at the project root to mirror the content.

**Why:** The user wants a version-controllable, human-readable copy of the instructions that lives in the repo alongside `CLAUDE.md`.
