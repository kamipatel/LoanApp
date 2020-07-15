#!/bin/bash

sfdx force:org:create -f config/project-scratch-def.json -a ADK --setdefaultusername -d 1

sfdx force:source:push 

sfdx force:user:permset:assign -n loanapp 

sfdx force:apex:execute -f config/create-demo-data-setup.apex

sfdx force:org:open
