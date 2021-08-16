import React, { useState, useEffect } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const App = () => {
  const [sessions, setSessions] = useState([]);
  const [state, setState] = useState([]);
  const [total, setTotal] = useState([]);


  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=2021-07-24`
      const response = await fetch(url);
      const resjson = await response.json();
      setSessions(resjson.topBlock.sessions);
      setTotal(resjson.topBlock.vaccination);
      setState(resjson.getBeneficiariesGroupBy);
    }
    fetchApi();
  })
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-none">
          <div className="container-fluid">
            <HomeIcon />{" "}{" "}<h6 className="fs-6 pt-2">India</h6>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            </div>
          </div>
        </nav>
        <div className="container-fluid my-1">
          <div className="row mx-5 my-3">
            <div className="col-lg-6 col-md-6 col-sm-12 my-2 p-3">
              <p>Total Vaccinaion Dose: {total.total} </p>
              <p>Covishield: {total.covishield} </p>
              <p>Covaxin: {total.covaxin} </p>

            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 my-2 p-3">
              <p>Government:  {sessions.govt} </p>
              <p>Private: {sessions.pvt}</p>
            </div>
          </div>
        </div>
      </header>
      <section className="container">
        <table className="table" id="scrolldown" border="1">
          <thead>
            <tr>
              <th scope="col">State_ID</th>
              <th scope="col">State_name</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody border="1">
            {state.map((item) => <tr>
              <th scope="row">{item.id}</th>
              <td>{item.title}</td>
              <td>{item.total}</td>
            </tr>
            )
            }

          </tbody>
        </table>
      </section>
      <section className="line-chart">
        <ResponsiveContainer>
          <LineChart>
            <Line dataKey="" />
          </LineChart>
        </ResponsiveContainer>
      </section>

    </>
  )
}

export default App;
