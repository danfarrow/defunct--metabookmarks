# Metabookmarks Firefox add-on

The purpose of this add-on is to render a list of local bookmarks matching a tag pattern by loading a custom URL.

These URLs can themselves be bookmarked, hence _Metabookmarks_!

## Building

The plugin uses the [Firefox extension SDK](https://developer.mozilla.org/en-US/Add-ons/SDK)

Run `build.sh` to build the extension from source to `build/metabookmarks.xpi`. The build script will also attempt to automatically install the extension using [Extension Auto-Installer](https://addons.mozilla.org/addon/autoinstaller/)

## Usage
Visit `chrome://metabookmarks/content/bookmarks.html` for search form, or `chrome://metabookmarks/content/bookmarks.html?tag=your-tag-name`