'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PackagePlus } from 'lucide-react';

const ProductDialog = ({
  openItem,
  setOpenItem,
  editingItem,
  itemFormData,
  setItemFormData,
  vendors,
  onSubmit,
  onResetForm,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Product Inventory
        </h2>
        <p className="text-slate-600">
          Manage your product master and stock in one place.
        </p>
      </div>

      <Dialog
        open={openItem}
        onOpenChange={(open) => {
          setOpenItem(open);
          if (!open) {
            onResetForm();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform"
            onClick={onResetForm}
          >
            <PackagePlus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl animate-scale-in bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              {editingItem ? 'Edit Product' : 'Add Product'}
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Maintain your product master with stock details.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Name *
              </Label>
              <Input
                value={itemFormData.name}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    name: e.target.value,
                  })
                }
                placeholder="Steel Beams I-Type"
                className="focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Category *
              </Label>
              <Input
                value={itemFormData.category}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    category: e.target.value,
                  })
                }
                placeholder="Structural"
                className="focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Quantity
              </Label>
              <Input
                type="number"
                value={itemFormData.quantity}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                className="focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Unit *
              </Label>
              <Input
                value={itemFormData.unit}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    unit: e.target.value,
                  })
                }
                placeholder="units, kg, liters"
                className="focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Minimum Stock
              </Label>
              <Input
                type="number"
                value={itemFormData.minimumStock}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    minimumStock: parseInt(e.target.value) || 0,
                  })
                }
                className="focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Location *
              </Label>
              <Input
                value={itemFormData.location}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    location: e.target.value,
                  })
                }
                placeholder="Warehouse A"
                className="focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Value ($)
              </Label>
              <Input
                type="number"
                value={itemFormData.value}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    value: parseFloat(e.target.value) || 0,
                  })
                }
                className="focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Vendor
              </Label>
              <Select
                value={itemFormData.vendorId}
                onValueChange={(value) =>
                  setItemFormData({ ...itemFormData, vendorId: value })
                }
              >
                <SelectTrigger className="focus:ring-2 focus:ring-primary/60">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={onSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
          >
            {editingItem ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDialog;
