# RPS
Schere Stein Papier Spiel mit ML5 und Tailwind

## Getting started
Um die Website nutzen zu können lade dir das Repo herunter:

```sh 
git clone greenishhhh/RPS
cd RPS
npm install # Downloade dependencies
make watch # Um die CSS zu generieren. Nutzt den Tailwind client und bleibt aktive um änderungen zu übernhemen.
```

Webcamzugriff wird gernerell **nur über https** oder **localhost** erlaubt. Es reicht **nicht** einfach die HTML im Webbroswer zu öffnen.
Stattdessen kannst du einen localen Server öffnen:

```sh
# Im RPS Ordner
python -m http.server 
```

Die Website ist jetzt unter http://localhost:8000 zu finden.
