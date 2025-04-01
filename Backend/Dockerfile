# Use Node.js v21.5.0 image
FROM node:21.5.0

# Set work directory
WORKDIR /Backend

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json andd pnpm-lock.yaml first (for better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies without copying node_modules
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm build

# Expose the port your app runs on (8080)
EXPOSE 4000

# Run the built application
CMD ["node", "dist/app.js"]


# docker named
# codeanalyzer1.0          