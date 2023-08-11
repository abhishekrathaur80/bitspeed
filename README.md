
# bitspeed

The project involves designing a web service with an endpoint "/identify" to consolidate customer contact information across multiple purchases. The service receives HTTP POST requests with JSON body containing either an email or a phone number.

The service's HTTP 200 response contains a JSON payload with the consolidated contact information. It includes the primary contact ID, a list of emails (with the primary contact's email as the first element), a list of phone numbers (with the primary contact's phone number as the first element), and an array of IDs of contacts that are "secondary" to the primary contact.

Post Request:https://bitespeed-xcwa.onrender.com/identify;
