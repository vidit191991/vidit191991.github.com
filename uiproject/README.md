# User-Interfaces-cs349-Bus-Widget


School Directions App Features

Our school directions widget gives you travelling directions from any location to wherever your courses are this term. 
One can travel via bus, car, walking or cycling with our widget. Overall, considering neither of us have previous web
development experience, the two of us are very happy with the end result of this assignment and we hope you are too.

How to use it

To use our widget start by entering in your address, which can be 
accomplished in two ways. You can either enter in your address manually or you may click on the gps symbol
to the right of the input box to use your GPS location for your address. 
However the GPS feature is only accurate when using our widget with a smartphone (otherwise it bases your
location on IP addresses and other coarse-grained location information). 

Once your address is entered directions will appear below the course details on how to get from the
address you entered to your selected course. By default our widget will use driving as its mode of
transportation and have your first course being selected.

Changing the mode of transportation or selected course will cause the directions to change reflecting the new
options. Under the transit mode of transportation you can get directions to travel to your selected course via
Grand River Transit or Go Transit or even by train if you're from outside of Waterloo.  

How it Works

Our widget uses two of UW's services, one to get information about your current courses and uses another to
translate each of University of Waterloo's building codes into locations. We need the current terms course information
so that we know for a selected course which building we are sending you to and when you have to arrive there by. We
then use Google Maps APIs to get directions using your address, selected mode of transportation and your selected 
course information to get your directions. We also use Google API's to provide your location, which is then reverse-
gecoded also using Google API's.

MVC

We use the MVC design pattern we learned in class for our widget. Our model stores all the data pertaining to your courses,
the user's address and course building information. We have several views including a view for the input box, course buttons,
mode buttons and a view for the directions received from Google Maps API. Our controllers are the click listeners for each of
the buttons and the change listener on the address input box. Like most MVC implementations, when the views are interacted with,
the controller handles it and sends information to the model which then updates the other views.
