import { CATEGORIES } from "../../statics/constants";

function Filters() {
  return (
    <aside className="absolute w-full top-8 left-0 text-gray-100 bg-cyan-900 rounded-lg group">
      <div className="h-full px-6 py-4 overflow-y-auto ">
        <ul className="*:py-4">
          <li className="border-b">
            <span className="font-bold">By Category</span>
            <ul className="py-2">
              {CATEGORIES.map((cat) => (
                <li key={cat} className="group/item px-2 flex gap-2">
                  <input type="checkbox" id={cat} name={cat} value={cat} />
                  <label htmlFor={cat}>
                    {cat.replace(cat[0], cat[0].toUpperCase())}
                  </label>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <span className="font-bold">By Price</span>
            <ul className="py-2 *:group/item *:px-2 *:flex *:gap-2">
              <li>
                <input type="checkbox" id="0-25" />
                <label htmlFor="0-25">0 - 25 € </label>
              </li>
              <li>
                <input type="checkbox" id="26-50" />
                <label htmlFor="26-50">26 - 50 € </label>
              </li>
              <li>
                <input type="checkbox" id="51-" />
                <label htmlFor="51-">More than 50 € </label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Filters;
