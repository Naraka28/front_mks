const CashierAccountToggle = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA9mnUDxXtUVUksx8ADE_uwwHO7xHhDhgxw&s"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">{name}</span>
          <span className="text-xs block text-stone-500">{email}</span>
        </div>
      </button>
    </div>
  );
};

export default CashierAccountToggle;
