server ENV['PROD_SERVER'], user: ENV['PROD_USER'], roles: %w{web app db}
set :branch, "master"
set :application, "hound-eslint"

set :deploy_to, ENV['PROD_DEPLOY_PATH']

set :docker_volumes, [
  "#{shared_path}/log:/var/www/app/log"
]
set :docker_dockerfile, "docker/production/Dockerfile"
