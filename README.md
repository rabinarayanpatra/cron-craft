# Cron Hub

**The Ultimate Visual Cron Expression Generator.**

Cron Hub is a modern, developer-friendly tool for generating and verifying cron expressions. Built with a focus on aesthetics and usability, it features a stunning "Electric Midnight" theme, glassmorphism UI, and advanced features like natural language search.

![Cron Hub Preview](https://via.placeholder.com/1200x600/0f172a/3b82f6?text=Cron+Hub+Preview)

## Features

-   **Visual Builder**: Intuitive interface to configure Minutes, Hours, Days, Months, and Weekdays.
-   **Seconds Support**: Toggle support for 6-part cron expressions (including seconds).
-   **Bidirectional Syncing**: Type a cron string to update the UI, or use the UI to update the string.
-   **Natural Language Search**: Press `Cmd+K` to search for presets like "every 5 minutes" or "daily".
-   **Live Preview**: See the human-readable description and the next 5 scheduled run times instantly.
-   **Quick Presets**: One-click access to common cron schedules.
-   **Modern UI**: Built with Tailwind CSS v4, Motion, and Glassmorphism effects.

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Utilities**: `clsx`, `tailwind-merge`, `cmdk`, `@radix-ui`
-   **Cron Logic**: `cron-parser`, `cronstrue`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
