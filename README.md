# Investitionsrechner

Ziel ist es, eine Webapp zu entwickeln, mit der eine Privatperson sein Investitionsportfolio an einem zentralen Ort überwachen kann. Die App soll die Möglichkeit bieten, Aktien, Immobilien, Fahrzeuge, Kryptowährungen und andere Investitionen einzutragen und deren Performance zu überwachen.

## Umfang

### Core

1. Aktien im Portfolio eintragen / löschen
2. Aktien API anbinden um echt Zeit Preise anzuzeigen
3. Andere Investitionen eintragen / löschen / bearbeiten (Immobilien, Fahrzeuge, Kryptowährungen, etc.)
4. Statistiken über die Performance der Investitionen anzeigen (Gewinn oder Verlust, Kursdiagramm)
5. Dashboard mit Gesamtperformance des Portfolios anzeigen (Gewinn oder Verlust, Kursdiagramm)

### Additional

1. Preis Benachrichtigung (bei Aktienpreis x E-Mail versenden)

## Use Cases

### Use Case Diagramm

_Noch nicht vorhanden._

### Core

- UC01: Als Benutzer möchte die Startseite sehen, um mich über die App zu informieren. \
- UC02: Als Benutzer möchte ich die Datenschutzerklärung sehen, um mich über die Verarbeitung meiner Daten zu informieren. \
- UC03: Als Benutzer möchte ich eine Seite sehen, welche die Betreiber der App vorstellt, um mich über die App zu informieren. \
- UC04: Als Benutzer möchte ich Kontakt zu den Betreibern der App aufnehmen können, um Fragen zu stellen. \
- UC05: Als Benutzer möchte ich mich über Google anmelden können, um die App zu nutzen. \
- UC06: Als Benutzer möchte ich mein Portfolio einsehen können, um meine Investitionen zu überwachen. \
- UC07: Als Benutzer möchte ich mein Portfolio filtern können, um nur bestimmte Investitionen anzuzeigen. \
- UC08: Als Benutzer möchte ein neues Investment hinzufügen können, um dieses zu überwachen. \
- UC09: Als Benutzer möchte ich auf ein Investment klicken können, um die Performance des Investments zu sehen. \
- UC10: Als Benutzer möchte ich ein Investment bearbeiten können, um die Daten zu aktualisieren. \
- UC11: Als Benutzer möchte ich ein Investment als verkauft markieren können, um den Verkauf zu dokumentieren. \
- UC12: Als Benutzer möchte ich ein Investment löschen können, um es aus meinem Portfolio zu entfernen. \
- UC13: Als Benutzer möchte ich mich ausloggen können, um die App zu verlassen. \

### Additional

_Noch keine Use Cases vorhanden._

## Tech Stack

**Frontend**: [Typescript](https://www.typescriptlang.org/), [React](https://react.dev), [Chakra UI](https://chakra-ui.com/), [Firebase SDK](https://firebase.google.com/docs/web/setup) \
**Datenbank**: [Firestore](https://firebase.google.com/docs/firestore) \
**Hosting**: [Firebase Hosting](https://firebase.google.com/docs/hosting)