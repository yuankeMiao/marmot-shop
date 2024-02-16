import { CATEGORIES } from "../../statics/constants";

function Filters() {
  return (
    <div className="lg:absolute w-full mt-8 top-0 left-0 rounded-lg group bg-gray-100 dark:text-gray-100 dark:bg-cyan-900 ">
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
            <span className="font-bold">Order By Price</span>
            <ul className="py-2 *:group/item *:px-2 *:flex *:gap-2">
              <li>
                <input type="checkbox" id="low-high" />
                <label htmlFor="low-high">From low to high</label>
              </li>
              <li>
                <input type="checkbox" id="high-low" />
                <label htmlFor="high-low">From high to low </label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filters;
