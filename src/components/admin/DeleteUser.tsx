import { useState, useCallback } from "react";
import { Modal } from "flowbite-react";
import { useDeleteUserMutation } from "../../redux/slices/userApi";
import { UserReadDto } from "../../misc/userTypes";

function DeleteUser({
  user,
  selectedUser,
  setSelectedUser,
}: {
  user: UserReadDto;
  selectedUser: UserReadDto | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserReadDto | null>>;
}) {
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [
    deleteUserTrigger,
    {
      isSuccess: deleteSuccess,
      error: deleteError,
      isLoading: deleteLoading,
      reset: deleteReset,
    },
  ] = useDeleteUserMutation();

  const handleDeleteConfirm = useCallback(
    (user: UserReadDto) => {
      setDeleteModalOpen(true);
      setSelectedUser(user);
    },
    [setSelectedUser]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteUserTrigger(id);
      setSelectedUser(null);
    },
    [deleteUserTrigger, setSelectedUser]
  );

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    deleteReset();
  }, [deleteReset]);

  return (
    <>
      <button
        className="text-red-700 font-semibold underline"
        onClick={() => handleDeleteConfirm(user)}
      >
        Delete
      </button>
      <Modal
        dismissible
        show={DeleteModalOpen}
        onClose={handleCloseDeleteModal}
        size="md"
      >
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Body>
          {deleteError || deleteSuccess || deleteLoading ? (
            <div className="dark:text-gray-100">
              {deleteLoading && <p>Deleting ...</p>}
              {deleteSuccess && <p>User has been deleted</p>}
              {deleteError && <p>Something went wrong with the delete!</p>}
            </div>
          ) : (
            <div className="dark:text-gray-100">
              <p>Are you sure you want to delete this user?</p>
              <div className="flex gap-8 my-8">
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (selectedUser) handleDelete(selectedUser.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteUser;
