# The Beans

### Deployment URL
Check out the deployed application [HERE](https://the-beans-site.herokuapp.com/)!

## Technologies Used
* Python
* JavaScript
* ReactJS
* Redux
* Flask
* SQLAlchemy
* PostGreSQL
* Alembic
* AWS S3 (w/ boto3 extension for flask)
* WTForms
* Docker
* Figma (for design)
* Smaller support packages for flask and react

## Screenshots

## Run It Locally
1. Download the repository, then cd to it, if you have a git account use:
```bash
git clone https://github.com/tforde4623/TheBeans.git
cd TheBeans
```

2. In root directory make a virtual environment and install python dependencies:
```bash
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```
NOTE: m1 macs will have trouble with some of the dev deps.

3. Setup your postgres user and db and make sure it is the same as your .env file, 
if you haven't already, setup a .env file containing:
```
FLASK_APP=app                                                                             
FLASK_ENV=development                                                                     
SECRET_KEY=<some key of secret>           
DATABASE_URL=<your postgresuri>                   
AWS_ID=<your iam id>                                                               
AWS_SECRET=<your iam secret>
```
NOTE: you will need to setup an aws bucket to your specifications with public objects.

4. In your virtual environment (we use pipenv) run these commands to setup and seed your db, and run the app:
```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

5. Open a new terminal and cd into client

6. Run these commands to install front end dependencies and run the app:
```bash
npm install
npm start
```
NOTE: for more into look at the run directions in the client readme.
