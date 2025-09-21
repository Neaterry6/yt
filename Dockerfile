FROM node:18

# Install system dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg software-properties-common && \
    curl -sS https://bootstrap.pypa.io/get-pip.py | python3 && \
    apt-get install -y python3 && \
    pip3 install yt-dlp

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Start the server
CMD ["npm", "start"]