# 3-Microserivce-Repo

## Run Application

From base of repo (you'll need Docker Desktop running) execute the following command:
- `docker-compose up -d` - to run the Docker

This will pull the images from DockerHub to your local machine and execute the `docker-compose.yaml` file, running the containers in a defined order. 

If there's any issues with pulling the Docker Images, you'll also be able to build your own images with commands similar to:
- `docker build -t <your-docker-username>/pottery-api:0.0.1.RELEASE ./<path-to-microservice-dockerfile>`
  - If I were running these commands from my route directory it would look like the following:
  - `docker build -t emilesherrott/pottery-api:0.0.1.RELEASE ./pottery-api`

**NOTE**: You'd need to also build the images for the DB microservice and the Python microservice. 

Once running, navigate to **./pottery-cli/index.html** and open in the browser. 

To see the application running it's recommended that you:
1. Create an account as a Potter
2. Sign in with your account
3. Generate several pottery pieces with different styles
4. Log out and create an account / sign in with a Customer account
5. 'Purchase' different amounts of pottery pieces from the potter account created in stages: 1-3
6. Sign back in as the Potter
7. Click the button to visualise data
