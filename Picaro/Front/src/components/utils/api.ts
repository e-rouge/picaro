import {Settings, StyleSet} from "@types";


export async function updateSettings(currentSettings: Settings, oldName?: string) {
    try {
        return await fetch('/api/setup/update/settings', {
            method: 'PUT',
            headers: [
                ["Content-Type", "application/json"],
            ],
            body: JSON.stringify({settings: currentSettings, oldName})
        })
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function createStyleSet(styleSet: { styleSet: StyleSet, generatedCSS: string }) {
    try {
        return await fetch('/api/setup/create/styleset',
            {
                headers: [
                    ["Content-Type", "application/json"],
                ],
                method: 'POST',
                body: JSON.stringify(styleSet)
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function updateStyleSet(currentSettings: { styleSet: StyleSet, generatedCSS: string }) {
    try {
        return await fetch('/api/setup/update/styleset',
            {
                headers: [
                    ["Content-Type", "application/json"],
                ],
                method: 'PUT',
                body: JSON.stringify(currentSettings)
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export function isUserLoggedIn() {
    if (localStorage.getItem('accessToken')) {
        return fetch('/api/auth/check').then((res) => {
            if (res.status === 401) {
                return false
            }
            return true
        }).catch(() => {
            return false
        })
    } else {
        return false
    }
}
