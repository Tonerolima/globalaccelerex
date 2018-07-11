# Globalaccelerex Internship Challenge
## A RESTful API with Node and Express
This API allows retrieval of a list of person objects and modification of a person description using the username

### GET Routes
/ => redirects to /persons route 

/persons => retrieves a list of all person objects

/persons/id => retrieves one person object

### POST Route
/persons/id => accepts a single parameter (description) in the request body to update the person object