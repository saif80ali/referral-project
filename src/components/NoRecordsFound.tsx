import emptyRecordsImage from "../assets/data-not-found.svg" ;
export default function NoRecordsFound() {
  return (
    <div className='d-flex flex-column align-content-center'>
        <p className="text-center">No record found</p>
      <img style={{height: '70vh'}} src={emptyRecordsImage}/>
    </div>
  )
}
