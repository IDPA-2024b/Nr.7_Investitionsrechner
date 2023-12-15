# Investitionsrechner

Ziel ist es, eine Webapp zu entwickeln, mit der man sein Investitionsportfolio an einem zentralen Ort überwachen kann.

## Nutzungsablauf

1. Nutzer loggt sich ein
2. Nutzer trägt Aktie ein (Kaufpreis, Datum, Anzahl, Aktie)
3. Nutzer kann Preise seiner Aktie im Dashboard überwachen (Kursdiagramm, Kursgewinn oder -verlust)
4. Nutzer verkauft Aktie und trägt dies im Dashboard ein (Verkaufsdatum, Preis)
5. Nutzer sieht die Statistik der verkauften Aktie (Gewinn oder Verlust, Kursdiagramm)

## Umfang

### Core

1. Aktien im Portfolio eintragen / löschen
2. Aktien API anbinden um echt Zeit Preise anzuzeigen

### Features

3. Preis Benachrichtigung (bei Aktienpreis x E-Mail versenden)
4. Andere Investitionen eintragen (Immobilien etc.)

## Pages

- Home / Welcome
- Login / Register
- **Dashboard** \
  Bietet eine einfache Verwaltung und Gesamtperformance des Portfolios.
- **einzelne Aktien Übersicht** \
  Hier werden die einzelnen Investitionen genauer angezeigt.
- ToS (Terms of Service)
- About

## Tech Stack

Frontend: Typescript, React, Chakra UI \
Backend: _Unklar ob eigenes oder BaaS wie Firebase_ \
Datenbank: _Unklar_