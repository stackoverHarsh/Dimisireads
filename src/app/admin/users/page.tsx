'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Shield,
  UserCheck,
  UserX,
  CheckCircle,
  X,
} from 'lucide-react';
import { UserRoleType } from '@prisma/client';

interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  username: string;
  isActive: boolean;
  isEmailVerified: boolean;
  roles: string[];
  createdAt: string;
  lastLoginAt: string;
  savedCount: number;
  reviewsCount: number;
  downloadsCount: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [notification, setNotification] = useState<string | null>(null);

  // Role Edit Modal
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [newRole, setNewRole] = useState<UserRoleType>(UserRoleType.USER);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.users) {
          setUsers(data.data.users);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleStatus = async (user: UserRecord) => {
    const nextStatus = !user.isActive;
    const actionLabel = nextStatus ? 'Reactivate' : 'Suspend';

    if (confirm(`${actionLabel} account for ${user.fullName}?`)) {
      try {
        await fetch('/api/admin/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            targetUserId: user.id,
            isActive: nextStatus,
          }),
        });

        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, isActive: nextStatus } : u))
        );
        setNotification(`Account for ${user.fullName} is now ${nextStatus ? 'active' : 'suspended'}.`);
        setTimeout(() => setNotification(null), 3500);
      } catch {
        alert('Failed to update account status.');
      }
    }
  };

  const openRoleModal = (user: UserRecord) => {
    setSelectedUser(user);
    setNewRole((user.roles[0] as UserRoleType) || UserRoleType.USER);
    setIsRoleModalOpen(true);
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: selectedUser.id,
          role: newRole,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...u, roles: [newRole] } : u
          )
        );
        setIsRoleModalOpen(false);
        setNotification(`Assigned role "${newRole}" to ${selectedUser.fullName}.`);
        setTimeout(() => setNotification(null), 3500);
      } else {
        alert(data?.error?.message || 'Role elevation requires SUPER_ADMIN clearance.');
      }
    } catch {
      alert('Network error updating clearance.');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              User Clearance & Access
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Reader & Staff Registry
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Inspect user reading metrics, assign Role-Based Access Control clearances, and audit suspicious activities.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-burgundy-900/15 dark:bg-candle-gold-500/20 text-burgundy-950 dark:text-candle-gold-300 border border-burgundy-700/20">
          Role Modifications: SUPER_ADMIN Only
        </div>
      </div>

      {/* Floating feedback alert */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3.5 rounded-xl bg-candle-gold-500/20 border border-candle-gold-500/40 text-candle-gold-900 dark:text-candle-gold-300 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-candle-gold-600 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Role Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-cream-100/50 dark:bg-espresso-900/40 border border-warm-oak-300/30">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-warm-oak-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search readers by name or email..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-warm-oak-600 dark:text-cream-300/70 font-mono">
            Role:
          </span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="CONTENT_MANAGER">CONTENT_MANAGER</option>
            <option value="MODERATOR">MODERATOR</option>
            <option value="USER">USER</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-warm-oak-300/30 dark:border-candle-gold-500/15 bg-cream-50/80 dark:bg-espresso-950/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-warm-oak-200/50 dark:border-espresso-800 bg-cream-100/60 dark:bg-espresso-900/60 text-warm-oak-700 dark:text-cream-200 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-4">User</th>
                <th className="p-4">Role Clearances</th>
                <th className="p-4">Metrics</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-oak-200/40 dark:divide-espresso-800">
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-cream-100/40 dark:hover:bg-espresso-900/30 transition-colors"
                >
                  <td className="p-4">
                    <span className="font-serif font-bold text-burgundy-950 dark:text-cream-50 block">
                      {u.fullName}
                    </span>
                    <span className="text-[11px] text-warm-oak-600 dark:text-cream-300/70 font-mono">
                      {u.email} • Joined {u.createdAt}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.map((r) => (
                        <span
                          key={r}
                          className="px-2 py-0.5 rounded-full bg-candle-gold-500/15 text-candle-gold-800 dark:text-candle-gold-300 font-mono text-[10px] font-bold"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-warm-oak-700 dark:text-cream-300">
                      <span title="Books Shelved">{u.savedCount} saved</span>
                      <span title="Reviews Penned">{u.reviewsCount} reviews</span>
                      <span title="Downloads">{u.downloadsCount} dl</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {u.isActive ? (
                      <span className="flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold font-mono text-[11px]">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold font-mono text-[11px]">
                        <UserX className="w-3.5 h-3.5" />
                        <span>Suspended</span>
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openRoleModal(u)}
                        className="px-3 py-1 rounded-xl bg-cream-200/70 hover:bg-cream-200 dark:bg-espresso-800 dark:hover:bg-espresso-700 text-burgundy-950 dark:text-cream-100 font-semibold transition-colors text-[11px]"
                      >
                        Change Role
                      </button>
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-colors ${
                          u.isActive
                            ? 'text-red-600 hover:bg-red-500/10'
                            : 'text-green-700 hover:bg-green-500/10'
                        }`}
                      >
                        {u.isActive ? 'Suspend' : 'Reactivate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Elevation Modal */}
      <AnimatePresence>
        {isRoleModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-cream-50 dark:bg-espresso-900 rounded-3xl border border-warm-oak-300/40 dark:border-candle-gold-500/20 p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-full text-warm-oak-500 hover:text-burgundy-950 dark:hover:text-cream-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-candle-gold-500" />
                <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
                  Update Role Clearance
                </h3>
              </div>
              <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mb-5">
                Assign administrative privileges for <strong className="font-serif">{selectedUser.fullName}</strong>.
              </p>

              <form onSubmit={handleUpdateRole} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Select Clearance Tier
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRoleType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-mono"
                  >
                    <option value={UserRoleType.USER}>USER (Standard Reader)</option>
                    <option value={UserRoleType.MODERATOR}>MODERATOR (Review Moderation & Triage)</option>
                    <option value={UserRoleType.CONTENT_MANAGER}>CONTENT_MANAGER (Catalogue & Licence Verification)</option>
                    <option value={UserRoleType.SUPPORT_ADMIN}>SUPPORT_ADMIN (User & Audit Inquiries)</option>
                    <option value={UserRoleType.SUPER_ADMIN}>SUPER_ADMIN (Full Platform Governance)</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRoleModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-warm-oak-700 dark:text-cream-200 hover:bg-cream-200/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 text-xs font-semibold shadow-md transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Updating...' : 'Confirm Clearance'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
