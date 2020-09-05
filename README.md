# Introduction:
React shipment notifications app interacting with Flask back-end API's

## Assignment:
The main flows to implement are: 

- A user can choose a particular product and save a draft of a shipping notification for that product. There can be multiple draft message for a product.

- A user can also look up draft versions of these text messages that have been saved, and click a button to actually send one of them to a number (which they provide at the time of sending).

Additional details under “User Flows.”

## Tooling:

- Flask (Python) to create the API endpoints
- Connect to DB using SQLAlchemy
- PostgreSQL database
- ReactJS Front-end (or Flask HTML)
- Twilio to send text messages

## User Flows:

- Users should be able to query a list of available products 
- Users should be able to create and save a message for a product
- Saving a message requires a product_id to be attached to the message and should throw an error otherwise
For example, the message object might look like 
```
{ 
  "message" : "Some string",
  "Product_id":1
}
  ```
- Users should be able to view messages for a product
- Users should be able to send messages for a product

- This should utilize the Twilio API -- use a Twilio trial account, it is OK if the message does not send to outside / non-whitelisted numbers.

## Getting Setup:

There are 2 folders contained with this homework:

**`api`**

The `api` folder houses the `Dockerfile` to build and run the `Flask` application against the `db`. It contains a bootstrapped `Flask` object and `Flask-SQLAlchemy` already setup to work with the larger `docker-compose.yml` file of this homework.

**`app`**

The `app` folder contains a boilerplate `react-scripts` react app with no additional functionality.

### Running the Environment

Once you've created a `package.json` in the `app` folder, you're ready to run the `docker-compose` environment.

By default, when running the `docker-compose` of this repo, the ports will map as follows:

- `api` - Port 5000
- `db` - Port 5432
- `app` - Port 3000

Running the environment is now as easy as `docker compose up`.

- Visit `http://localhost:5000/health-check` to verify the api is working.
- Visit `http://localhost:3000` to see your frontend application





 
