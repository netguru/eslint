# config valid only for current version of Capistrano
lock '3.4.0'

set :repo_url, 'git@github.com:netguru/eslint.git'

set :docker_apparmor_profile, "docker-ptrace"
set :docker_links, %w(redis_ambassador:redis)
