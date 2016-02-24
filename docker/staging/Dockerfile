FROM quay.io/netguru/baseimage

RUN /opt/node/install

ENV APP_HOME /var/www/app
ENV REDIS_URL redis://redis:6379/0

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

ADD docker/staging/entrypoint.sh /entrypoint.sh
CMD ["npm", "start"]
ENTRYPOINT ["/entrypoint.sh"]
