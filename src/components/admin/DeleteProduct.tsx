import { useState, useCallback } from "react";
import { Modal } from "flowbite-react";
import { useDeleteProductMutation } from "../../redux/slices/apiQuery";
import { ProductReadDto } from "../../misc/productTypes";

function DeleteProduct({
  product,
  selectedProduct,
  setSelectedProduct,
}: {
  product: ProductReadDto;
  selectedProduct: ProductReadDto | null;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<ProductReadDto | null>
  >;
}) {
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [
    deleteProductTrigger,
    {
      isSuccess: deleteSuccess,
      error: deleteError,
      isLoading: deleteLoading,
      reset: deleteReset,
    },
  ] = useDeleteProductMutation();

  const handleDeleteComfirm = useCallback(
    (product: ProductReadDto) => {
      setDeleteModalOpen(true);
      setSelectedProduct(product);
    },
    [setSelectedProduct]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteProductTrigger(id);
      setSelectedProduct(null);
    },
    [deleteProductTrigger, setSelectedProduct]
  );

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    deleteReset();
  }, [deleteReset]);

  return (
    <>
      <button
        className="text-red-700 font-semibold underline"
        onClick={() => handleDeleteComfirm(product)}
      >
        Delete
      </button>
      <Modal
        dismissible
        show={DeleteModalOpen}
        onClose={handleCloseDeleteModal}
        size="md"
      >
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Body>
          {deleteError || deleteSuccess || deleteLoading ? (
            <div className="dark:text-gray-100">
              {deleteLoading && <p>Deleting ...</p>}
              {deleteSuccess && <p>Product has been deleted</p>}
              {deleteError && <p>Something wrong with the delete!</p>}
            </div>
          ) : (
            <div className="dark:text-gray-100">
              <p>Are you sure you want to delete this product?</p>
              <div className="flex gap-8 my-8">
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (selectedProduct) handleDelete(selectedProduct.id);
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

export default DeleteProduct;
