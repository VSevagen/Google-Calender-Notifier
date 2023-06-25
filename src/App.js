import React, { createContext } from 'react';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import Header from './Header';

const App = () => {

  const [events, setEvents] = React.useState(null);

  const formatEvents = (list) => {
    return list.slice(list.length - 25, list.length).map((item) => ({
      title: item.summary,
      description: item.description || "",
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  const initClient = () => {
      // Get events if access token is found without sign in popup
      fetch(
     `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${process.env.REACT_APP_GOOGLE_API_KEY}&orderBy=startTime&singleEvents=true`,
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
    initClient();
  }, []);


  return (
    <div className="App">
      <Dashboard events={events}/>
      <Header />
    </div>
  );
}

export default App;
