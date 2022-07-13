

.PHONY: all watch
all: $(wildcard *.html)

%.html: output.css
	touch $@

build: output.css

output.css: input.css tailwind.config.js
	npx tailwindcss -i ./input.css -o ./output.css

watch:
	npx tailwindcss -i ./input.css -o ./output.css --watch

