# Premise Time Track Chrome extension

Chrome extension for the [Premise Time Tracker](https://github.com/PremiseWP/premise-time-track/) Wordpress plugin.

Relies on the [Premise Time Track Node app](https://github.com/PremiseWP/premise-time-track-chrome-extension-node).

### 400 No Oauth parameters supplied error

If you experience a "400 No Oauth parameters supplied error", this may be due to the Authorization header blocked.
Edit your **Wordpress** `.htaccess` file this way:

```
# REST API fix 400 error.
# RewriteRule ^index\.php$ - [L]
RewriteRule ^index\.php$ - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]
```


### New client / project / timesheet not appearing in the list

When creating a new Timer and adding a new client / project / timesheet, it may not be displayed right away.
If you experience this issue, please check your Wordpress installation for _cache plugins_ and deactivate them.


### Security rule error

In case the Wordpress page you are trying to view is restricted due to a security rule.
Please disable any `mod_security` (Apache) rule blocking `iframe` on you Wordpress server.
