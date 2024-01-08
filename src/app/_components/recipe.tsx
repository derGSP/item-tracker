export function Recipe() {
  return (
    <>
      <h2 className="mb-2 text-4xl font-bold dark:text-white">Recipe</h2>
      <ol className="max-w-md list-inside list-decimal space-y-1 text-base text-gray-900 dark:text-white">
        <li>Bring well salted water to a boil</li>
        <li>Slice 2-3 fresh garlic cloves, some basil and chili</li>
        <li>Sweat garlic and chili in a big pan with olive oil</li>
        <li>Add a can (400g) of whole peeled tomates - crush them</li>
        <li>Add basil</li>
        <li>Put 500g penne rigate into the boiling water</li>
        <li>Cook for 4-5 minutes</li>
        <li>
          Put half cooked pasta into sauce with about 500ml of the pasta water
        </li>
        <li>Cook for 3 more minutes and take off the heat</li>
        <li>Finish it off with some freshly grated parmesan if available</li>
      </ol>
      <h3 className="text-3xl font-bold dark:text-white">Notes</h3>
      <ul className="max-w-md list-inside list-disc space-y-1 text-gray-900 dark:text-white">
        <li>Dried chili works great too</li>
        <li>Avoid dried basil at all cost</li>
        <li>
          Use high quality pasta. De Cecco Penne Rigate no. 41 is a safe bet
          with good availability{" "}
          <small>(not sponsored, hit me up De Cecco)</small>
        </li>
      </ul>
    </>
  );
}
