

.PHONY: all watch
all: rockpaperscissor.html

watch:
	npx tailwindcss -i ./input.css -o ./output.css --watch

rockpaperscissor.html: output.css
	touch $@

build: output.css

output.css: input.css tailwind.config.js
	npx tailwindcss -i ./input.css -o ./output.css

input.css:

tailwind.config.js:
