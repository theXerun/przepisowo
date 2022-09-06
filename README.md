# Przepisowo

Przepisowo to aplikacja pomagająca znaleźć przepisy kulinarne które możesz wykonać z składników dostępnych w twoim domu.

Link do publicznego repozytorium
https://github.com/theXerun/przepisowo


## Wymagane Narzędzia
- npm
- baza danych postgres

## Instalacja zależności

Pakiety npm
```bash
npm install
```
Aby baza danych zadziałała należy stworzyć plik `.env` a w nim
```bash
DATABASE_URL="postgresql://postgres:haslo@localhost:5432/postgres?schema=public"
```
Pliku nie uwzględniłem z powodów prywatności.

Komenda do stworzenia bazy danych znajduje się w folderze 'DO BAZY DANYCH'.

Uruchomić w środowisku dev można komendami:
```bash
npm run dev

npm run dev -- --open
```

## Budowanie

```bash
npm run build
```

Zbudowaną wersję włączamy przez `npm run preview`.

