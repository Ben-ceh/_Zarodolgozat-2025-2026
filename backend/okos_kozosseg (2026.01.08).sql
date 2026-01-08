-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 08. 14:13
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `okos_kozosseg`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bejegyzesek`
--

CREATE TABLE `bejegyzesek` (
  `bejegyzesek_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `cim` text NOT NULL,
  `tartalom` text NOT NULL,
  `kep_url` varchar(255) DEFAULT NULL,
  `helyszin` int(11) NOT NULL,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  `csoport_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `bejegyzesek`
--

INSERT INTO `bejegyzesek` (`bejegyzesek_id`, `felhasznalo_id`, `cim`, `tartalom`, `kep_url`, `helyszin`, `letrehozva`, `csoport_id`) VALUES
(1, 1, 'Az első poszt.', 'Sziasztok! Ez lenne az első poszt ezen a weboldalon. Én és a kollégámmal szeretnénk egy barátságos közösséget építeni, ami kisegíti és informálja a tagjait. Köszönöm hogy végig olvastad, legyen csodálatos napod! ', '1.jfif', 4, '2025-11-17 12:44:02', 1),
(2, 2, 'közúti tájékoztatás.', 'Tisztelt Lakosság!\r\n\r\nEzúton szeretnénk tájékoztatni Önöket, hogy településünk egyik legforgalmasabb útszakaszán, a … utcában/úton útfelújítási munkálatok kezdődnek a jövő hét elején. A beruházás célja a régi, elhasználódott burkolat teljes cseréje, valamint az út szerkezetének megerősítése annak érdekében, hogy hosszú távon biztonságosabb és kényelmesebb közlekedést biztosítsunk valamennyi közlekedő számára.\r\n\r\nA munkálatok várhatóan két hétig tartanak, ez idő alatt az érintett útszakaszon ideiglenes forgalomkorlátozásokra és részleges lezárásokra kell számítani. Kérjük a lakosokat, hogy a kihelyezett közlekedési táblákat, jelzéseket fokozott figyelemmel kövessék, és lehetőség szerint válasszanak kerülőútvonalat. Az út mentén élők számára korlátozott ideig előfordulhat zaj- és porhatás, ugyanakkor a kivitelező mindent megtesz annak érdekében, hogy a kellemetlenségeket a lehető legkisebbre csökkentse.\r\n\r\nMegértésüket és türelmüket előre is köszönjük. Bízunk benne, hogy a felújítás befejezését követően mindenki elégedetten tapasztalja majd az új burkolat nyújtotta könnyebb és biztonságosabb közlekedést.', NULL, 1, '2025-11-21 10:32:02', 1),
(3, 3, 'Alma', 'Alma', '3.jfif', 1, '2025-11-21 11:40:35', 1),
(4, 4, 'Virág osztás a hétvégén!', 'Az önkörmányzat ingyen ad virágot.', NULL, 1, '2025-12-11 13:19:55', 2),
(5, 4, 'Teszt', 'Teszt', NULL, 19, '2025-12-17 11:42:06', 1),
(6, 2, 'Nem tudom,teszt!!4!', 'Nagy teszt!', NULL, 28, '2025-12-17 12:01:29', 2),
(7, 2, 'Havazik', 'Havazik', NULL, 1, '2026-01-06 07:57:48', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `belepes`
--

CREATE TABLE `belepes` (
  `felhasznalo_id` int(11) NOT NULL,
  `felhasznalo_nev` varchar(255) NOT NULL,
  `felhasznalo_jelszo` varchar(255) NOT NULL,
  `felhasznalo_rang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `belepes`
--

