import emptyRecordsImage from "../assets/data-not-found.svg" ;
export default function NoRecordsFound() {
  return (
    <div className='d-flex flex-column align-content-center'>
      <img style={{height: '70vh'}} src={emptyRecordsImage}/>
    </div>
  )
}
