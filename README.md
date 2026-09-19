# Automatic File Icons

Show icons in front of folders and files in the file explorer: open and closed folders, notes and all other files each get their own icon. Choose colors for dark or light themes, use your accent color, or pick your own.

## Features

- **Folder icons**: closed folders show a folder, expanded folders an open folder.
- **Note icons**: Markdown notes show a page with a folded corner.
- **Other file icons**: all other files, such as PDF, canvas, images or scripts, show a page with a code symbol.
- **Color modes**: colors tuned for dark or light themes, switching with the theme automatically, your accent color, or custom colors.
- **Works with Colored File Names**: folders colored with the Colored File Names plugin show their icon in that color.
- **Lightweight**: no changes to the file explorer itself, the icons are drawn with CSS only.

## Settings

### Icons

| Setting      | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| Folders      | Show a folder icon in front of folders.                                              |
| Open folders | Show an open folder icon for expanded folders. When off, all folders use the closed icon. |
| Notes        | Show a page icon in front of Markdown notes.                                         |
| Other files  | Show a code icon in front of all other files.                                        |

### Colors

| Color mode    | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| Match theme   | Colors for dark or light themes, depending on the current theme.         |
| Dark theme    | Always use the colors for dark themes.                                   |
| Light theme   | Always use the colors for light themes.                                  |
| Accent color  | Folders in the accent color, files in a lighter shade of it.             |
| Custom colors | Pick a color for folders, notes and other files.                         |

| Setting                        | Description                                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Colors from Colored File Names | Folders colored with the Colored File Names plugin show their icon in that color instead of the folder color. On by default. |

## Styling with CSS snippets

The colors are available as `--afi-folder-color`, `--afi-note-color` and `--afi-file-color`, the icon size and the gap to the name as `--afi-icon-size` and `--afi-icon-gap`:

```css
body {
  --afi-icon-size: 1.25em;
}
```

## Credits

Icon shapes from [Lucide](https://lucide.dev), ISC license.
