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

Usage
-----

From the ansible-generator folder, run:

```
ansible-playbook -i hosts main.yml --ask-sudo-pass
```

A series of prompts will appear guiding through the generation of a project scaffold.
