import 'bootstrap/dist/css/bootstrap.css';
import PivotTable from '../components/PivotTable';


function Analysis() {
  return (
    <>
      <div className="h2 mt-4 mb-4 text-start"> Pivot Analysis </div>
      <PivotTable endpoint="orders"/>

    </>
  )
}

export default Analysis