# Setup

- Create a .env.development file and add the following content

```
IMPORT_CONFIG_URL=http://localhost:7000/import-config
ROUTES_API_URL=http://localhost:7000/routes-config
MENU_API_URL=http://localhost:7000/menu-config
```

- For production build create a .env.production file in this package and add the same properties but pointing to the product API URLS