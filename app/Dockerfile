# pull official base image
FROM node:10.14.2

# Setup a Development User
RUN useradd -ms /bin/bash postscript

# Make the workdir with the right permissions
RUN mkdir /opt/app
RUN chown postscript /opt/app

# set working directory
WORKDIR /opt/app

# Swap to postscript user
USER postscript

# add `/opt/app/node_modules/.bin` to $PATH
ENV PATH /opt/app/node_modules/.bin:$PATH

# install app dependencies
COPY --chown=postscript package.json .
# Swap the comment of the next 2 lines to use yarn
COPY --chown=postscript yarn.lock ./
# RUN yarn config delete proxy
RUN yarn  --network-timeout=100000
# RUN npm install
RUN yarn add node-sass
# Uncomment the next line to use yarn


# add app
COPY --chown=postscript . ./
EXPOSE 3000

# start app
# Swap the comment of the next 2 lines to use yarn
CMD ["yarn", "start"]