#!/bin/bash
ssh deployer@calypso-qa.sbox.es 'cd calypso-api && git fetch --all && git reset --hard origin/feature/csv-parser && pm2 restart pm2-run-api.sh'
