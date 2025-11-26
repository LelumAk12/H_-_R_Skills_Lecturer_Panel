Theme system

Overview
- Implemented a global theme system using `ThemeContext` in `src/context/ThemeContext.tsx`.
- Theme preference is persisted to `localStorage` under key `theme` and applied by setting `data-theme` attribute on `<html>` (document.documentElement).
- The app uses CSS variables defined in `src/index.css` for light and dark variants. Components and page styles should read colors from these variables to ensure consistent themes.

How it works
1. ThemeProvider
   - Wraps the app in `src/App.tsx` so the theme is available everywhere.
   - Exposes `theme`, `toggleTheme()`, and `setTheme()` via the `useTheme()` hook.
2. Persistence & system preference
   - On first load ThemeProvider reads `localStorage.theme` if present.
   - If not present, it falls back to `window.matchMedia('(prefers-color-scheme: dark)')`.
   - Any change is saved to `localStorage` and `data-theme` on `<html>`.
3. Styling
   - `src/index.css` contains `:root[data-theme="light"]` and `:root[data-theme="dark"]` blocks that declare variables like `--bg-primary`, `--text-primary`, `--card-bg`, `--button-primary`, etc.
   - Use these variables across component CSS files (example: `background: var(--card-bg); color: var(--text-primary)`).

How to use in components
- For logic (JSX):
  - import { useTheme } from 'src/context/ThemeContext';
  - const { theme, setTheme, toggleTheme } = useTheme();
- For styles (CSS):
  - Replace hard-coded colors (e.g., `#fff`, `#1a2b4a`) with variables: `var(--bg-secondary)`, `var(--text-primary)`, etc.

Adding a new page/component to be theme-aware
1. Use variables for backgrounds, borders, text, and shadows instead of literal colors.
2. Test in both light and dark modes by toggling in Settings > Appearance.
3. Ensure contrast meets WCAG AA (4.5:1 for body text). Adjust variables in `src/index.css` if necessary.

Optional extensions
- Add animated transitions for components when theme changes (use opacity + transform on key containers).
- Add a third option "System" to follow OS preference dynamically (call `matchMedia` listener).

Notes
- I removed theme state from `AppContext` and moved it to `ThemeContext` to keep responsibilities separated.
- I updated `SettingsPage` to use a two-button toggle which calls `setTheme('light' | 'dark')`.

If you want, I can:
- Sweep the remaining component CSS files to replace literal colors with variables for complete coverage.
- Add a lightweight visual test page that shows all components in both themes.
