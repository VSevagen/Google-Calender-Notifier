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
https://github.com/VSevagen/Google-Calender-Notifier/assets/43094266/2b57f959-ba2e-40ef-9bff-c2375f95ebb1

### Send an SMS
https://github.com/VSevagen/Google-Calender-Notifier/assets/43094266/e580145f-eba9-4441-acd8-7156b022fd5d

### Stats page
<img width="394" alt="Screenshot 2023-07-02 at 09 29 37" src="https://github.com/VSevagen/Google-Calender-Notifier/assets/43094266/14aeb4fb-86b6-48ab-9aa2-060a6191bfa5">


