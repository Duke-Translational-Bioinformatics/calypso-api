#!/bin/bash
ssh deployer@calypso-qa.sbox.es 'export NODE_ENV=test && cd calypso-api && git fetch --all && git reset --hard origin/feature/csv-parser && npm install && pm2 restart pm2-run-api && pm2 logs pm2-run-api --lines 100'
