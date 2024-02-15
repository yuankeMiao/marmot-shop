import React from "react";

function Sidebar({children} : {children: React.ReactNode}) {
  return (
    <aside className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50"></div>
    </aside>
  );
}

export default Sidebar;
