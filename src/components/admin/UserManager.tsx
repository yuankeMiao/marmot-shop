import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TextInput, Table, Modal, Pagination, Select } from "flowbite-react";

import { UserQueryOptionType, UserReadDto } from "../../misc/userTypes";
import TableItemLoader from "../skeleton/TableItemLoader";
import DeleteUser from "./DeleteUser";
import {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/slices/userApi";
import UpdateUserForm from "./UpdateUserForm";
import CreateUserForm from "./CreateUserForm";

const debounce = require("lodash.debounce");

function UserManager() {
  const [infoFormModalOpen, setInfoFormModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserReadDto | null>(null);

  // Pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

  const [filter, setFilter] = useState<UserQueryOptionType>({
    role: "Customer",
    searchName: "",
    sortBy: "Name",
    sortOrder: "Asc",
    limit: itemsPerPage,
    offset: 0,
  });
  const [users, setUsers] = useState<UserReadDto[]>([]);

  const {
    data: usersQueryResult,
    error,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery(filter);

  useEffect(() => {
    if (usersQueryResult) {
      setUsers(usersQueryResult.data);
      setTotalItems(usersQueryResult.totalCount);
    }
  }, [usersQueryResult]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems]
  );

  const handleEdit = useCallback((user: UserReadDto) => {
    setSelectedUser(user);
    setInfoFormModalOpen(true);
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedUser(null);
    setInfoFormModalOpen(true);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      searchName: value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      role: value as "Customer" | "Admin",
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      sortBy: value as "Name" | "CreatedDate" | "UpdatedDate",
    }));
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      sortOrder: value as "Asc" | "Desc",
    }));
  };

  const debouncedInput = useCallback(
    debounce((value: string) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        searchName: value,
      }));
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedInput(filter.searchName || "");
    return () => {
      debouncedInput.cancel();
    };
  }, [filter.searchName, debouncedInput]);

  return (
    <div className="p-8 flex flex-col gap-8">
      <button className="btn-primary max-w-min" onClick={handleAdd}>
        Add New User
      </button>

      <div className="flex gap-4 items-center">
        <Select value={filter.role} onChange={handleRoleChange}>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </Select>
        <Select value={filter.sortBy} onChange={handleSortChange}>
          <option value="Name">Name</option>
          <option value="CreatedDate">Created Date</option>
          <option value="UpdatedDate">Updated Date</option>
        </Select>
        <Select value={filter.sortOrder} onChange={handleSortOrderChange}>
          <option value="Asc">Ascending</option>
          <option value="Desc">Descending</option>
        </Select>
        <TextInput
          id="search-admin"
          name="search-admin"
          className="w-96"
          type="text"
          placeholder="Search users"
          value={filter.searchName || ""}
          onChange={handleInput}
        />
      </div>

      {isLoading || isFetching ? (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell className="hidden lg:table-cell">Avatar</Table.HeadCell>
              <Table.HeadCell className="hidden lg:table-cell">Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell className="hidden lg:table-cell">Role</Table.HeadCell>
              <Table.HeadCell className="hidden lg:table-cell">Created Date</Table.HeadCell>
              <Table.HeadCell className="hidden lg:table-cell">Updated Date</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
            </Table.Body>
          </Table>
        </>
      ) : (
        <>
          {filter.searchName && users?.length === 0 && (
            <div className="dark:text-gray-100">
              <p>There is no result, try another keyword.</p>
            </div>
          )}
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="hidden lg:table-cell">Avatar</Table.HeadCell>
              <Table.HeadCell className="hidden lg:table-cell">Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell className="hidden lg:table-cell">Role</Table.HeadCell>
              <Table.HeadCell  className="hidden lg:table-cell">Created Date</Table.HeadCell>
              <Table.HeadCell  className="hidden lg:table-cell">Updated Date</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users?.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell className="hidden lg:table-cell">
                    <img
                      src={user.avatar} 
                      alt="Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell className="hidden lg:table-cell">{`${user.firstname} ${user.lastname}`}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell className="hidden lg:table-cell">{user.role}</Table.Cell>
                  <Table.Cell  className="hidden lg:table-cell">
                    {new Date(user.createdDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell  className="hidden lg:table-cell">
                    {new Date(user.updatedDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="text-blue-600 font-semibold underline"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteUser
                      user={user}
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      )}

      <div className="flex sm:justify-center my-4">
        <Pagination
          className="hidden sm:flex"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <Pagination
          className="flex sm:hidden"
          layout="navigation"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

      <Modal
        dismissible
        show={infoFormModalOpen}
        onClose={() => {
          setInfoFormModalOpen(false);
          setSelectedUser(null);
        }}
      >
        <Modal.Header>
          {selectedUser ? "Edit User" : "Add New User"}
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <UpdateUserForm
              initialValue={selectedUser}
              setInfoFormModalOpen={setInfoFormModalOpen}
            />
          ) : (
            <CreateUserForm setInfoFormModalOpen={setInfoFormModalOpen} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserManager;
