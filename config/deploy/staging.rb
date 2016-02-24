server ENV['STAGING_SERVER'], user: ENV['STAGING_USER'], roles: %w{web app db}
set :branch, "master"
set :application, "hound-pr-eslint"

set :deploy_to, ENV['STAGING_DEPLOY_PATH']

set :docker_volumes, [
  "#{shared_path}/log:/var/www/app/log"
]
set :docker_dockerfile, "docker/staging/Dockerfile"
