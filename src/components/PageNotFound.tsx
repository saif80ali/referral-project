import pageNotFound from '../assets/pageNotFound.jpg'
export default function PageNotFound() {
  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <img className='img-fluid rounded'style={{maxHeight: '80vh'}} src={pageNotFound} alt="404 Page not found" />
    </div>
  )
}
