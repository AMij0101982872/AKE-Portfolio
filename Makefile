# Raccourcis du pipeline local (mêmes étapes que la CI)
.PHONY: dev prod check export stop clean

dev:      ## Serveur de dev avec hot-reload → http://localhost:3000
	docker compose up --build dev

prod:     ## Image de production locale → http://localhost:8080
	docker compose up --build prod

check:    ## Lint + types + build, exactement comme la CI
	docker build --target build -t portfolio:check .

export:   ## Génère le site statique dans ./out via Docker
	docker build --target export --output type=local,dest=out .

stop:
	docker compose down

clean:
	docker compose down --rmi local --volumes
	rm -rf out .next
