Project Generator
=================

The purpose of this role is to set up new project folders and automate the generation of
source files. The projects it creates are intended to be developed in a Mac OS X environment using VirtualBox and Vagrant. In addition to setting up project folders, the generator
also installs all development tools and settings on the local machine.

## Roles

### /apps
* Homebrew
* SublimeText
* VirtualBox
* Vagrant
* Chrome
* Firefox
* Dropbox
* NodeJS

### /scaffolds
* dev
* git
* nodejs
* vagrant
* webapp
* docker

#### scaffolds/dev
The dev scaffold sets up a new project folder along with basic project files, including:
* README.md
* .editorconfig
* .gitignore

#### scaffolds/node
The npm scaffold sets the following files and runs ```npm install```.
* package.json
* .jshintrc

#### scaffolds/git
Runs ```git init```, establishes a remote git repository, and runs ```git commit```.

#### scaffolds/vagrant
Sets a basic Vagrantfile.

#### scaffolds/webapp
Creates a full-stack node.js app 

Requirements
------------

The only pre-requisites are a development machine running OS X >= v10.8 and Ansible >= v1.7. The generator will attempt to install additional dependencies.

Role Variables
--------------

A description of the settable variables for this role should go here, including any variables that are in defaults/main.yml, vars/main.yml, and any variables that can/should be set via parameters to the role. Any variables that are read from other roles and/or the global scope (ie. hostvars, group vars, etc.) should be mentioned here as well.

Dependencies
------------

A list of other roles hosted on Galaxy should go here, plus any details in regards to parameters that may need to be set for other roles, or variables that are used from other roles.

Example Playbook
-------------------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

    - hosts: servers
      roles:
         - { role: username.rolename, x: 42 }

License
-------

BSD

Author Information
------------------

An optional section for the role authors to include contact information, or a website (HTML is not allowed).
