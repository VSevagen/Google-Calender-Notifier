import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { gapi } from 'gapi-script';
import PhoneBox from './PhoneBox';
import Stats from './Stats';

const SCOPES =
  "https://www.googleapis.com/auth/calendar.readonly";


const App = () => {

  const [events, setEvents] = React.useState(null);
  const [phoneNumbers, setPhoneNumbers] = React.useState();

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  const formatEvents = (list) => {
    return list.slice(list.length - 10, list.length).map((item) => ({
      title: item.summary,
      description: item.description || "",
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  // const listUpcomingEvents = () => {
  //   gapi.client.calendar.events
  //     .list({
  //       // Fetch events from user's primary calendar
  //       calendarId: "primary",
  //       showDeleted: true,
  //       singleEvents: true,
  //     })
  //     .then(function (response) {
  //       let events = response.result.items;

  //       if (events.length > 0) {
  //         setEvents(formatEvents(events));
  //       }
  //     });
  // };

  // const client = google.accounts.oauth2.initTokenClient({
  //   client_id: 'YOUR_GOOGLE_CLIENT_ID',
  //   callback: (tokenResponse) => {
  //     access_token = tokenResponse.access_token;
  //   },
  //   scope: 'https://www.googleapis.com/auth/calendar.readonly',
  // });

//   const openSignInPopup = () => {
//     gapi.auth2.authorize(
//                { client_id: "628562319450-5060i9u3siu9ftub7jppup1r7b49vm1h.apps.googleusercontent.com", scope: SCOPES },
//                (res) => {
//                  if (res) {
//                    if (res.access_token) {
//                      localStorage.setItem("access_token", res.access_token);
//                    }
 
//                    // Load calendar events after authentication
//                    gapi.client.load("calendar", "v3", listUpcomingEvents);
//                  }
//                }
//              );
//  }  

  const initClient = () => {
      // Get events if access token is found without sign in popup
      fetch(
     `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=**************&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => {
          // Check if unauthorized status code is return open sign in popup
          if (res.status !== 401) {
            return res.json();
          } else {
            localStorage.removeItem("access_token");
          }
        })
        .then((data) => {
          if (data?.items) {
            setEvents(formatEvents(data.items));
          }
        });
  };

  React.useEffect(() => {
    handleClientLoad();
  }, []);

  React.useLayoutEffect(() => {
    if(window?.localStorage && localStorage.getItem('phoneNumbers') !== null) {
      setPhoneNumbers(JSON.parse(localStorage.getItem('phoneNumbers')));
    } else {
      setPhoneNumbers([{number: null, name: null}]);
    }
  }, []);

  return (
    <div className="App">
        <Stats />
        <Dashboard events={events} phoneNumbers={phoneNumbers}/>
        <PhoneBox phoneNumbers={phoneNumbers}/>
    </div>
  );
}

export default App;
