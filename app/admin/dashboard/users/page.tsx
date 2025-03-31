"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import AdminUserSearchBar from "@/components/AdminUserSearchBar";

type User = {
  id: string;
  fullname: string;
  email: string;
  mobile: string;
  role: string;
  created: string;
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `/api/admin/users/search?searchQuery=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await res.json();
        setUsers(data.users || []);
        setTotalUsers(data.totalUsers || 0);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPendingSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(pendingSearchQuery);
    setCurrentPage(1);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditForm(user);
  };

  const closeEditModal = () => setEditingUser(null);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEditedUser = async () => {
    if (!editingUser) return;
    await fetch(`/api/admin/users/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setUsers((prev) =>
      prev.map((user) => (user.id === editingUser.id ? { ...user, ...editForm } : user))
    );
    closeEditModal();
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">Users</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <AdminUserSearchBar value={pendingSearchQuery} onChange={handleSearchChange} onSearch={handleSearch} />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 whitespace-nowrap">ID</th>
              <th className="p-2 whitespace-nowrap">Full Name</th>
              <th className="p-2 whitespace-nowrap">Email</th>
              <th className="p-2 whitespace-nowrap">Mobile</th>
              <th className="p-2 whitespace-nowrap">Role</th>
              <th className="p-2 whitespace-nowrap">Created At</th>
              <th className="p-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => (
                <tr key={user.id} className="border-b text-center">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.fullname}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.mobile}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.created ? new Date(user.created).toLocaleDateString() : "N/A"}</td>
                  <td className="p-2">
                    <button onClick={() => openEditModal(user)} className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalItems={totalUsers} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />

      {/* Edit Modal */}
      {editingUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeEditModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-lg font-bold mb-4 text-center">Edit User</h2>

            <label className="block font-semibold">Full Name</label>
            <input name="fullname" value={editForm.fullname || ""} onChange={handleEditChange} className="border p-2 w-full mb-2" />

            <label className="block font-semibold">Email</label>
            <input name="email" value={editForm.email || ""} onChange={handleEditChange} className="border p-2 w-full mb-2" />

            <label className="block font-semibold">Mobile</label>
            <input name="mobile" value={editForm.mobile || ""} onChange={handleEditChange} className="border p-2 w-full mb-2" />

            <label className="block font-semibold">Role</label>
            <select name="role" value={editForm.role || ""} onChange={handleEditChange} className="border p-2 w-full mb-2">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <div className="flex justify-between mt-4">
              <button onClick={saveEditedUser} className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={closeEditModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
