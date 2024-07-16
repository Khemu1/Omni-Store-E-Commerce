import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css"; // Import default styles for react-input-range
interface Range {
  max: number;
  min: number;
}
const PriceFilter = () => {
  const navigateTo = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState<Range>({ min: 10, max: 2000 });

  const handlePriceButton = () => {
    const params = new URLSearchParams(searchParams);
    params.set("price", `${price.min}-${price.max}`);
    setSearchParams(params);
    navigateTo(`?${params.toString()}`);
  };

  useEffect(() => {
    const sortParam = searchParams.get(`price`);
    if (sortParam) {
      const [min, max] = sortParam.split("-").map(Number);
      setPrice({ min, max });
    } else {
      setPrice({ min: 10, max: 2000 });
    }
  }, [searchParams]);
  return (
    <div className="price-filter-container">
      <InputRange
        formatLabel={(value) => `${value}$`}
        maxValue={2000}
        minValue={10}
        value={price}
        onChange={(value: any) => {
          setPrice(value);
        }}
      />
      <div className="flex justify-center">
        <button
          onClick={handlePriceButton}
          type="button"
          className="rounded-xl bg-black px-2 py-1 font-lato text-sm text-white w-max"
        >
          Edit Price
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
