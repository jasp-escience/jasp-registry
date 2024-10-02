# Variables
REMOTE_HOST=jaspmod
REMOTE_DIR=app/
PROJECT_DIR=.
OLD_PATH=$(PATH)
NODE_VERSION=22
# Path to nvm (adjust if necessary)
NVM_DIR = $(HOME)/.nvm

# Load nvm
NVM_SCRIPT = . $(NVM_DIR)/nvm.sh

SHELL := /bin/bash

# Default target
all: run-remote

#Check if the Node version is installed and install it if not
.PHONY: use_node
use_node:
	@# Check if the required Node.js version is installed using `nvm ls`
	@echo "Checking Node.js version $(NODE_VERSION)..."
	@$(NVM_SCRIPT) && nvm ls $(NODE_VERSION) > /dev/null 2>&1; \
	if [ $$? -eq 0 ]; then \
		echo "Node.js $(NODE_VERSION) is already installed."; \
	else \
		echo "Node.js $(NODE_VERSION) is not installed. Installing..."; \
		$(NVM_SCRIPT) && nvm install $(NODE_VERSION); \
	fi
	@# Use the desired Node.js version
	@echo "Using Node.js $(NODE_VERSION)..."
	@$(NVM_SCRIPT) && nvm use $(NODE_VERSION)

.PHONY: frontend
frontend:
	cd frontend && npm install && npm run build
	rm -rf backend/public/dist
	cp -r frontend/dist backend/public/

# Step to build locally (optional)
build:
	npm install

install:
	make build

run:
	npm run dev

# Customize these for your remote server
.PHONY: _run-remote 
_run-remote: _kill use_node
		$(NVM_SCRIPT); \
		npm install; \
		npm run dev

.PHONY: _kill
_kill:
	-ps aux | grep 'node backend/app.js' | grep -v grep | awk '{print $$2}' | xargs kill -9 > /dev/null 2>&1

.PHONY: run-remote
run-remote: frontend deploy
	 #ssh $(REMOTE_HOST) "source ~/.bashrc; cd $(REMOTE_DIR); make run"
	 ssh -t $(REMOTE_HOST) "cd $(REMOTE_DIR); make _run-remote"

# Step to deploy the project, build it remotely, and run it remotely
deploy:
	# Use rsync to copy project to remote server, excluding the target folder
	rsync -av --exclude node_modules $(PROJECT_DIR)/ $(REMOTE_HOST):$(REMOTE_DIR)

# Clean locally
clean:
	rm -rf node_modules


