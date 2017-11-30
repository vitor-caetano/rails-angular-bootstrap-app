# rails-angular-bootstrap-app

## Setup

```
brew install yarn
```
```
rails webpacker:install
```

if one wants to skip webpacker:install

```
bundle binstubs webpacker
yarn add @rails/webpacker coffeescript@1.12.7
```

Installing dev server for live reloading
```
yarn add --dev webpack-dev-server
```
## Setup with Angular

```
rails webpacker:install:angular
```
```
yarn add @angular/forms @angular/http
```
if one wants to skip webpacker:install:angular

```
bundle binstubs webpacker
yarn add typescript ts-loader core-js zone.js rxjs @angular/core @angular/common @angular/compiler @angular/platform-browser @angular/platform-browser-dynamic
```

```
yarn add @angular/forms @angular/http
```
