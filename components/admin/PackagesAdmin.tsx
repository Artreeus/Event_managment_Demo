'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader, Edit, Trash } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
}

interface Package {
  _id: string;
  name: string;
  categoryId: string;
  price: number;
  description: string;
}

export default function PackagesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, pkgRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/packages'),
      ]);

      if (catRes.ok) setCategories(await catRes.json());
      if (pkgRes.ok) setPackages(await pkgRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (response.ok) {
        setFormData({ name: '', categoryId: '', price: '', description: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error adding package:', error);
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
          <CardTitle className="text-slate-900">Add New Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPackage} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-900">
                Category
              </label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger className="border-slate-200 mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">Name</label>
              <Input
                type="text"
                placeholder="Package name"
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
              <label className="text-sm font-medium text-slate-900">Price</label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                disabled={isAdding}
                className="border-slate-200 mt-1"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">
                Description
              </label>
              <Textarea
                placeholder="Package description"
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
              {isAdding ? 'Adding...' : 'Add Package'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Existing Packages</CardTitle>
          <CardDescription>
            {packages.length} packages total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {packages.length === 0 ? (
            <p className="text-slate-600">No packages yet.</p>
          ) : (
            <div className="space-y-2">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">{pkg.name}</p>
                    {pkg.description && (
                      <p className="text-sm text-slate-600">
                        {pkg.description.substring(0, 50)}...
                      </p>
                    )}
                    <p className="text-sm font-semibold text-slate-700 mt-1">
                      ${pkg.price}
                    </p>
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
