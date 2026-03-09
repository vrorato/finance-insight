import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 light:bg-white light:border-neutral-200 light:text-neutral-700"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5" />
            ) : (
                <Sun className="w-5 h-5 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]" />
            )}
        </button>
    )
}
