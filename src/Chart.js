import React, { Component } from 'react';
import { format, sub } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: props.stats
    };
    console.log(props)
    this.filterDates = this.filterDates.bind(this);
  }

  filterDates = (date, status) => {
    let statusCount = 0;
    if(this.state.stats) {
      for(let i = 0;i < this.state.stats?.length; i++) {
        const newDate = format(new Date(this.state.stats[i].dateSent), 'MM-dd-yyyy');
        if( newDate === date && this.state.stats[i].status === status) {
          statusCount = statusCount + 1;
        }
      }
    }
    return statusCount;
  }

  render() {

    const data = [
      {
        name: format(sub(new Date(), { days: 7 }), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(sub(new Date(), { days: 7 }), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(sub(new Date(), { days: 7 }), 'MM-dd-yyyy'), "undelivered"),
      },
      {
        name: format(sub(new Date(), { days: 6 }), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(sub(new Date(), { days: 6 }), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(sub(new Date(), { days: 6 }), 'MM-dd-yyyy'), "undelivered"),
      },
      {
        name: format(sub(new Date(), { days: 5 }), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(sub(new Date(), { days: 5 }), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(sub(new Date(), { days: 5 }), 'MM-dd-yyyy'), "undelivered"),
      },
      {
        name: format(sub(new Date(), { days: 4 }), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(sub(new Date(), { days: 4 }), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(sub(new Date(), { days: 4 }), 'MM-dd-yyyy'), "undelivered"),
      },
      {
        name: format(sub(new Date(), { days: 3 }), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(sub(new Date(), { days: 3 }), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(sub(new Date(), { days: 3 }), 'MM-dd-yyyy'), "undelivered"),
      },
      {
        name: format(sub(new Date(), { days: 2 }), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(sub(new Date(), { days: 2 }), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(sub(new Date(), { days: 2 }), 'MM-dd-yyyy'), "undelivered"),
      },
      {
        name: format(sub(new Date(), { days: 1 }), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(sub(new Date(), { days: 1 }), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(sub(new Date(), { days: 1 }), 'MM-dd-yyyy'), "undelivered"),
      },
      {
        name: format(new Date(), 'MM-dd-yyyy'),
        delivered: this.filterDates(format(new Date(), 'MM-dd-yyyy'), "delivered"),
        undelivered: this.filterDates(format(new Date(), 'MM-dd-yyyy'), "undelivered"),
      }
    ];

    console.log("Stats", data);
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="undelivered" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="delivered" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}