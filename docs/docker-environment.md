# Docker Environment

Ninja comes with an optional Docker environment. You can start by analysing the _Makefile_.

- [Docker Environment](#docker-environment)
  - [Installation](#installation)
    - [Configuration](#configuration)
    - [Setup](#setup)
    - [Build](#build)
  - [Development](#development)
  - [Erase All Temporary Files](#erase-all-temporary-files)
  - [Reinstall Environment](#reinstall-environment)
  - [Erase Environment Volumes](#erase-environment-volumes)

## Installation

### Configuration

Copy the `.env.example` file to `.env` and enter all desired configuration options.

### Setup

To setup the Docker environment, run `make setup`. This will create all containers and configuration.

### Build

To compile all required assets run `make build`. Your environment should be available on _<https://localhost:8080>_. You can choose to proxy pass it via an additional nginx or apache server.

## Development

To start the development environment you must have previously ran the [Installation](#installation) steps above.

To start a the development environment, run `make dev` or simply `make`

## Erase All Temporary Files

To erase all _dist-wp_ files, _cache_ and _node_modules_ run `make cleanall`.

## Reinstall Environment

If you run into issues with Docker, first restart it and try starting the environment again. If this still doesn't work you can re-install the environment by running `make resetall` and then `make setup`.

_ATTENTION! This will reset all your existing Docker machines!_

## Erase Environment Volumes

If you wish to erase all Docker environment data, run `make eraseall`

_ATTENTION! This will erase all your existing Volumes, and with them your MariaDB database! Make sure you have dumped your database beforehand!_
