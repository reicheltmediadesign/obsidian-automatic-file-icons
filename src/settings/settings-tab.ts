import { type App, PluginSettingTab, type SettingDefinitionItem } from "obsidian";
import type AutomaticFileIconsPlugin from "../main";
import { type ColorMode, isColorKey, isColorMode, isHexColor, isToggleKey } from "./model";

const COLOR_MODE_OPTIONS: Record<ColorMode, string> = {
  auto: "Match theme",
  dark: "Dark theme",
  light: "Light theme",
  accent: "Accent color",
  custom: "Custom colors",
};

export class AutomaticFileIconsSettingTab extends PluginSettingTab {
  private readonly plugin: AutomaticFileIconsPlugin;

  constructor(app: App, plugin: AutomaticFileIconsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    const { settings } = this.plugin;
    const custom = (): boolean => settings.colorMode === "custom";

    return [
      {
        type: "group",
        heading: "Icons",
        items: [
          {
            name: "Folders",
            desc: "Show a folder icon in front of folders.",
            control: { type: "toggle", key: "folderIcons" },
          },
          {
            name: "Open folders",
            desc: "Show an open folder icon for expanded folders. When off, all folders use the closed icon.",
            visible: () => settings.folderIcons,
            control: { type: "toggle", key: "openFolderIcons" },
          },
          {
            name: "Notes",
            desc: "Show a page icon in front of Markdown notes.",
            control: { type: "toggle", key: "noteIcons" },
          },
          {
            name: "Other files",
            desc: "Show a code icon in front of all other files, such as PDF, canvas, images or scripts.",
            control: { type: "toggle", key: "otherFileIcons" },
          },
        ],
      },
      {
        type: "group",
        heading: "Colors",
        items: [
          {
            name: "Color mode",
            desc: "Match theme switches between the colors for dark and light themes. Accent color uses the accent color for folders and a lighter shade of it for files.",
            control: { type: "dropdown", key: "colorMode", options: COLOR_MODE_OPTIONS },
          },
          {
            name: "Folder color",
            visible: () => custom() && settings.folderIcons,
            control: { type: "color", key: "folderColor" },
          },
          {
            name: "Note color",
            visible: () => custom() && settings.noteIcons,
            control: { type: "color", key: "noteColor" },
          },
          {
            name: "Other file color",
            visible: () => custom() && settings.otherFileIcons,
            control: { type: "color", key: "otherFileColor" },
          },
          {
            name: "Colors from Colored File Names",
            desc: "Folders colored with the Colored File Names plugin show their icon in that color instead of the folder color. Has no effect if the plugin is not installed.",
            visible: () => settings.folderIcons,
            control: { type: "toggle", key: "colorizedFolders" },
          },
        ],
      },
    ];
  }

  getControlValue(key: string): unknown {
    const { settings } = this.plugin;
    if (isToggleKey(key) || isColorKey(key) || key === "colorMode") return settings[key];
    return undefined;
  }

  async setControlValue(key: string, value: unknown): Promise<void> {
    const { settings } = this.plugin;
    if (isToggleKey(key) && typeof value === "boolean") {
      settings[key] = value;
    } else if (isColorKey(key) && isHexColor(value)) {
      settings[key] = value.toLowerCase();
    } else if (key === "colorMode" && isColorMode(value)) {
      settings.colorMode = value;
    } else {
      return;
    }
    await this.plugin.saveSettings();
    this.refreshDomState();
  }
}
