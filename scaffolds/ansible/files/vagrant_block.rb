  # ANSIBLE PROVISIONING
  config.vm.provision \"ansible\" do |ansible|
    ansible.playbook = \"provisioning/development.yml\"
    ansible.sudo = true
  end
