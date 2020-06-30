# 💀 Metabookmarks Firefox add-on

I used Firefox bookmarks a lot to manage project & research resources. I wanted to be able to render a page of bookmarked links with a particular tag by loading a custom URL. These custom URLs could themselves be bookmarked, hence _Metabookmarks_!

I gave up on this project because of a [fundamental issue in the FireFox bookmark API](https://bugzilla.mozilla.org/show_bug.cgi?id=1225916) which doesn't support querying tags. Bah!

## Building

The plugin uses the [Firefox extension SDK](https://developer.mozilla.org/en-US/Add-ons/SDK)

Run `build.sh` to build the extension from source to `build/metabookmarks.xpi`. The build script will also attempt to automatically install the extension using [Extension Auto-Installer](https://addons.mozilla.org/addon/autoinstaller/)

## ~~Usage~~
~~Visit `chrome://metabookmarks/content/bookmarks.html` for search form, or `chrome://metabookmarks/content/bookmarks.html?tag=your-tag-name`~~
