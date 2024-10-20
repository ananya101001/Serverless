FROM public.ecr.aws/lambda/nodejs:18

# Install canvas dependencies
RUN yum install -y cairo-devel pango pango-devel libjpeg-turbo-devel giflib-devel

# Install Node.js dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code
COPY . .
