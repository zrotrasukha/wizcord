import { neobrutalism } from "@clerk/themes";
import type { SignUpTheme } from "@clerk/types";

export const appearance: SignUpTheme  = {
    baseTheme: neobrutalism,
    elements: {
        card: 'bg-purple-100',
        cardBox: 'w-xl lg:w-lg',
        footer: 'hidden',
        formButtonPrimary: 'bg-purple-900 text-purple-50',
        footerAction: 'text-purple-900 hover:text-purple-700',
    },
    layout: {
        socialButtonsPlacement: 'bottom',
    },
}