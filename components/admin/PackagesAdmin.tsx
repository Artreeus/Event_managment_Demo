'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Plus, Trash2, Edit2, Check, X, Package } from 'lucide-react';

interface Category { _id: string; name: string; icon?: string; }
interface Pkg {
  _id: string;
  name: string;
  categoryId: string | { _id: string; name: string };
  price: number;
  duration: string;
  description: string;
  features: string[];
}

const emptyForm = { name: '', categoryId: '', price: '', duration: '', description: '', features: '' };

export default function PackagesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [catRes, pkgRes] = await Promise.all([fetch('/api/categories'), fetch('/api/packages')]);
      if (catRes.ok) setCategories(await catRes.json());
      if (pkgRes.ok) setPackages(await pkgRes.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const buildBody = (f: typeof emptyForm) => ({
    name: f.name.trim(),
    categoryId: f.categoryId,
    price: parseFloat(f.price),
    duration: f.duration.trim(),
    description: f.description.trim(),
    features: f.features.split('\n').map(s => s.trim()).filter(Boolean),
  });

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildBody(form)),
      });
      if (res.ok) { setForm(emptyForm); setShowAdd(false); fetchData(); }
    } catch (e) { console.error(e); }
    finally { setIsSubmitting(false); }
  };

  const handleEdit = async (id: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/packages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildBody(editForm)),
      });
      if (res.ok) { setEditingId(null); fetchData(); }
    } catch (e) { console.error(e); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deactivate this package?')) return;
    await fetch(`/api/packages/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const startEdit = (pkg: Pkg) => {
    setEditingId(pkg._id);
    const catId = typeof pkg.categoryId === 'string' ? pkg.categoryId : pkg.categoryId._id;
    setEditForm({
      name: pkg.name,
      categoryId: catId,
      price: String(pkg.price),
      duration: pkg.duration || '',
      description: pkg.description || '',
      features: (pkg.features || []).join('\n'),
    });
  };

  const CategorySelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Category *</label>
      <select value={value} onChange={e => onChange(e.target.value)} required
        className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select category</option>
        {categories.map(c => <option key={c._id} value={c._id}>{c.icon} {c.name}</option>)}
      </select>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Service Packages</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400">{packages.length} active</p>
          </div>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-1" /> Add Package
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-200 dark:border-blue-800 p-5 space-y-4">
          <h4 className="font-semibold text-slate-900 dark:text-white">New Package</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <CategorySelect value={form.categoryId} onChange={v => setForm({ ...form, categoryId: v })} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Name *</label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Gold Package" required
                className="h-10 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Price ($) *</label>
              <Input type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" required
                className="h-10 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Duration</label>
              <Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 8 hours"
                className="h-10 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Description</label>
            <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description..." rows={2}
              className="text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Features (one per line)</label>
            <Textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder={"Feature 1\nFeature 2\nFeature 3"} rows={4}
              className="text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div className="flex gap-2 pt-1">
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-1" />Save Package</>}
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
        ) : packages.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-gray-400 text-sm">No packages yet.</div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-gray-700">
            {packages.map(pkg => {
              const catName = typeof pkg.categoryId === 'string'
                ? categories.find(c => c._id === pkg.categoryId)?.name
                : (pkg.categoryId as any)?.name;
              return (
                <div key={pkg._id} className="p-4">
                  {editingId === pkg._id ? (
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <CategorySelect value={editForm.categoryId} onChange={v => setEditForm({ ...editForm, categoryId: v })} />
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Name</label>
                          <Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            className="h-9 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Price ($)</label>
                          <Input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                            className="h-9 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-600 dark:text-gray-300">Duration</label>
                          <Input value={editForm.duration} onChange={e => setEditForm({ ...editForm, duration: e.target.value })}
                            className="h-9 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                      </div>
                      <Textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Description" rows={2} className="text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      <Textarea value={editForm.features} onChange={e => setEditForm({ ...editForm, features: e.target.value })}
                        placeholder="Features (one per line)" rows={3} className="text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(pkg._id)} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 h-8">
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
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-medium text-slate-900 dark:text-white">{pkg.name}</p>
                          <span className="text-xs text-slate-400 dark:text-gray-500">·</span>
                          <span className="text-xs text-slate-500 dark:text-gray-400">{catName ?? '—'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">${pkg.price}</span>
                          {pkg.duration && <span className="text-slate-400 dark:text-gray-500 text-xs">{pkg.duration}</span>}
                        </div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button onClick={() => startEdit(pkg)}
                          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-gray-600 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(pkg._id)}
                          className="w-8 h-8 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
