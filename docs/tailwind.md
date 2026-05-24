# tailwind.md

# Tailwind CSS

Tailwind CSS is used for utility-first styling across the application.

---

## Install

```bash
npm install tailwindcss @tailwindcss/vite
````

---

## Configure Vite

Update `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
});
```

---

## Global Styles

Create:

```txt
src/styles/index.css
```

Add:

```css
@import "tailwindcss";
```

---

## Import Global Styles

Import the stylesheet in `main.tsx`

```ts
import './styles/index.css';
```

---

## Usage

```tsx
<h1 className="text-4xl font-bold">
    RCCG MZNL
</h1>
```

---

## Notes

* Tailwind is primarily used for layout and utility styling
* CSS Modules may still be used for component-specific styling
* Global tokens and variables are located in:

```txt
src/styles/tokens.css
```

---

## Resources

* [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
