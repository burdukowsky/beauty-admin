/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
* BROWSER POLYFILLS
*/


/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/** IE10 and IE11 requires the following for the Reflect API. */
import 'core-js/es6/reflect';

/** Full ES7 **/
import 'core-js/es7';
import 'core-js/es7/array';
import 'core-js/es7/global';
import 'core-js/es7/string';
import 'core-js/es7/map';
import 'core-js/es7/set';
import 'core-js/es7/error';
import 'core-js/es7/math';
import 'core-js/es7/system';
import 'core-js/es7/symbol';
import 'core-js/es7/observable';

/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
