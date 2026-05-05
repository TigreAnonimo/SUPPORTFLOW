export default function Dashboard() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
  
        <div className="grid grid-cols-3 gap-4">
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">Tickets abiertos</h2>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
  
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">Tickets cerrados</h2>
            <p className="text-3xl font-bold mt-2">34</p>
          </div>
  
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">Pendientes</h2>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
        </div>
      </div>
    );
  }
  