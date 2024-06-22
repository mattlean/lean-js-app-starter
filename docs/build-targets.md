# Build Targets

TODO:

Things that use Browserslist:

-   webpack
-   Babel
-   Autoprefixer

So the only thing you need to do to change your build targets is update .browserslistrc, even if you're working in a Node.js environment, contrary to the "browsers" in Browserslist.

The only exception is when working with Electron where you will need to alter the webpack targets for the main and preload processes.