INSERT INTO `belepes` (`felhasznalo_id`, `felhasznalo_nev`, `felhasznalo_jelszo`, `felhasznalo_rang`) VALUES
(5, 'Aa', '$2a$10$auhieAYn7dvRvnziq7bFHuNTcBVx/LMBUofF/wsbkz6rfTn95x6mO', 1),
(6, 'Admin', '$2a$10$FNoGv4HB.4kVETfdb2QvbegXOqNv2BNpXWCDwFKla.www/Qz0wMB.', 2),
(8, 'User', '$2b$10$6/h08PIcMvWwlzV66dNsaeMD5Vc/jq0q2N4p1IsvO5YrvZdP9VyxK', 1),
(9, 'Proba', '$2b$10$eAcFZ8OKIz8KgAzEGhsJxeZyLcNb4Lfe2bfgfTmygINASTzN9jCxq', 1),
(10, 'gg', '$2b$10$.AmZdgjyIr7QbCVvfLkTwO/Kd.FQ7DP4AZAjb4wgpt/8lorEXEd4.', 1),
(11, 'komoczib', '$2b$10$qcOHMHi97SEEkhC9CpyrgePeYNEeiUXCvBZxhA8ozH6Qjq3433fZK', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoportok`
--

CREATE TABLE `csoportok` (
  `csoport_id` int(11) NOT NULL,
  `csoport_nev` varchar(255) NOT NULL,
  `csoport_leiras` text DEFAULT NULL,
  `csoport_telepules` int(11) NOT NULL,
  `csoport_kep` varchar(255) DEFAULT NULL,
  `csoport_letrehozva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `csoportok`
--

INSERT INTO `csoportok` (`csoport_id`, `csoport_nev`, `csoport_leiras`, `csoport_telepules`, `csoport_kep`, `csoport_letrehozva`) VALUES
(1, 'Általános', 'Általános', 1, NULL, '2025-12-11 13:06:27'),
(2, 'Homokkerti barát', 'Homokkerti barát', 1, NULL, '2025-12-11 13:14:08'),
(3, 'Időjárás', 'Dugóvan az utakon', 1, NULL, '2026-01-06 07:56:14');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `felhasznalok_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `profil_kep` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `neme` int(11) NOT NULL,
  `felhasznalonev` varchar(255) NOT NULL,
  `idegen_felhasznalo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`felhasznalok_id`, `email`, `profil_kep`, `bio`, `neme`, `felhasznalonev`, `idegen_felhasznalo_id`) VALUES
(1, 'BenceTibor@gmail.com', '1.jfif', 'A nevem Komóczi Bence Tibor.Egy weboldalt próbálok készíteni.', 1, 'Komóczi Bence Tibor', 11),
(2, 'NagySandor@gmail.com', NULL, 'A nevem Nagy Sándor. Egy weboldalt próbálok készíteni.', 1, 'Nagy Sándor', 6),
(3, 'BaniMíra@gmail.com', NULL, 'A nevem Banai Míra. Nem szeretem a jókedvet.', 2, 'Bani Míra', 5),
(4, 'Manci@gmail.com', 'manci.jpg', 'Manci.', 2, 'Manci Nagy', 8);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo_csoportok`
--

CREATE TABLE `felhasznalo_csoportok` (
  `id` int(11) NOT NULL,
  `felhasznalok_id` int(11) NOT NULL,
  `csoport_id` int(11) NOT NULL,
  `csatlakozva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo_csoportok`
--

INSERT INTO `felhasznalo_csoportok` (`id`, `felhasznalok_id`, `csoport_id`, `csatlakozva`) VALUES
(4, 2, 3, '2026-01-08 10:59:43'),
(8, 4, 1, '2026-01-08 12:02:43'),
(9, 4, 2, '2026-01-08 12:02:43'),
(10, 4, 3, '2026-01-08 12:02:43'),
(11, 4, 1, '2026-01-08 12:22:32');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hozzaszolasok`
--

