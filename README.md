# user-cards-informaion

##PROBLEM AND SOLUTION
An application is needed for users to log to their accounts and be able to edit information about friends or contacts bussines, they want to be able to create,edit,get and remove this cards. A small application for handling this information is desired.
This app allows you to sign up or authenticate thru facebook credentials.

You can signup and immediatly will appear on the main screen, if you currently hold credentials then you can just introduce your credentials, if you want to register with facebook only your display name and token for accessing will be save.


##FOCUS

A CRUD like resource was created in the backend in order to provide and easy way to the front-end to interact with the data it displays, the application needs the user to be logedin in order to interact with the services, altough my experience is focused almost exclusivy in the back-end I tried to create an app for accesible to any user and not those that only know how to handle REST services.      

##STACK

This app was constructed using the following technologies:

* Boostrap
* Angularjs 1.5
* Nodejs 4.3
* Mongodb 3.2
* Express 4

##Architecture
My experience working with front-end is reduced to using jquery and extjs, altough extjs allows for a faster fron-end building experience is my believe that Angularjs offers more flexibility and handling of information in the fron-end. Angularjs combines great with a lot of backend technologies but given the asynchronous nature of nodejs I think is the one that fits the best and an application that mostly uses loads,saves, creations, deletes and calls another API is a great fit for a plataform like nodejs who is best fit for simultaneously IO operations. 

Regarding my experience with databases I have worked with Postgresql and dynamodb mostly and I do believe that Postgresql is a better fit tha dynamodb given that dynamodb offers some restrictions on the write and read capacity that can be expensive if you want dynamodb to respond at an acceptable speed to nodejs. Dynamodb also conatins some restrictions on how it handles it's own json given those reasons is my opinion that Postgresql and Mongodb are a better fit. However I found more friendly to interact with Mongodb than it is with Postgresql.

There are several things that could be improved in these project:
```
* methodOverride was not on the express side so no PUT method is exposed, altough when working express this is really disguise given that an extra parameter needs to be sent from the Front-end.
* once a User is logged it can update any any card in the database despite not being the owner, this was protected on the remove card
but forgotten for the update resource.
* when the user cards are retrieved first the previous ones stored in mongodb are retrieved in batches of then until there's no more and then the ones from the holonis API, looks like there's a bug with the pagination when doing a refresh once logged in, probably pagination handling should be moved to front-end.
* user cards back-end resource was called each time with $http dependency directly however it could be handled better with angularjs component $resource.
* A service should be created to handle separately the creation of a new user card and the edit modal, the lack of this service is causing that by handle both forms with the same controller the values from Edit are being set in the create form.
* this is a small application but the creation of buttons inside the ng-repeat directive for editing and removing could cause and overloading of watchers when loading to much data, I know there are work arounds but right now I'm unfamiliar with this 
```

###left out
```
* the application is not hosted
* there are not unit tests in the front-end nor the back-end
* does not display error messages
* it does not have scss or sass files
* no Twitter authentication.
* creation form is not fix, if you scroll down it is not available anymore
```
