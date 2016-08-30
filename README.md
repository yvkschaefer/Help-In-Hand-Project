#Help-in-Hand

DecodeMTL Final Project
<br/>August 2016

Dylan Pelletier, Takanari Sasaki, Kara Schaefer
<br/>
<br/>Advisor: Ziad Saab

Help in Hand is a web application that targets people in need of immediate help. Patients can 
fill out a form that describes their problem, and talk to a counselor about their concerns. 
We used React to display the layout of our site, Firebase for user authentication and storage 
and retrieval of information, bootstrap to style our pages, and socket.io and WebRTC to allow 
patients and counselors to communicate to each other.



To run our program:

After cloning from our master branch, please run npm install in your terminal so that you 
have all of the project's dependencies. After this we suggest that you have three terminals 
open. One for 'npm run dev', another for 'node server.js', and a third terminal for your regular 
terminal needs. At the time of writing, we don't currently have a signup process for our volunteer 
counselors. To access the WebRTC simply login and follow the process for the patient to speak 
with a counselor. If you would like to connect as a triage counselor simply type '/triage-counselor' 
after the homepage link. You may assign a priority there, this puts the patient in a queue. 
If you would like to access the counselor page to speak with the patient, simply type '/counselor' 
after the homepage link and you will be connected as a counselor.


A few notes:
- At the time of writing, our WebRTC is not available on mobile devices, unless you have the Android 
Webview browser. 
- Our WebRTC is best accessed from Chrome browsers.
- Sometimes the WebRTC glitches on the first try, the time that it asks for access to your camera and microphone. If it doesn't connect properly please refresh the pages. Beyond that other errors we have found with the WebRTC relate to strong firewall settings. These might have to be adjusted locally.


Thanks for checking out our project!

yvkschaefer@gmail.com


LandingPage:

![Alt text](https://github.com/Help-In-Hand/Help-In-Hand-Project/blob/master/screencapture-homepage.png?raw=true "landing page")

Form Example:

![Alt text](https://github.com/Help-In-Hand/Help-In-Hand-Project/blob/master/screencapture-form.png?raw=true "form")

WebRTC stream example:  

![Alt text](https://github.com/Help-In-Hand/Help-In-Hand-Project/blob/master/screencapture-WebRTC.png?raw=true "WebRTC")
