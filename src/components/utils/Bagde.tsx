// copyright - flowbite: https://flowbite.com/docs/components/badge/#notification-badge

/*
this component receives two props: a child component and a number(optional),
the amount is set 0 by default
*/

function Bagde({
  children,
  amount = 0,
}: {
  children: React.ReactNode;
  amount?: number;
}) {
  return (
    <div>
      <button
        type="button"
        className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg hover:bg-sky-600 focus:bg-sky-600 focus:outline-none"
      >
        {children}
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
          {amount < 100 ? amount : "..."}
        </div>
      </button>
    </div>
  );
}

export default Bagde;
