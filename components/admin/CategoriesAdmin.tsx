'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Plus, Trash2, Edit2, Check, X, LayoutGrid } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', icon: '' });
  const [newForm, setNewForm] = useState({ name: '', description: '', icon: '' });
  const [showAdd, setShowAdd] = useState(false);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/categories');
      if (res.ok) setCategories(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newForm),
      });
      if (res.ok) {
        setNewForm({ name: '', description: '', icon: '' });
        setShowAdd(false);
        fetchCategories();
      }
    } catch (e) { console.error(e); }
    finally { setIsSubmitting(false); }
  };

  const handleEdit = async (id: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setEditingId(null);
        fetchCategories();
      }
    } catch (e) { console.error(e); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deactivate this category?')) return;
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      fetchCategories();
    } catch (e) { console.error(e); }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat._id);
    setEditForm({ name: cat.name, description: cat.description || '', icon: cat.icon || '' });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Categories</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400">{categories.length} active</p>
          </div>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-1" /> Add Category
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-200 dark:border-blue-800 p-5 space-y-4">
          <h4 className="font-semibold text-slate-900 dark:text-white">New Category</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Name *</label>
              <Input value={newForm.name} onChange={e => setNewForm({ ...newForm, name: e.target.value })}
                placeholder="e.g. Corporate Events" required
                className="h-10 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Icon (emoji)</label>
              <Input value={newForm.icon} onChange={e => setNewForm({ ...newForm, icon: e.target.value })}
                placeholder="🎉"
                className="h-10 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Description</label>
            <Textarea value={newForm.description} onChange={e => setNewForm({ ...newForm, description: e.target.value })}
              placeholder="Short description..." rows={2}
              className="text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div className="flex gap-2 pt-1">
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-1" />Save</>}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowAdd(false)}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              <X className="w-4 h-4 mr-1" />Cancel
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader className="w-7 h-7 animate-spin text-blue-600" /></div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-gray-400 text-sm">No categories yet.</div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-gray-700">
            {categories.map(cat => (
              <div key={cat._id} className="p-4">
                {editingId === cat._id ? (
                  <div className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Name" className="h-9 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      <Input value={editForm.icon} onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
                        placeholder="Icon" className="h-9 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <Textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Description" rows={2} className="text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(cat._id)} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 h-8">
                        {isSubmitting ? <Loader className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-1" />Save</>}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}
                        className="h-8 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <X className="w-3 h-3 mr-1" />Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                      {cat.icon || '📦'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white">{cat.name}</p>
                      {cat.description && <p className="text-xs text-slate-500 dark:text-gray-400 truncate">{cat.description}</p>}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => startEdit(cat)}
                        className="w-8 h-8 rounded-lg border border-slate-200 dark:border-gray-600 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(cat._id)}
                        className="w-8 h-8 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
