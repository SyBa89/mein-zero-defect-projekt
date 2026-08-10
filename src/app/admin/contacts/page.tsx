'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'answered';
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  const [error, setError] = useState('');

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/contacts', { credentials: 'include' });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        setError('Kontakte konnten nicht geladen werden.');
        return;
      }
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setError('Verbindungsfehler.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const updateStatus = async (id: string, status: 'read' | 'answered') => {
    const res = await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const deleteContact = async (id: string) => {
    const res = await fetch('/api/admin/contacts?id=' + id, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--theme-primary)]" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-red-600 font-bold">Nicht angemeldet.</p>
        <Link
          href="/admin"
          className="px-4 py-2 bg-[var(--theme-primary)] text-white text-sm font-semibold rounded-[var(--theme-radius)] hover:brightness-110"
        >
          Zum Login
        </Link>
      </div>
    );
  }

  const statusLabel: Record<string, string> = {
    new: 'Neu',
    read: 'Gelesen',
    answered: 'Beantwortet',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">📬 Kontakt-Inbox</h1>
            <p className="text-gray-500 mt-1">Echte Anfragen aus deinem Kontaktformular</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadContacts}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[var(--theme-radius)] hover:bg-gray-100"
            >
              ↻ Neu laden
            </button>
            <button
              onClick={() => (window.location.href = '/api/admin/contacts/export')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[var(--theme-radius)] hover:bg-gray-100"
            >
              ⬇️ Export
            </button>
            <input
              type="file"
              accept=".json"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                try {
                  const data = JSON.parse(text);
                  const res = await fetch('/api/admin/contacts/import', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ contacts: data }),
                  });
                  if (res.ok) {
                    window.alert('Import erfolgreich!');
                    loadContacts();
                  } else {
                    window.alert('Import fehlgeschlagen!');
                  }
                } catch {
                  window.alert('Ungültige JSON-Datei!');
                }
                e.target.value = '';
              }}
              className="hidden"
              id="import-input"
            />{' '}
            <button
              onClick={() => document.getElementById('import-input')?.click()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[var(--theme-radius)] hover:bg-gray-100"
            >
              ⬆️ Import
            </button>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[var(--theme-radius)] hover:bg-gray-100"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-[var(--theme-radius)] p-4 mb-6">
            {error}
          </div>
        )}

        {contacts.length === 0 && !error ? (
          <div className="bg-white rounded-[var(--theme-radius)] shadow-sm border border-gray-100 p-12 text-center text-gray-500">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-semibold">Keine Kontaktanfragen vorhanden.</p>
            <p className="text-sm mt-1">
              Sobald Besucher das Kontaktformular nutzen, erscheinen die Nachrichten hier.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={
                  'bg-white rounded-[var(--theme-radius)] shadow-sm border p-6 ' +
                  (contact.status === 'new'
                    ? 'border-[var(--theme-primary)] border-l-4'
                    : 'border-gray-100')
                }
              >
                <div className="flex items-center gap-3">
                  <p className="font-bold text-gray-900">{contact.name}</p>
                  <span
                    className={
                      'text-xs font-semibold px-2 py-0.5 rounded-full ' +
                      (contact.status === 'new'
                        ? 'bg-[var(--theme-primary)] text-white'
                        : 'bg-gray-100 text-gray-600')
                    }
                  >
                    {statusLabel[contact.status]}
                  </span>
                </div>
                <p className="text-sm text-[var(--theme-primary)] mt-0.5">{contact.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(contact.createdAt).toLocaleString('de-DE')}
                </p>
                <p className="text-gray-700 mt-4 whitespace-pre-wrap leading-relaxed">
                  {contact.message}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {contact.status === 'new' && (
                    <button
                      onClick={() => updateStatus(contact.id, 'read')}
                      className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-[var(--theme-radius)] hover:bg-gray-200"
                    >
                      ✓ Als gelesen markieren
                    </button>
                  )}
                  {contact.status !== 'answered' && (
                    <button
                      onClick={() => updateStatus(contact.id, 'answered')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[var(--theme-primary)] text-white rounded-[var(--theme-radius)] hover:brightness-110"
                    >
                      ✓ Beantwortet
                    </button>
                  )}
                  <a
                    href={'mailto:' + contact.email}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 text-gray-700 rounded-[var(--theme-radius)] hover:bg-gray-100"
                  >
                    ✉️ Antworten
                  </a>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 rounded-[var(--theme-radius)] hover:bg-red-100 ml-auto"
                  >
                    🗑️ Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
