# pluginverse

Created by Kevin Little

## Create repo

* Create a repo for your plugin using the naming convention `og-plugins-`
* If a repo already exists, make sure the root is the plugin directory root (and not Jenkins)

## Add webhook in git

* On the repo page got to settings -> Webhooks
* Paste `https://pluginverse.oxfordclub.com/github` into the payload url field
* Set Content Type as `application/json`
* Set secret (found in lastpass "pluginverse")
* Save webhook

That's it, now when you push to main, pluginverse will be updated with a new version of the plugin.
