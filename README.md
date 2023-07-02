# Google Calendar Notifier

This is an application that allows you to connect to your google account to fetch your google calendar details and send an SMS to the required parties needed for your meetings.

## Tech Stack details
- GIS (Google Identity Service) used to fetch the google calendar meetings for the signed-in person.
- ReactJS for developing the UI
- TailwindCSS for styling out the ReactJS components
- Twillio Messaging Service API used for sending the SMS
- Supabase for storing/fetching users (phone numbers and name)

## Features developed
- Ability to get your google calender meetings
- PhoneBook page to store/retrieve/delete phone numbers
- Stats page for application usage statistics (total message sent, total messages failed, chart showing messages sent every 10 days etc...)
- Dark/Light mode
- Sent meeting details to multiple phonenumbers at once
- Validation check on adding phonenumbers (duplicate, valid phone number etc...)
- Sliding animation (on desktop view only)
- Pagination for meeting lists

## Application

### Get your meetings
https://github.com/VSevagen/Google-Calender-Notifier/assets/43094266/89abac47-ea5f-477e-9dd6-d0e1b731e95d

### Send an SMS
https://github.com/VSevagen/Google-Calender-Notifier/assets/43094266/cf437d1c-fe2e-4fea-968c-4eb28ef6d3a4

### Stats page
<img width="394" alt="Screenshot 2023-07-02 at 09 29 37" src="https://github.com/VSevagen/Google-Calender-Notifier/assets/43094266/8c27b09a-aebe-414d-ba68-93e3e2bfb396">

