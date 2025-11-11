## 1 Bevezetés
A rendszer fő lényege, hogy a környéken történtekről tud híreket olvasni a felhasználó

## 2 Architektúra
Adatbázis: Mysql, phpmyadmin
Backend: Express.js
Frontend: React

## 3 Funkcionális köv.
Fő funkciók:
- Az adott lakónegyedben terjengő hírek posztolása,kommentelése és értékelése.
- Két felhasználó vagy háztartás közötti társalgás.
- Naptár 
- bevásárló lista

## 4. Nem funkc. köv.
1. Front és Backend JSON-ben kommunikál
2. Hibakezelés
3. Reszponzív
4. jól áttekinthető kód

## 5. Adatb. terv

### 5.1 Táblák
bizFelhasznaloiAdat:
- bizFelhasznalo_id
- bizFelhasznalo_nev
- bizFelhasznalo_szul
- bizFelhasznalo_email
- bizFelhasznalo_jelszo
<!-- bizFelhasznalo_bKod -->

Bejegyzesek
- bejegyzes_id
- bejegyzes_felAzon
- bejegyzes_tart
- bejegyzes_datum
- bejegyzes_tetszikC
- bejegyzes_ntetszikC
- bejegyzes_megosztC
- bejegyzes_kommentC

tetszikIg:
- tetszikBejegyzes_id
- tetszikFelhasznalo_id
- 

### 5.2 Kapcsolatok

