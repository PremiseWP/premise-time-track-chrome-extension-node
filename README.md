# premise-time-track-chrome-extension-node
Chrome extension for the Premise Time Tracker Wordpress plugin (using React &amp; Javascript WordPress REST API client)


## CORS issue

Added `proxy` field to the `package.json`. Avoids [CORS issues](http://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations) in development environment (when using `fetch`).

Add this `.htaccess` file to your web root folder;
```
# Add to www root folder!
# FJ CORS for Time Tracker node app/extension.
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
```
