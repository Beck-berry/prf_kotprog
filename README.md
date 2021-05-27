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
authSource=admin query tag az url-hez. Ezután a regisztrációs és bejelentkezős function-öket is megírtam az adatbázishoz kapcsolódóan.
Az adatbázist és a Users táblát az Atlas felületén hoztam létre, ezért erre nincs kód. A node-api mappa viszont kapott
egy database_init.js file-t is, amelyben kódból adom hozzá a kért szaboz usert.
A felhasználók jelszavait a bcrypt segítségével titkosítottam.

## 2021. 05. 20.
* refactor
* .env file használata
* új komponensek: HomeComponent, LogoutComponent
* adatbázis és Angular kapcsolat: kitten.ts és user.ts sémák
* node-api és angular összekapcsolása (home.component és server.js)

A korábbi elképzelésem a mappastruktúráról meggondolatlan volt, ezért újra kellett szerveznem a már meglévő node-api és frontend
modulokat.
Elkészítettem a Home komponenst, amin az adatbázisból kinyert "termékek" listázása fog megtörténni, illetve egy nagyon egyszerű kijelentkező
képernyőt is hozzáadtam az alkalmazáshoz.
Az adatbázis és az Angular UI kapcsolatához kialakítottam a két objectet: kitten.ts és user.ts fájlok - ezek biztosítják az azonos
felépítésű objektumok kezelését.
A node-api és az Angular kapcsolatához a server.js-ben a / path-ra az Angular által buildelt forrást kellett visszadnom.

## 2021. 05. 23.
* refactor
* új komponensek: CartComponent, NotFoundComponent
* server url használata localhost helyett
* adatbázis feltöltése adatokkal

Elkészítettem a Cart komponenst, amihez a Home komponens kiegészítése is járt: a kosárhoz adás függvény. A kosárba bármelyik "termék"
bekerülhet, azonban azzal nem foglalkoztam, hogy ez a "termék" el is fogyjon, szóval lényegében végtelen mennyiség áll rendelkezésre
mindenből.
A kosár megjelenése közel megegyezik a főoldaléval. A "Kész vagyok!" rendelés gomb a Spring szerver felé fogja továbbítani a tranzakció
tartalmát.
Kiegészítettem a database_init.js fájlt a Kittens tábla feltöltésével. (10 cica adatait szúrtam be: név, ár, fotó, bemutatás) 

## 2021. 05. 24.
* refactor
* spring server init

A saját laptopom 4GB-os RAM-jának sajnos meggyűlt a baja a futtatással (nem is biztos, hogy a kicsit RAM miatt, de milliószor lefagyott),
ezért a korábbi fejlesztés során minimális alkalommal indítottam csak el akár az Angulart (ng serve), akár az API-t (node server.js),
ami már gondolatban is veszélyes, ezért szerettem volna más környezetben kipróbálni a már megírt kódokat. A munkahelyi gépemen
sikerült gyorsan összeállítani a fejlesztőkörnyezetet és futtatni az alkalmazásomat, azonban ezzel fény is derült a hibás működésekre.
A bejelentkezés jól működött, a termékek listázása azonban már nem - az Angular hamarabb jelenítette meg az oldalt, mint hogy az
adatbázis visszaadhatta volna az adatokat. Ebben az ügyben kezdtem el nyomozni.
Emellett legeneráltam a Java Spring backend alapját.

## 2021. 05. 25-26.
* spring server okosítása
* Elephant SQL kapcsolat
* node server fix: adatkapcsolat

Megírtam a Spring szerverhez szükséges Java osztályokat controllers és models almappákba sorolva. A szükséges, felhasznált metódusoknál
nem írtam többet (add és list), illetve használtam a Lombok könyvtárat a getterek generálásához. (Így rövidebb a forráskód is.)
Lokálisan az ElephantSQL felhőszolgáltatással próbáltam ki a szerverem (ahogy azt órán is tettük).

Az előzőleg felfedezett node-api hiányosságokat felderítettem, átírtam a server.js fájlt és ezután már jól jelent meg az adatbázis
tartalma (illetve működött a bejelentkezés, listázás, kosárba tétel és kosár ürítése is).

## 2021. 05. 27.
* deploy
* munkanapló

https://morning-river-19528.herokuapp.com/ 
A Spring szerver deployolása során sajnos nem sikerült csatlakoznom a Heroku által gerenált Postgres adatbázishoz, mivel
minden próbálkozásomra session time out errort kaptam, és ezt nem sikerült orvosolni. Úgyhogy bár a főoldal bejön, a szerver fut,
nem lesz elérhető az adatbázis és nem fogja tudni menteni / listázni a tranzakciókat.

https://afternoon-island-39575.herokuapp.com/
A node-api is Heroku-ra került fel, az Angular frontend alkalmazás build-elt forrása a public mappából érhető el a szerver számára.
A környezeti változókat Herokun keresztül inicializáltam, és teszteltem is, gond nélkül fut az alkalmazás ezen része. 

