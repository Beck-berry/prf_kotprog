## 2021. 05. 17-18.
* init Angular app
* NodeJS szerver: express, cors
* autentikációs fájlok: LoginComponent, AuthService, AuthGuard
* Routing
* MongoDB: Users tábla, default szaboz user

Az Angular applikációt legeneráltam, a felesleges részeket töröltem.
Nulladik lépésként a PRF projekt mappámon belül létrehoztam egy frontend almappát, amin belül a NodeJS szerver és az Angular frontend
lesz majd. A NodeJS szerver server.js fájlja megkapta az alapvetően szükséges express és cors metódusokat.

Elsőként az autentikációt szerettem volna megvalósítani, ehhez szükség volt a server.js passporttal kiegészítésére,
illetve Angular oldalon a bejelentkezési komponensre, az autentikációs service-ekre, továbbá egy MongoDB táblára, amely
eltárolja a már regisztrált felhasználók adatait.

A Mongo Atlashoz való csatlakozás nem működött az először létrehozott userrel, ezért kellett egy másik és az
authSource=admin query tag. Ezután a regisztrációs és bejelentkezős function-öket is megírtam az adatbázishoz kapcsolódóan.
Az adatbázist és a Users táblát az Atlas felületén hoztam létre, ezért erre nincs kód. A node-api mappa viszont kapott
egy database_init.js file-t is, amelyben kódból adom hozzá a kért szaboz usert.
A felhasználók jelszavait a bcrypt segítségével titkosítottam.

## 2021. 05. 20.
* refactor
* .env file használata
* új komponensek: HomeComponent, LogoutComponent
* adatbázis és Angular kapcsolat: kitten.ts és user.ts sémák
* node-api és angular összekapcsolása (home.component és server.js)

## 2021. 05. 23.
* refactor
* új komponensek: CartComponent, NotFoundComponent
* Heroku server url használata localhost helyett
* adatbázis feltöltése adatokkal
