'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  ShieldCheck, 
  UserCheck, 
  X,
  FileText
} from 'lucide-react';

export default function ContactsPage() {
  const { state } = useFirstSavvyStore();
  const [search, setSearch] = useState('');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const filteredContacts = state.contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.relationship.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Family & Advisors</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Household Contacts Directory
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setContactModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-sky" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contacts by name or relationship..."
          className="w-full bg-transparent text-xs text-brand-navy dark:text-white focus:outline-none placeholder-slate-400"
        />
      </div>

      {/* 3. Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-sky-50 dark:bg-sky-950/60 text-brand-sky flex items-center justify-center font-bold text-xs">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-brand-navy dark:text-white">{contact.name}</div>
                  <span className="text-[10px] font-semibold text-brand-sky bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded">
                    {contact.relationship}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              {contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.notes && (
                <p className="text-[11px] text-slate-500 italic pt-1">
                  "{contact.notes}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD CONTACT MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Add Contact</h3>
              <button onClick={() => setContactModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setContactModalOpen(false); }} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Grandma Eleanor or Marcus Vance"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Relationship</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Financial Advisor or Grandparent"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
