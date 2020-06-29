# intermix-spa-portal

Single SPA intermix portal built on best practices

- Standards Based - Typescript
- Developer Productivity , Sharing , Dependency Management - Mono Repo
- Consistent UI - Atomic/Functional CSS , Tailwind CSS

## Setup

```
yarn
```

## Development Mode Execution

```
yarn start
```

- Now start the local import config server and the APIs for routes and menu
- Use `start:all` for all the routes to be loaded otherwise use the specific start task for the app being tested
- For example `start:dashboard` for only loading the `dashboard` app

```
yarn start:all
```

## Production Build

```
yarn build
```

- This will create a `dist` folder which can then be deployed as a static asset

