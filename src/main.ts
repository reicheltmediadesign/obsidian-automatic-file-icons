import { Plugin } from "obsidian";
import { COLOR_MODES, defaultSettings, parseSettings, type PluginSettings } from "./settings/model";
import { AutomaticFileIconsSettingTab } from "./settings/settings-tab";

const MODE_CLASSES = COLOR_MODES.map((mode) => `afi-mode-${mode}`);
const ALL_CLASSES = ["afi-folders", "afi-open-folders", "afi-notes", "afi-files", "afi-colorized-folders", ...MODE_CLASSES];
const COLOR_PROPS = ["--afi-folder-color", "--afi-note-color", "--afi-file-color"];

export default class AutomaticFileIconsPlugin extends Plugin {
  settings: PluginSettings = defaultSettings();
  private readonly bodies = new Set<HTMLElement>();

  async onload(): Promise<void> {
    this.settings = parseSettings(await this.loadData());

    this.bodies.add(document.body);
    this.registerEvent(
      this.app.workspace.on("window-open", (_win, window) => {
        this.bodies.add(window.document.body);
        this.applyTo(window.document.body);
      }),
    );
    this.registerEvent(
      this.app.workspace.on("window-close", (_win, window) => {
        this.bodies.delete(window.document.body);
      }),
    );
    this.register(() => {
      for (const body of this.bodies) clear(body);
      this.bodies.clear();
    });

    this.addSettingTab(new AutomaticFileIconsSettingTab(this.app, this));
    this.apply();
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
    this.apply();
  }

  private apply(): void {
    for (const body of this.bodies) this.applyTo(body);
  }

  private applyTo(body: HTMLElement): void {
    const { settings } = this;
    body.removeClasses(ALL_CLASSES);
    body.toggleClass("afi-folders", settings.folderIcons);
    body.toggleClass("afi-open-folders", settings.folderIcons && settings.openFolderIcons);
    body.toggleClass("afi-notes", settings.noteIcons);
    body.toggleClass("afi-files", settings.otherFileIcons);
    body.toggleClass("afi-colorized-folders", settings.folderIcons && settings.colorizedFolders);
    body.addClass(`afi-mode-${settings.colorMode}`);

    const custom = settings.colorMode === "custom";
    body.setCssProps({
      "--afi-folder-color": custom ? settings.folderColor : "",
      "--afi-note-color": custom ? settings.noteColor : "",
      "--afi-file-color": custom ? settings.otherFileColor : "",
    });
  }
}

function clear(body: HTMLElement): void {
  body.removeClasses(ALL_CLASSES);
  body.setCssProps(Object.fromEntries(COLOR_PROPS.map((prop) => [prop, ""])));
}
