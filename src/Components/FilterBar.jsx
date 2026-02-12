const FilterBar = ({ filter, setFilter }) => {
  // Keeping filter options in a constant array
  // This makes the component scalable (easy to add more filters later)
  const filters = ["all", "completed", "pending"];

  return (
    <div className="flex justify-center gap-4">
      {filters.map((item) => (
        <button
          key={item}
          // Using the value itself as key is safe here
          // because these are static, unique, and will not change

          onClick={() => setFilter(item)}
          // Passing a callback instead of calling setFilter directly
          // ensures it only runs when clicked

          className={`px-3 py-1 rounded capitalize transition ${
            filter === item ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          // Conditional styling keeps UI state-driven
          // The active filter is visually highlighted
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
