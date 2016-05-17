FROM dockerhub.oc.zillow.local/node:5.7.0-slim

# Install libs, create working dir, and set the internal npm registry
RUN apt-get update && \
    apt-get install -y --force-yes --no-install-recommends libpq-dev && \
    apt-get clean && apt-get autoclean && \
    mkdir -p /app && \
    npm config set registry http://registry.znpm.oc.zillow.local


# Set working dir
WORKDIR /app

# Add app code
COPY . /app

# Install modules
RUN npm install --production

ENTRYPOINT ["npm"]

CMD ["start"]
