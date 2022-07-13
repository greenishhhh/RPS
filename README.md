# Rock Paper Scissors
Schere Stein Papier Spiel mit ML5 und [Tailwind](https://tailwindcss.com/)

![example](example/example.gif)

## Getting started
Um die Website nutzen zu können lade dir das Repo herunter:

```sh 
git clone greenishhhh/RPS
cd RPS
npm install # Downloade Tailwind dependencies, braucht man nicht wenn css nicht verändert werden soll
make 
```

Webcamzugriff wird gernerell **nur über https** oder **localhost** erlaubt. Es reicht **nicht** einfach die HTML im Webbroswer zu öffnen.
Stattdessen kannst du einen localen Server öffnen:

```sh
# Im RPS Ordner
python -m http.server 
```

Die Website ist jetzt unter http://localhost:8000 zu finden.

## Custom Model laden
Konvertiere dein Model zu Tensorflow.js mit 
TBA

Editiere in der **model.json** `functional` zu `Model` siehe [hier](https://stackoverflow.com/questions/63143849/tensorflow-js-error-unknown-layer-functional)

Stelle sicher, dass dein Modell eine Größe von 224x224 Pixeln x3 (rgb) hat siehe [hier](https://github.com/ml5js/ml5-library/issues/175)
