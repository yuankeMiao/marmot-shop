import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { AddressReadDto } from "../../misc/userTypes";
import { useDeleteAddressByIdMutation } from "../../redux/slices/userApi";

function AddressCard({ address }: { address: AddressReadDto }) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteAddress] = useDeleteAddressByIdMutation();

  const handleDelete = async () => {
    await deleteAddress(address.id);
    setShowRemoveModal(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="space-y-4">
      <div className="flex justify-between">
          <span className="font-bold">Recipient:</span>
          <span>{address.recipient}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Phone:</span>
          <span>{address.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Line 1:</span>
          <span>{address.line1}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Line 2:</span>
          <span>{address.line2}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">City:</span>
          <span>{address.city}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Postal Code:</span>
          <span>{address.postalCode}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button color="yellow" onClick={() => setShowEditModal(true)}>
          Edit
        </Button>
        <Button color="red" onClick={() => setShowRemoveModal(true)}>
          Remove
        </Button>
      </div>

      {/* Remove Confirmation Modal */}
      <Modal show={showRemoveModal} onClose={() => setShowRemoveModal(false)}>
        <Modal.Header>Confirm Removal</Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this address?
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowRemoveModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} dismissible>
        <Modal.Header>Edit Address</Modal.Header>
        <Modal.Body>
          <p className="dark:text-gray-200">Placeholder for edit address form.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddressCard;
