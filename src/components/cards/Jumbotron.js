export const Jumbotron = (props) => {
  return (
    <div className="container-fluid jumbotron">
      <div className="row">
        <div className="col text-center p-4">
          <h1 className="fw-bold">{props.title}</h1>
          <p className="lead">{props.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
