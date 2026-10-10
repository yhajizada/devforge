# Contributing to DevForge ⚡

Thank you for contributing to DevForge! Our goal is to create the fastest, cleanest, and most private developer toolkit on the web.

## 🛠️ How to Add a New Tool in 3 Steps!

We designed DevForge to be extraordinarily modular. Adding a new tool takes less than 10 minutes:

### 1. Add Core Logic to `lib/tools-core.ts`
Write pure functions that accept input and return transformed output.
```typescript
export function myNewTransformer(input: string): string {
  return input.toUpperCase();
}
```

### 2. Create the Component in `components/tools/`
Create `components/tools/my-new-tool.tsx` with clean input/output textareas and copy buttons.

### 3. Register the Tool in `app/page.tsx`
Add your tool to the `TOOLS` registry array:
```typescript
{
  id: "my-tool",
  name: "My Awesome Tool",
  category: "Converters",
  description: "Does awesome things.",
  icon: Sparkles,
  component: MyNewTool,
}
```

### 4. (Optional) Add CLI Support in `bin/devforge.js`
Add a case to the CLI switch statement so developers can also run it in their terminal.

---

## 🧪 Testing Guidelines
Run tests before submitting your Pull Request:
```bash
npm run test
npm run build
```

Thank you for making developer lives easier! ⭐
