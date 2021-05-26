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

## 2021. 05. 24.
* refactor
* spring server init

A saját laptopom 4GB-os RAM-jának sajnos meggyűlt a baja a node server futtatásával (nem is biztos, hogy a kicsit RAM miatt, de milliószor lefagyott),
ezért a korábbi fejlesztés során minimális alkalommal indítottam csak el akár az Angulart (ng serve), akár az API-t (node server.js),
ami már gondolatban is veszélyes, ezért szerettem volna más környezetben kipróbálni a már megírt kódokat. A munkahelyi gépemen
sikerült gyorsan összeállítani a fejlesztőkörnyezetet és futtatni az alkalmazásomat, azonban ezzel fény is derült a hibás működésekre.
A bejelentkezés jól működött, a termékek listázása azonban már nem - az Angular hamarabb jelenítette meg az oldalt, mint hogy az
adatbázis visszaadhatta volna az adatokat. Ebben az ügyben kezdtem el nyomozni.
Emellett legeneráltam a Java Spring backend alapját.

## 2021. 05. 25.
* spring server okosítása

