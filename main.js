// Device detection and initial routing to mobile/desktop HTML
// Comments and docstrings are written in clear technical English per project rules.

/**
 * Determine whether the current device should be treated as mobile.
 * Uses multiple signals for robustness across browsers and platforms.
 */
function isMobileDevice() {
    // Signal 1: User-Agent based detection (covers most mobile browsers)
    var ua = (navigator.userAgent || '').toLowerCase();
    var isUaMobile = /(android|iphone|ipad|ipod|iemobile|windows phone|blackberry|bb10|mobile)/i.test(ua);

    // Signal 2: Input capabilities and viewport size (coarse pointer, touch points, smaller screens)
    var hasCoarsePointer = false;
    try {
        hasCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    } catch (_) {}

    var hasTouchPoints = (navigator.maxTouchPoints || 0) > 0;
    var isNarrowViewport = Math.min(window.screen.width, window.innerWidth || 0) <= 1024;

    // Consider mobile if any strong signal indicates it, prioritizing UA and coarse pointer
    return isUaMobile || (hasCoarsePointer && (hasTouchPoints || isNarrowViewport));
}

/**
 * Route to the correct HTML entry (mobile or desktop) when loaded from the project root.
 * Avoids redirect loops if already inside /mobile/ or /desktop/.
 */
function routeToDeviceEntry() {
    var path = window.location.pathname || '';

    // If we are already on a platform-specific page, do nothing
    if (path.indexOf('/mobile/') !== -1 || path.indexOf('/desktop/') !== -1) {
        return;
    }

    // Preserve current query string and hash fragment when routing
    var search = window.location.search || '';
    var hash = window.location.hash || '';

    var targetBase = isMobileDevice() ? './mobile/index.html' : './desktop/index.html';
    var target = targetBase + search + hash;

    // Use replace to avoid polluting history with the router hop
    window.location.replace(target);
}

// Run after DOM is ready enough; using DOMContentLoaded to ensure consistent timing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', routeToDeviceEntry);
} else {
    routeToDeviceEntry();
}


