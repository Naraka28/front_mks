const InventoryTable = () => {
    return (
      <div className="p-6 overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {['Producto', 'Proveedor', 'Stock', 'Última Visita', 'Acciones'].map((header) => (
                <th
                  key={header}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    {header}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                product: 'Granos de Café',
                provider: { name: 'John Michael', email: 'john@creative-tim.com', img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' },
                stock: 618,
                lastVisit: '23/04/18',
              },
              {
                product: 'Leche deslactosada',
                provider: { name: 'Alexa Liras', email: 'alexa@creative-tim.com', img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg' },
                stock: 432,
                lastVisit: '23/04/18',
              },
              {
                product: 'Galletas',
                provider: { name: 'Laurent Perrier', email: 'laurent@creative-tim.com', img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg' },
                stock: 819,
                lastVisit: '19/09/17',
              },
            ].map((row, index) => (
              <tr key={index}>
                <td className="p-4 border-b border-blue-gray-50">{row.product}</td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <img src={row.provider.img} alt={row.provider.name} className="inline-block object-cover rounded-full w-9 h-9" />
                    <div>
                      <p className="text-sm text-blue-gray-900 font-normal">{row.provider.name}</p>
                      <p className="text-sm text-blue-gray-900 font-normal opacity-70">{row.provider.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">{row.stock}</td>
                <td className="p-4 border-b border-blue-gray-50">{row.lastVisit}</td>
                <td className="p-4 border-b border-blue-gray-50">
                <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                    </svg>
                  </span>
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default InventoryTable;