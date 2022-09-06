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
ze zmienionymi wartościami na odpowiednie

Właściwego pliku nie uwzględniłem z powodów prywatności.

Komenda do stworzenia bazy danych oraz wypełnienia danymi znajduje się w folderze 'DO BAZY DANYCH'.
Konto z możliwością dodawania przepisów dla wszystkich użytkowników ma login i hasło `public` i `public`. Ramach testów można się na nie zalogować.

Uruchomić w środowisku dev można komendami:
```bash
npm run dev

npm run dev -- --open
```

## Co jest

- redirect do /login dla niezalogowanych użytkowników na wszystkich stronach
- można się rejestrować
- na stronie główniej pokazuje 20 przepisów możliwych do zrobienia, wybiera jeden przypadkowy do wyróżnienia.
- na stronie lodówka są wszystkie dodane składniki i możliwość dodania kolejnych lub zmienienia ich wartości/usunięcia.
- na stronie wszystkie-przepisy widać wszystkie przepisy niezależnie od możliwości ich zrobienia, są jednak kolorystycznie zaznaczone. Można również dodać swój własny przepis z istniejących w bazie składników. Taki przepis będzie się wyświetlać tylko osobie która go dodała.
- na stronie konkretnego przepisu, którego nie możemy zrobić jest zaznaczone którego składnika brakuje i w jakiej ilości.

## Czego brakuje

- Jest mało składników w tabeli ingredients w folderze DO BAZY DANYCH i nie ma możliwości dodawania przez interfejs. Założenie jest, że w realnym programie (gdyby np. był robiony przez sklep typu biedronka) będą wypełnione.
- Nie ma możliwości wylogowania się. Próbowałem zaimplementować jednak napotkałem się na problemy, więc nie uwzględniłem w ostatecznej wersji. Aby się wylogować należy wyczyścić dane witryny.

## Budowanie

```bash
npm run build
```

Zbudowaną wersję włączamy przez `npm run preview`.

