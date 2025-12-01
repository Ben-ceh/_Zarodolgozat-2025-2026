-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 01. 14:08
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
CREATE DATABASE IF NOT EXISTS `okos_kozosseg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `okos_kozosseg`;

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
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `bejegyzesek`
--

INSERT INTO `bejegyzesek` (`bejegyzesek_id`, `felhasznalo_id`, `cim`, `tartalom`, `kep_url`, `letrehozva`) VALUES
(1, 1, 'Az első poszt.', 'Sziasztok! Ez lenne az első poszt ezen a weboldalon. Én és a kollégámmal szeretnénk egy barátságos közösséget építeni, ami kisegíti és informálja a tagjait. Köszönöm hogy végig olvastad, legyen csodálatos napod! ', '1.jfif', '2025-11-17 12:44:02'),
(2, 2, 'közúti tájékoztatás.', 'Tisztelt Lakosság!\r\n\r\nEzúton szeretnénk tájékoztatni Önöket, hogy településünk egyik legforgalmasabb útszakaszán, a … utcában/úton útfelújítási munkálatok kezdődnek a jövő hét elején. A beruházás célja a régi, elhasználódott burkolat teljes cseréje, valamint az út szerkezetének megerősítése annak érdekében, hogy hosszú távon biztonságosabb és kényelmesebb közlekedést biztosítsunk valamennyi közlekedő számára.\r\n\r\nA munkálatok várhatóan két hétig tartanak, ez idő alatt az érintett útszakaszon ideiglenes forgalomkorlátozásokra és részleges lezárásokra kell számítani. Kérjük a lakosokat, hogy a kihelyezett közlekedési táblákat, jelzéseket fokozott figyelemmel kövessék, és lehetőség szerint válasszanak kerülőútvonalat. Az út mentén élők számára korlátozott ideig előfordulhat zaj- és porhatás, ugyanakkor a kivitelező mindent megtesz annak érdekében, hogy a kellemetlenségeket a lehető legkisebbre csökkentse.\r\n\r\nMegértésüket és türelmüket előre is köszönjük. Bízunk benne, hogy a felújítás befejezését követően mindenki elégedetten tapasztalja majd az új burkolat nyújtotta könnyebb és biztonságosabb közlekedést.', NULL, '2025-11-21 10:32:02'),
(3, 3, 'Alma', 'Alma', '3.jfif', '2025-11-21 11:40:35');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalo_id` int(11) NOT NULL,
  `felhasznalo_nev` varchar(255) NOT NULL,
  `felhasznalo_jelszo` varchar(255) NOT NULL,
  `felhasznalo_rang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalo_id`, `felhasznalo_nev`, `felhasznalo_jelszo`, `felhasznalo_rang`) VALUES
(5, 'Aa', '$2a$10$auhieAYn7dvRvnziq7bFHuNTcBVx/LMBUofF/wsbkz6rfTn95x6mO', 1),
(6, 'Admin', '$2a$10$FNoGv4HB.4kVETfdb2QvbegXOqNv2BNpXWCDwFKla.www/Qz0wMB.', 2),
(8, 'User', '$2b$10$6/h08PIcMvWwlzV66dNsaeMD5Vc/jq0q2N4p1IsvO5YrvZdP9VyxK', 1),
(9, 'Proba', '$2b$10$eAcFZ8OKIz8KgAzEGhsJxeZyLcNb4Lfe2bfgfTmygINASTzN9jCxq', 1),
(10, 'gg', '$2b$10$.AmZdgjyIr7QbCVvfLkTwO/Kd.FQ7DP4AZAjb4wgpt/8lorEXEd4.', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `felhasznalok_id` int(11) NOT NULL,
  `felhasznalonev` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `jelszo_hash` varchar(255) NOT NULL,
  `profil_kep` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `neme` int(11) NOT NULL,
  `regisztralt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`felhasznalok_id`, `felhasznalonev`, `email`, `jelszo_hash`, `profil_kep`, `bio`, `neme`, `regisztralt`) VALUES
(1, 'Komóczi Bence Tibor', 'BenceTibor@gmail.com', '', '1.jfif', 'A nevem Komóczi Bence Tibor.Egy weboldalt próbálok készíteni.', 1, '2025-11-17 12:37:24'),
(2, 'Nagy Sándor', 'NagySandor@gmail.com', '', NULL, 'A nevem Nagy Sándor. Egy weboldalt próbálok készíteni.', 1, '2025-11-17 12:40:21'),
(3, 'Banai Míra', 'BaniMíra@gmail.com', '', NULL, 'A nevem Banai Míra. Nem szeretem a jókedvet.', 2, '2025-11-17 12:41:33');

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
(2, 1, 3, 'Szevasztok! Ez az oldal borzalmas!4!!', '2025-11-17 12:50:02');

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

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  ADD PRIMARY KEY (`bejegyzesek_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznalo_id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`felhasznalok_id`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  ADD UNIQUE KEY `email` (`email`);

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
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  MODIFY `bejegyzesek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhasznalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  MODIFY `hozzaszolasok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  ADD CONSTRAINT `bejegyzesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalok_id`) ON DELETE CASCADE;

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
