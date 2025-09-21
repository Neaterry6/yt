FROM node:18

# Install Python and yt-dlp safely
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    python3 -m pip install --break-system-packages yt-dlp

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Start the server
CMD ["npm", "start"]