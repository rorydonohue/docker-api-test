FROM        centos:centos7
MAINTAINER  Rory Donohue <rory.donohue@gmail.com>

# Environment vars
ENV     APP_DEST_DIR    "/home/api"
ENV     APP_USER        "web-user"

# Update the system, install some basic tools and then
# Extra Packages for Enterprise Linux (EPEL) for CentOS, Node.js and npm
RUN     yum -y update \
        && yum clean all \
        && yum install -y net-tools vim-enhanced \
        && yum install -y epel-release \
        && yum install -y nodejs npm

# Bundle app source
RUN     mkdir   ${APP_DEST_DIR}
COPY    .       ${APP_DEST_DIR}

# Set the workdir for commands that follow
WORKDIR ${APP_DEST_DIR}
#RUN     npm install --production
RUN     npm install

# Add a non-privileged user for running the web app
RUN     useradd ${APP_USER}
RUN     chown -R ${APP_USER} ${APP_DEST_DIR}

EXPOSE  8000

# Run the node server as a non-privileged user
#USER    ${APP_USER}

# Default for the executing container
CMD ["node", "server.js"]
