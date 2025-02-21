import { useState } from "react";
import "../style/cashflow.scss";
import axios from 'axios';
import { FormSubmitHandler } from "react-hook-form";

export default function CashFlow() {
  const url = "http://localhost:5173/cash-flow"
  const [payload, updatePayload] = useState({ sortby: "", searchby: ""});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(payload)
    axios.patch(url,{params:removeNullUndefinedWithReduce(payload)}).then((res) => {
      console.log(res.status)
    }).catch((err) => {
      alert(err.status)
      console.error(err.status)
    });
  }

  


function removeNullUndefinedWithReduce(obj: any) {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
      if (value) {
          acc[key] = typeof value === 'object' ? removeNullUndefinedWithReduce(value) : value;
      }
      return acc;
  }, {});
}

  const handleOnChange = (e: any) => {
    updatePayload((prevState: any) => {
      return ({...prevState, [e.target.name]: e.target.value})
    })
  }
  
  return (
    <form className="container" onSubmit={handleSubmit}>
      <input type="text" name="searchby" onChange={(e) => handleOnChange(e)} className="form-control" placeholder="Search" value={payload.searchby} />
      <select name="sortby" onChange={(e) => handleOnChange(e)} value={payload.sortby} className="form-control my-2">
        <option value="">Select sorting</option>
        <option value="asc">Ascending order</option>
        <option value="desc">Descending order</option>
      </select>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

