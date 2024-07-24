import {
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { DialogProps } from "../../../types/index";

const ImageDialog = ({ imagePath, isOpen, closeDialog }: DialogProps) => {
  return (
    <button>
      <Dialog open={isOpen} onClose={closeDialog}>
        <div className="fixed bg-gray-300 z-30 inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className={"dialog relative"}>
            <button
              type="button"
              onClick={closeDialog}
              className="absolute right-0 top-0"
            >
              <img src="/assets/icons/close.svg" alt="close" />
            </button>
            <div className="flex z-10 sm:w-[500px]">
              <img
                src={imagePath}
                alt="product image"
                className="object-contain w-full"
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </button>
  );
};

export default ImageDialog;
