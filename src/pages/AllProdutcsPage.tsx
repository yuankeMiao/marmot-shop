import { CATEGORIES } from "../statics/constants";

function AllProdutcsPage() {
  return (
    <div className="flex">
      <aside className="flex items-center p-2 mt-4 text-gray-100 rounded-lg bg-cyan-900 group">
        <div className="h-full px-3 py-4 overflow-y-auto bg-cyan-900">
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
      <main></main>
    </div>
  );
}

export default AllProdutcsPage;
