FROM quay.io/cscobootcamp/basenode:latest

# Bundle app source
ADD . /

# Update app dependencies
RUN npm install
RUN chmod a+x /boot.sh

ENTRYPOINT ["/boot.sh"]
EXPOSE 3000
