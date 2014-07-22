#!/bin/bash

# Check the role/playbook's syntax.
ansible-playbook main.yml --syntax-check

# Run the role/playbook with ansible-playbook.
ansible-playbook main.yml --connection=local --ask-sudo-pass

# Run the role/playbook again, checking to make sure it's idempotent.
ansible-playbook main.yml --connection=local --ask-sudo-pass | grep -q 'changed=0.*failed=0' && (echo 'Idempotence test: pass' && exit 0) || (echo 'Idempotence test: fail' && exit 1)