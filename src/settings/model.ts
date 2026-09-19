export const COLOR_MODES = ["auto", "dark", "light", "accent", "custom"] as const;

export type ColorMode = (typeof COLOR_MODES)[number];

export interface PluginSettings {
  folderIcons: boolean;
  openFolderIcons: boolean;
  noteIcons: boolean;
  otherFileIcons: boolean;
  /** Folder icons take the color assigned with the Colored File Names plugin. */
  colorizedFolders: boolean;
  colorMode: ColorMode;
  folderColor: string;
  noteColor: string;
  otherFileColor: string;
}

const TOGGLE_KEYS = ["folderIcons", "openFolderIcons", "noteIcons", "otherFileIcons", "colorizedFolders"] as const;
const COLOR_KEYS = ["folderColor", "noteColor", "otherFileColor"] as const;

export type ToggleKey = (typeof TOGGLE_KEYS)[number];
export type ColorKey = (typeof COLOR_KEYS)[number];

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export function defaultSettings(): PluginSettings {
  return {
    folderIcons: true,
    openFolderIcons: true,
    noteIcons: true,
    otherFileIcons: true,
    colorizedFolders: true,
    colorMode: "auto",
    folderColor: "#e2b86b",
    noteColor: "#a9b3c2",
    otherFileColor: "#7fb0f5",
  };
}

export function isToggleKey(key: string): key is ToggleKey {
  return (TOGGLE_KEYS as readonly string[]).includes(key);
}

export function isColorKey(key: string): key is ColorKey {
  return (COLOR_KEYS as readonly string[]).includes(key);
}

export function isColorMode(value: unknown): value is ColorMode {
  return typeof value === "string" && (COLOR_MODES as readonly string[]).includes(value);
}

export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && HEX_COLOR.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseSettings(data: unknown): PluginSettings {
  const settings = defaultSettings();
  if (!isRecord(data)) return settings;

  for (const key of TOGGLE_KEYS) {
    const value = data[key];
    if (typeof value === "boolean") settings[key] = value;
  }
  for (const key of COLOR_KEYS) {
    const value = data[key];
    if (isHexColor(value)) settings[key] = value.toLowerCase();
  }
  if (isColorMode(data.colorMode)) settings.colorMode = data.colorMode;
  return settings;
}
