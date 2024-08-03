import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { quantities } from "../../../constants";
import { Fragment, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

interface CartQuantityProps {
  quantity: {
    title: string;
    value: number;
  };
  handleQuantityChange: (id: string, newQuantity: number) => Promise<void>;
  id: string;
  success: boolean;
  error: null | string;
  refresh?: () => Promise<void> | undefined;
  updatePrice?: () => void | undefined;
  loading: boolean;
}

const CartQuantity = ({
  quantity,
  handleQuantityChange,
  id,
  success,
  error,
  refresh,
  updatePrice,
  loading,
}: CartQuantityProps) => {
  const [selected, setSelected] = useState<{
    title: string;
    value: number;
  } | null>(null);

  const [originalQuantity, setOriginalQuantity] = useState<number>(
    quantity.value
  );

  useEffect(() => {
    const initialSelection = quantities.find((q) => q.value === quantity.value);
    setSelected(initialSelection || null);
    setOriginalQuantity(quantity.value);
    const update = async () => {
      if (updatePrice) updatePrice();
    };
    update();
  }, [quantity]);

  const handleSelect = async (
    selectedOption: { title: string; value: number } | null
  ) => {
    try {
      if (selectedOption) {
        if (selectedOption.value === originalQuantity) {
          return;
        }
        setSelected(selectedOption);
        await handleQuantityChange(id, selectedOption.value);
        if (refresh) await refresh();
      }
    } catch (error) {
      const revertSelection = quantities.find(
        (q) => q.value === originalQuantity
      );
      setSelected(revertSelection || null);
    }
  };

  return (
    <div className="w-fit relative">
      <Listbox value={selected} onChange={handleSelect} disabled={loading}>
        <div className="relative w-fit">
          <ListboxButton className="w-[100px] border-2 rounded-lg">
            <span className="flex justify-center">
              {loading ? (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="#000000"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              ) : selected ? (
                selected.title
              ) : (
                "Select quantity"
              )}
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="filter_menu">
              {quantities.map((q) => (
                <ListboxOption
                  value={q}
                  key={q.title}
                  className={({ active }) =>
                    `relative cursor-default select-none font-lato font-semibold text-sm py-2 px-4 ${
                      active ? "bg-blue-800 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-light"
                      }`}
                    >
                      {q.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CartQuantity;
