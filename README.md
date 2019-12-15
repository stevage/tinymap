# TinyMap

This is a very simple collaborative map service with the absolute minimum of security. Each map is completely defined by its "layer" parameter:

`tinymap.website/?layer=mylayer`

When you create a new map, you also set a secret key. Anyone with the secret key can add it to the URL to have an editable link:

`tinymap.website/?layer=mylayer&secretkey=mysecretkey`

(Not the actual secretkey for that particular layer)

Data is stored in a tiny (ha) Glitch server which runs Tingo, which is sort of a lightweight MongoDB replacement.