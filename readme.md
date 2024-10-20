# $hyoo_bunker

Centralized management of decentralized secrets

# Tech stack
- [MAM](https://github.com/hyoo-ru/mam)
- [$mol](https://mol.hyoo.ru)
- [🦿 CRUS-DB](https://crus.hyoo.ru/)

# Build and run

## Install dev environment:
```sh
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
git clone https://github.com/hyoo-ru/bunker.hyoo.ru.git ./hyoo/bunker
```

## Build and run CLI-app
```sh
npm start hyoo/bunker/cli/run
node hyoo/bunker/cli/run/-/node.js masters=http://localhost:9090 port=9091
```
Masters are addresses of CRUS-DB sync-servers.
The CLI-app is also a sync-server itself.

### CLI commands:
```sh
put <path> <value>
get <path>
list <path>
join <path> <peer_id> <rank>
```
