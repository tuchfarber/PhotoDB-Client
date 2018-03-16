.DEFAULT_GOAL := help

help: ## Display this help message
	@echo "Please use \`make <target>' where <target> is one of"
	@perl -nle'print $& if m{^[\.a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'

dev.up: ## Run with development settings
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build

prod.up: ## Run with production settings
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build

# prod-restart: ## Kills containers, clears static volume, restarts containers
# 	-docker-compose -f docker-compose.yml -f docker-compose-prod.yml down ## Ignore failure do to remove network
# 	docker-compose -f docker-compose-clean.yml down -v
# 	$(MAKE) prod-up

shell: ## Enter bash shell
	docker exec -it photodb.frontend bash
