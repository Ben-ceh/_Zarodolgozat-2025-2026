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

megosztasok:
- megosztasok_id
- bejegyzes_id
- felhasznalo_id
- megosztva

bejegyzesek:
- bejegyzesek_id
- felhasznalo_id
- tartalom
- kep_url
- letrehozva

reakciok:
- reakciok_id
- bejegyzes_id
- felhasznalo_id
- reakcio
- letrehozva

hozzaszolasok:
- hozzaszolasok_id
- bejegyzes_id
- felhasznalo_id
- hozzaszolas_szoveg
- letrehozva

felhasznalok:
- felhasznalok_id
- felhasznalonev
- email
- jelszo_hash
- profil_kep
- bio
- regisztralt


### 5.2 Kapcsolatok