CREATE TABLE `hozzaszolasok` (
  `hozzaszolasok_id` int(11) NOT NULL,
  `bejegyzes_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `hozzaszolas_szoveg` text NOT NULL,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `hozzaszolasok`
--

INSERT INTO `hozzaszolasok` (`hozzaszolasok_id`, `bejegyzes_id`, `felhasznalo_id`, `hozzaszolas_szoveg`, `letrehozva`) VALUES
(1, 1, 2, 'Sziasztok! Lerobbant egy busz Segner téren. Kérlek ha tudjátok kerüljétek, mivel hatalmas a forgalom.', '2025-11-17 12:48:26'),
(2, 1, 3, 'Szevasztok! Ez az oldal borzalmas!4!!', '2025-11-17 12:50:02'),
(3, 2, 3, 'Alma', '2025-12-03 11:42:54'),
(4, 2, 2, 'Körte', '2025-12-03 11:42:54'),
(5, 1, 2, 'tttttttttttttttttt', '2025-12-04 09:23:54'),
(6, 1, 2, 'Teszt', '2025-12-04 11:48:26'),
(8, 1, 2, 'Teszt', '2025-12-04 11:48:26'),
(10, 1, 2, 'Almaaadasdasdas', '2025-12-09 11:48:26'),
(11, 1, 2, 'dsdada', '2025-12-09 07:02:34'),
(12, 1, 2, 'asdasda', '2025-12-09 08:04:25'),
(13, 1, 2, 'Teas', '2025-12-09 08:05:06'),
(14, 2, 2, 'Függöny', '2025-12-09 08:07:08'),
(15, 2, 2, 'Lámpa', '2025-12-09 08:09:21'),
(16, 1, 2, 'Most ez egy teszt!', '2025-12-09 08:13:34'),
(17, 1, 2, 'Csokoládé!', '2025-12-09 08:14:50'),
(18, 1, 2, 'Csokis csoki', '2025-12-09 08:20:04'),
(19, 1, 2, 'Működik!!!4!', '2025-12-09 08:20:23'),
(20, 1, 2, 'csoki', '2025-12-09 08:28:14'),
(21, 1, 2, 'r', '2025-12-09 08:35:15'),
(22, 1, 2, 'W', '2025-12-09 08:39:54'),
(23, 1, 2, 'WeeeWeee', '2025-12-09 08:41:15'),
(24, 1, 2, 'Buggos a sanyi4!444!', '2025-12-09 08:44:06'),
(25, 3, 2, 'Ez egy körte!', '2025-12-09 08:44:28'),
(26, 1, 2, 'Sziasztok! Lerobbant egy busz Segner téren. Kérlek ha tudjátok kerüljétek, mivel hatalmas a forgalom.\nSziasztok! Lerobbant egy busz Segner téren. Kérlek ha tudjátok kerüljétek, mivel hatalmas a forgalom.\nSziasztok! Lerobbant egy busz Segner téren. Kérlek ha tudjátok kerüljétek, mivel hatalmas a forgalom.\nSziasztok! Lerobbant egy busz Segner téren. Kérlek ha tudjátok kerüljétek, mivel hatalmas a forgalom.\nSziasztok! Lerobbant egy busz Segner téren. Kérlek ha tudjátok kerüljétek, mivel hatalmas a forgalom.', '2025-12-09 08:58:45'),
(27, 2, 2, 'Mai', '2025-12-11 07:43:30'),
(28, 1, 2, 'adasdsaas', '2025-12-11 13:15:18'),
(29, 1, 2, 'Csoki', '2025-12-16 10:36:49'),
(30, 1, 2, 'teszt', '2025-12-16 11:04:35'),
(31, 1, 2, 'Csoki', '2025-12-17 10:58:18'),
(32, 1, 2, 'csoki', '2025-12-17 10:58:23'),
(37, 1, 2, 'Teszt', '2026-01-06 08:18:13'),
(38, 1, 2, 'Teszt', '2026-01-06 08:18:50'),
(39, 1, 2, 'teszt', '2026-01-06 08:25:59'),
(43, 1, 4, 'Teszt', '2026-01-06 08:44:32');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `megosztasok`
--

CREATE TABLE `megosztasok` (
  `megosztasok_id` int(11) NOT NULL,
  `bejegyzes_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `megosztva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rang`
--

CREATE TABLE `rang` (
  `rang_id` int(11) NOT NULL,
  `rang_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `rang`
--

INSERT INTO `rang` (`rang_id`, `rang_nev`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reakciok`
--

CREATE TABLE `reakciok` (
  `reakciok_id` int(11) NOT NULL,
  `bejegyzes_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `reakcio` int(11) NOT NULL,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `reakciok`
--

INSERT INTO `reakciok` (`reakciok_id`, `bejegyzes_id`, `felhasznalo_id`, `reakcio`, `letrehozva`) VALUES
(1, 1, 2, 0, '2025-11-17 12:50:50'),
(2, 1, 3, 1, '2025-11-17 12:51:04');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `telepules`
--

CREATE TABLE `telepules` (
  `telepules_id` int(11) NOT NULL,
  `telepules_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `telepules`
--

INSERT INTO `telepules` (`telepules_id`, `telepules_nev`) VALUES
(1, 'Debrecen'),
(2, 'Miskolc'),
(3, 'Budapest'),
(4, 'Kaba'),
(5, 'Szeged'),
(6, 'Miskolc'),
(7, 'Pécs'),
(8, 'Győr'),
(9, 'Nyíregyháza'),
(10, 'Kecskemét'),
(11, 'Székesfehérvár'),
(12, 'Szombathely'),
(13, 'Szolnok'),
(14, 'Tatabánya'),
(15, 'Salgótarján'),
(16, 'Eger'),
(17, 'Veszprém'),
(18, 'Zalaegerszeg'),
(19, 'Kaposvár'),
(20, 'Békéscsaba'),
(21, 'Hódmezővásárhely'),
(22, 'Dunaújváros'),
(23, 'Érd'),
(24, 'Sopron'),
(25, 'Baja'),
(26, 'Esztergom'),
(27, 'Vác'),
(28, 'Siófok'),
(29, 'Balatonfüred'),
(30, 'Gödöllő'),
(31, 'Dunakeszi'),
(32, 'Cegléd'),
(33, 'Nagykőrös'),
(34, 'Kiskunfélegyháza'),
(35, 'Kiskunhalas'),
(36, 'Makó'),
(37, 'Orosháza'),
(38, 'Gyula'),
(39, 'Kazincbarcika'),
(40, 'Ózd'),
(41, 'Tiszaújváros'),
(42, 'Hajdúszoboszló'),
(43, 'Hajdúböszörmény');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  ADD PRIMARY KEY (`bejegyzesek_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `helyszin` (`helyszin`);

--
-- A tábla indexei `belepes`
--
ALTER TABLE `belepes`
  ADD PRIMARY KEY (`felhasznalo_id`),
  ADD KEY `felhasznalo_rang` (`felhasznalo_rang`);

--
-- A tábla indexei `csoportok`
--
ALTER TABLE `csoportok`
  ADD PRIMARY KEY (`csoport_id`),
  ADD KEY `csoport_telepules` (`csoport_telepules`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`felhasznalok_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `felhasznalo_csoportok`
--
ALTER TABLE `felhasznalo_csoportok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalok_id` (`felhasznalok_id`),
  ADD KEY `csoport_id` (`csoport_id`);

--
-- A tábla indexei `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  ADD PRIMARY KEY (`hozzaszolasok_id`),
  ADD KEY `bejegyzes_id` (`bejegyzes_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `megosztasok`
--
ALTER TABLE `megosztasok`
  ADD PRIMARY KEY (`megosztasok_id`),
  ADD KEY `bejegyzes_id` (`bejegyzes_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`rang_id`);

--
-- A tábla indexei `reakciok`
--
ALTER TABLE `reakciok`
  ADD PRIMARY KEY (`reakciok_id`),
  ADD KEY `bejegyzes_id` (`bejegyzes_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `telepules`
--
ALTER TABLE `telepules`
  ADD PRIMARY KEY (`telepules_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  MODIFY `bejegyzesek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `belepes`
--
ALTER TABLE `belepes`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `csoportok`
--
ALTER TABLE `csoportok`
  MODIFY `csoport_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhasznalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `felhasznalo_csoportok`
--
ALTER TABLE `felhasznalo_csoportok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  MODIFY `hozzaszolasok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT a táblához `megosztasok`
--
ALTER TABLE `megosztasok`
  MODIFY `megosztasok_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `rang`
--
ALTER TABLE `rang`
  MODIFY `rang_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `reakciok`
--
ALTER TABLE `reakciok`
  MODIFY `reakciok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `telepules`
--
ALTER TABLE `telepules`
  MODIFY `telepules_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  ADD CONSTRAINT `bejegyzesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalok_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bejegyzesek_ibfk_2` FOREIGN KEY (`helyszin`) REFERENCES `telepules` (`telepules_id`);

--
-- Megkötések a táblához `belepes`
--
ALTER TABLE `belepes`
  ADD CONSTRAINT `belepes_ibfk_1` FOREIGN KEY (`felhasznalo_rang`) REFERENCES `rang` (`rang_id`);

--
-- Megkötések a táblához `csoportok`
--
ALTER TABLE `csoportok`
  ADD CONSTRAINT `csoportok_ibfk_1` FOREIGN KEY (`csoport_telepules`) REFERENCES `telepules` (`telepules_id`);

--
-- Megkötések a táblához `felhasznalo_csoportok`
--
ALTER TABLE `felhasznalo_csoportok`
  ADD CONSTRAINT `felhasznalo_csoportok_ibfk_1` FOREIGN KEY (`felhasznalok_id`) REFERENCES `felhasznalok` (`felhasznalok_id`),
  ADD CONSTRAINT `felhasznalo_csoportok_ibfk_2` FOREIGN KEY (`csoport_id`) REFERENCES `csoportok` (`csoport_id`);

--
-- Megkötések a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  ADD CONSTRAINT `hozzaszolasok_ibfk_1` FOREIGN KEY (`bejegyzes_id`) REFERENCES `bejegyzesek` (`bejegyzesek_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hozzaszolasok_ibfk_2` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalok_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `megosztasok`
--
ALTER TABLE `megosztasok`
  ADD CONSTRAINT `megosztasok_ibfk_1` FOREIGN KEY (`bejegyzes_id`) REFERENCES `bejegyzesek` (`bejegyzesek_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `megosztasok_ibfk_2` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalok_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `reakciok`
--
ALTER TABLE `reakciok`
  ADD CONSTRAINT `reakciok_ibfk_1` FOREIGN KEY (`bejegyzes_id`) REFERENCES `bejegyzesek` (`bejegyzesek_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reakciok_ibfk_2` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalok_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
