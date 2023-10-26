import 'bootstrap/dist/css/bootstrap.css';
import Table from '../components/Table';

function Orders() {
  return (
    <>
      <div className="h2 mt-4 mb-4 text-start"> Placed orders </div>
      <Table endpoint="orders" />
    </>
  )
}

export default Orders