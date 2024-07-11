import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { DialogProps } from "../../types/index";
import { useState } from "react";

const ImageDialog = ({ imagePath, isOpen, closeDialog }: DialogProps) => {
  return (
    <button>
      <Dialog open={isOpen} onClose={closeDialog}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className={"dialog relative"}>
            <button
              type="button"
              onClick={closeDialog}
              className="absolute right-0 top-0"
            >
              <img src="/assets/icons/close.svg" alt="close" />
            </button>
            <div>
              <img src={imagePath} alt="product image" />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </button>
  );
};

export default ImageDialog;
