import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Range {
  max: number;
  min: number;
}

const PriceFilter = () => {
  const navigateTo = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState<Range>({ min: 10, max: 2000 });

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPrice((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handlePriceButton = () => {
    const params = new URLSearchParams(searchParams);
    params.set("priceRange", `${price.min}-${price.max}`);
    setSearchParams(params);
    navigateTo(`?${params.toString()}`);
  };

  useEffect(() => {
    const sortParam = searchParams.get(`priceRange`);
    if (sortParam) {
      const [min, max] = sortParam.split("-").map(Number);
      setPrice({ min, max });
    } else {
      setPrice({ min: 10, max: 2000 });
    }
  }, [searchParams]);

  return (
    <div className="price-filter-container p-4 max-w-md mx-auto">
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="min" className="text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="min"
            name="min"
            min="10"
            max="2000"
            value={price.min}
            onChange={handlePriceChange}
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="max" className="text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="max"
            name="max"
            min="10"
            max="2000"
            value={price.max}
            onChange={handlePriceChange}
            className="border rounded-lg px-2 py-1"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handlePriceButton}
          type="button"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Apply Price
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
