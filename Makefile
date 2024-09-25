# Variables
REMOTE_HOST=jaspmod
REMOTE_DIR=app-nodejs/
PROJECT_DIR=.
OLD_PATH=$(PATH)
.PHONY: _kill _run-remote clean run-remote

# Default target
all: deploy

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
	npm start

# Customize these for your remote server
_run-remote: export NVM_DIR=$(HOME)/.nvm
_run-remote: export NVM_BIN=$(NVM_DIR)/versions/node/v22.8.0/bin
_run-remote: export PATH=$(NVM_BIN):$(shell printenv PATH)
_run-remote: _kill
		# printenv
		npm install
		npm start

_kill:
	-ps aux | grep server | grep -v grep | awk '{print $$2}' | xargs kill -9 > /dev/null 2>&1

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


