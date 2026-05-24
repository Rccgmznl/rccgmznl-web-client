# Prettier

Prettier is used to enforce consistent code formatting across the project.

---

## Install

```bash
npm install -D prettier
```

---

## Create `.prettierrc`

```json
{
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "es5"
}
```

---

## Create `.prettierignore`

```txt
node_modules
dist
build
coverage
package-lock.json
```

---

## Add Scripts to `package.json`

```json
{
    "scripts": {
        "dev": "vite",
        "build": "tsc -b && vite build",
        "lint": "eslint .",
        "lint:fix": "eslint . --fix",
        "format": "prettier . --write",
        "format:check": "prettier . --check"
    }
}
```

---

## Usage

### Format Entire Project

```bash
npm run format
```

### Check Formatting Without Modifying Files

```bash
npm run format:check
```

### Auto Fix ESLint Issues

```bash
npm run lint:fix
```

---

## IDE Auto Formatting

### VSCode

Install the Prettier extension.

Enable:

- Format On Save
- Default Formatter → Prettier

### Vim / Neovim

See:
[https://prettier.io/docs/vim](https://prettier.io/docs/vim)

---

## Recommended Workflow

During development:

```bash
npm run lint
npm run format
```

Before pushing:

```bash
npm run lint
npm run format:check
npm run build
```

---

## Resources

- [https://prettier.io/docs](https://prettier.io/docs)
- [https://prettier.io/docs/install](https://prettier.io/docs/install)
