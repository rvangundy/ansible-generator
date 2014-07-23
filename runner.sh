#!/bin/bash

# Check the role/playbook's syntax.
ansible-playbook main.yml --syntax-check

# Run the role/playbook with ansible-playbook.
ansible-playbook -vv main.yml --connection=local --ask-sudo-pass