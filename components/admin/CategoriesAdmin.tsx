'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Plus, Edit, Trash } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  description: string;
  active: boolean;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', description: '' });
        fetchCategories();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-900">Name</label>
              <Input
                type="text"
                placeholder="Category name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isAdding}
                className="border-slate-200 mt-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">
                Description
              </label>
              <Textarea
                placeholder="Category description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={isAdding}
                className="border-slate-200 mt-1"
                rows={3}
              />
            </div>

            <Button type="submit" disabled={isAdding} className="w-full">
              {isAdding && <Loader className="w-4 h-4 mr-2 animate-spin" />}
              {isAdding ? 'Adding...' : 'Add Category'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Existing Categories</CardTitle>
          <CardDescription>
            {categories.length} categories total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-slate-600">No categories yet.</p>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">{category.name}</p>
                    {category.description && (
                      <p className="text-sm text-slate-600">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
