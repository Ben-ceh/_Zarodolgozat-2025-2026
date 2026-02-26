-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 26. 11:10
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
CREATE DATABASE IF NOT EXISTS `okos_kozosseg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
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
  `helyszin` int(11) NOT NULL,
  `kategoria` int(11) NOT NULL,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  `csoport_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `bejegyzesek`
--

INSERT INTO `bejegyzesek` (`bejegyzesek_id`, `felhasznalo_id`, `cim`, `tartalom`, `kep_url`, `helyszin`, `kategoria`, `letrehozva`, `csoport_id`) VALUES
(1, 1, 'Az első poszt.', 'Sziasztok! Ez lenne az első poszt ezen a weboldalon. Én és a kollégámmal szeretnénk egy barátságos közösséget építeni, ami kisegíti és informálja a tagjait. Köszönöm hogy végig olvastad, legyen csodálatos napod! ', '1.jfif', 4, 1, '2025-11-17 12:44:02', 1),
(2, 2, 'közúti tájékoztatás.', 'Tisztelt Lakosság!\r\n\r\nEzúton szeretnénk tájékoztatni Önöket, hogy településünk egyik legforgalmasabb útszakaszán, a … utcában/úton útfelújítási munkálatok kezdődnek a jövő hét elején. A beruházás célja a régi, elhasználódott burkolat teljes cseréje, valamint az út szerkezetének megerősítése annak érdekében, hogy hosszú távon biztonságosabb és kényelmesebb közlekedést biztosítsunk valamennyi közlekedő számára.\r\n\r\nA munkálatok várhatóan két hétig tartanak, ez idő alatt az érintett útszakaszon ideiglenes forgalomkorlátozásokra és részleges lezárásokra kell számítani. Kérjük a lakosokat, hogy a kihelyezett közlekedési táblákat, jelzéseket fokozott figyelemmel kövessék, és lehetőség szerint válasszanak kerülőútvonalat. Az út mentén élők számára korlátozott ideig előfordulhat zaj- és porhatás, ugyanakkor a kivitelező mindent megtesz annak érdekében, hogy a kellemetlenségeket a lehető legkisebbre csökkentse.\r\n\r\nMegértésüket és türelmüket előre is köszönjük. Bízunk benne, hogy a felújítás befejezését követően mindenki elégedetten tapasztalja majd az új burkolat nyújtotta könnyebb és biztonságosabb közlekedést.', NULL, 1, 2, '2025-11-21 10:32:02', 1),
(3, 3, 'Alma', 'Alma', '3.jfif', 1, 3, '2025-11-21 11:40:35', 1),
(4, 4, 'Virág osztás a hétvégén!', 'Az önkörmányzat ingyen ad virágot.', NULL, 1, 6, '2025-12-11 13:19:55', 2),
(5, 4, 'Teszt', 'Teszt', NULL, 19, 1, '2025-12-17 11:42:06', 1),
(6, 2, 'Nem tudom,teszt!!4!', 'Nagy teszt!', NULL, 28, 1, '2025-12-17 12:01:29', 2),
(7, 2, 'Havazik', 'Havazik', NULL, 1, 1, '2026-01-06 07:57:48', 3),
(8, 3, 'Sport', 'Sportolni kezdtem.', NULL, 1, 6, '2026-01-15 09:24:21', 4),
(9, 3, 'Sport', 'Sport', NULL, 42, 2, '2026-01-15 09:42:08', 4),
(10, 3, 'Sport', 'Sport', NULL, 30, 2, '2026-01-15 09:43:16', 3),
(14, 4, 'Csokoládé', 'Csokoládé@gmail.com', NULL, 1, 1, '2026-01-22 11:07:08', 1),
(17, 4, 'Teszt', 'TesztTeszt', NULL, 2, 2, '2026-01-22 11:10:26', 2),
(18, 4, 'TesztTeszt', 'TesztTesztTeszt', NULL, 1, 1, '2026-01-22 11:12:45', 1),
(19, 4, 'adasd', 'adasd', NULL, 1, 1, '2026-01-26 11:46:51', 1),
(20, 4, 'Kátyús utak', 'A Létai út egyik felén betömték az kátyúkat de a másik felén nem, vigyázatok!', NULL, 1, 1, '2026-02-05 07:47:52', 5),
(21, 4, 'Teszt!!!', 'Teszt!!!Teszt!!!Teszt!!!', NULL, 1, 2, '2026-02-06 12:05:51', 1),
(22, 4, 'Időjárás', 'Esik az eső!', '1_1770379700462_297998431.png', 1, 1, '2026-02-06 12:08:20', 1),
(23, 6, 'TEsztTEsztTEszt', 'TEsztTEsztTEszt', NULL, 2, 2, '2026-02-09 12:54:17', 1),
(24, 6, 'TesztTesztTesztTesztTesztTesztTesztTesztTeszt', 'TesztTesztTesztTesztTesztTesztTesztTesztTeszt', '1_1770642207514_123947073.png', 1, 1, '2026-02-09 13:03:27', 1),
(25, 4, 'Időjárás', 'Esik az eső!', 'smile_1772098438145_89245270.png', 1, 1, '2026-02-26 09:33:58', 1),
(26, 4, 'Időjárás', 'Esik az eső!', 'smile_1772098802268_113656087.png', 1, 1, '2026-02-26 09:40:02', 1),
(27, 6, 'sadadsad', 'asdsadasd', NULL, 2, 2, '2026-02-26 09:50:42', 1),
(28, 6, 'dfdfg', 'dfgdfg', NULL, 1, 2, '2026-02-26 09:55:44', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bejegyzesek_kategoria`
--

CREATE TABLE `bejegyzesek_kategoria` (
  `kategoria_id` int(11) NOT NULL,
  `kategoria_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `bejegyzesek_kategoria`
--

INSERT INTO `bejegyzesek_kategoria` (`kategoria_id`, `kategoria_nev`) VALUES
(1, 'Közlekedés'),
(2, 'Események'),
(3, 'Veszélyhelyzetek'),
(4, 'Elveszett tárgyak'),
(5, 'Helyi hírek'),
(6, 'Kérdés');

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
(11, 'komoczib', '$2b$10$qcOHMHi97SEEkhC9CpyrgePeYNEeiUXCvBZxhA8ozH6Qjq3433fZK', 2),
(13, 'Ismeretlen', '$2y$10$.XpqvywlmUJIED7lu4uFt.uXXAd5AbuSE6rwEXDc5Rlc3YsVk0dtO', 1),
(14, 'Nagy Ferenc', '$2b$10$f3PAfzmCJxhsGT8Krpqh5eGemlyF3e/JLBCJLsXcLCj0bzoe5myWW', 1);

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
  `csoport_letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  `csoportok_tulajdonos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `csoportok`
--

INSERT INTO `csoportok` (`csoport_id`, `csoport_nev`, `csoport_leiras`, `csoport_telepules`, `csoport_kep`, `csoport_letrehozva`, `csoportok_tulajdonos`) VALUES
(1, 'Általános', 'Általános', 1, NULL, '2025-12-11 13:06:27', 2),
(2, 'Homokkerti barát', 'Homokkerti barátok akik szeretik a kertészetet.', 1, NULL, '2025-12-11 13:14:08', 2),
(3, 'Időjárás', 'Dugóvan az utakon', 1, NULL, '2026-01-06 07:56:14', 2),
(4, 'Sport', 'Sport', 1, NULL, '2026-01-15 09:22:59', 2),
(5, 'Szabadság telepi csoport', NULL, 1, NULL, '2026-02-05 07:45:23', 2),
(11, 'Nagy diák teszt', 'TEszt', 1, NULL, '2026-02-26 09:42:07', 1),
(16, 'asdads', 'adad', 4, 'smile_1772099686866_443931403.png', '2026-02-26 09:54:46', 6),
(17, 'dsfsdfsdfsd', 'sdfsdfsd', 1, 'smile_1772099704087_267861578.png', '2026-02-26 09:55:04', 6),
(20, 'fghfg', 'fghfghg', 1, NULL, '2026-02-26 09:58:23', 6);

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
(4, 'Manci@gmail.com', 'manci.jpg', 'Manci.', 2, 'Manci Nagy', 8),
(5, 'Ismeretlen@gmail.com', NULL, 'Ismeretlen', 1, 'Ismeretlen', 13),
(6, 'NagyFerenc@gmail.com', NULL, NULL, 1, 'Nagy Ferenc', 14);

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
(12, 3, 4, '2026-01-15 09:23:32'),
(13, 3, 1, '2026-01-16 11:44:47'),
(14, 3, 2, '2026-01-16 11:44:47'),
(15, 4, 2, '2026-01-22 08:05:43'),
(16, 4, 5, '2026-02-05 07:45:43'),
(17, 6, 1, '2026-02-05 07:57:57'),
(18, 4, 4, '2026-02-06 08:45:52'),
(42, 6, 2, '2026-02-19 13:22:43'),
(43, 6, 3, '2026-02-19 13:23:01'),
(46, 6, 5, '2026-02-19 13:27:43');

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
(43, 1, 4, 'Teszt', '2026-01-06 08:44:32'),
(44, 1, 4, 'Csak egy teszt.', '2026-01-12 13:16:01'),
(45, 1, 2, 'asd', '2026-01-12 13:16:23'),
(47, 1, 5, 'Ismeretlen', '2026-01-14 10:50:41'),
(48, 1, 5, 'asduzliz', '2026-01-14 11:55:13'),
(49, 5, 5, 'asdas', '2026-01-15 08:10:50'),
(50, 2, 4, 'asd', '2026-01-15 09:46:00'),
(51, 1, 4, 'asd', '2026-01-16 12:44:52'),
(52, 1, 5, 'adsad', '2026-01-20 07:46:29'),
(53, 5, 4, 'asdas', '2026-01-20 07:46:34'),
(54, 1, 5, 'adasd', '2026-01-26 10:25:50'),
(55, 19, 6, 'Teszt', '2026-02-05 07:58:18'),
(56, 1, 5, 'asdsadas', '2026-02-12 09:05:47');

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenet`
--

CREATE TABLE `uzenet` (
  `uzenet_id` int(11) NOT NULL,
  `uzenet_iro` int(11) NOT NULL,
  `uzenet_kinek` int(11) NOT NULL,
  `uzenet_datum` datetime NOT NULL,
  `uzenet_szoveg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `uzenet`
--

INSERT INTO `uzenet` (`uzenet_id`, `uzenet_iro`, `uzenet_kinek`, `uzenet_datum`, `uzenet_szoveg`) VALUES
(1, 6, 4, '2026-02-06 12:35:08', 'Teszt¤¤¤¤¤'),
(2, 6, 6, '2026-01-26 00:00:00', '/ban Nagy Ferenc'),
(3, 6, 6, '2026-01-26 00:00:00', '/unban Nagy Ferenc'),
(4, 6, 3, '2026-01-26 00:00:00', 'Vége vna !44!');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  ADD PRIMARY KEY (`bejegyzesek_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `helyszin` (`helyszin`),
  ADD KEY `bejegy_kategoria` (`kategoria`),
  ADD KEY `csoport_id` (`csoport_id`);

--
-- A tábla indexei `bejegyzesek_kategoria`
--
ALTER TABLE `bejegyzesek_kategoria`
  ADD PRIMARY KEY (`kategoria_id`);

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
  ADD UNIQUE KEY `uniq_user_group` (`felhasznalok_id`,`csoport_id`),
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
-- A tábla indexei `uzenet`
--
ALTER TABLE `uzenet`
  ADD PRIMARY KEY (`uzenet_id`),
  ADD KEY `uzenet_iro` (`uzenet_iro`),
  ADD KEY `uzenet_kinek` (`uzenet_kinek`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  MODIFY `bejegyzesek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT a táblához `bejegyzesek_kategoria`
--
ALTER TABLE `bejegyzesek_kategoria`
  MODIFY `kategoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `belepes`
--
ALTER TABLE `belepes`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `csoportok`
--
ALTER TABLE `csoportok`
  MODIFY `csoport_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhasznalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `felhasznalo_csoportok`
--
ALTER TABLE `felhasznalo_csoportok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  MODIFY `hozzaszolasok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

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
-- AUTO_INCREMENT a táblához `uzenet`
--
ALTER TABLE `uzenet`
  MODIFY `uzenet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bejegyzesek`
--
ALTER TABLE `bejegyzesek`
  ADD CONSTRAINT `bejegyzesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalok_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bejegyzesek_ibfk_2` FOREIGN KEY (`helyszin`) REFERENCES `telepules` (`telepules_id`),
  ADD CONSTRAINT `bejegyzesek_ibfk_3` FOREIGN KEY (`kategoria`) REFERENCES `bejegyzesek_kategoria` (`kategoria_id`),
  ADD CONSTRAINT `bejegyzesek_ibfk_4` FOREIGN KEY (`csoport_id`) REFERENCES `csoportok` (`csoport_id`);

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

--
-- Megkötések a táblához `uzenet`
--
ALTER TABLE `uzenet`
  ADD CONSTRAINT `uzenet_ibfk_1` FOREIGN KEY (`uzenet_iro`) REFERENCES `belepes` (`felhasznalo_id`),
  ADD CONSTRAINT `uzenet_ibfk_2` FOREIGN KEY (`uzenet_kinek`) REFERENCES `felhasznalok` (`felhasznalok_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
