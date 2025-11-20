'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Package, Trash2 } from 'lucide-react';

const ProductsTable = ({
  filteredInventory,
  getStockLevel,
  getVendorName,
  handleEditItem,
  handleDeleteItem,
}) => {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-800">Inventory Items</CardTitle>
        <CardDescription>
          All products with stock, location, and vendor mapping.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {filteredInventory.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No products found
            </h3>
            <p className="text-slate-500">
              Try adjusting filters or add a new product.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const stockLevel = getStockLevel(item);
                const barBg =
                  stockLevel === 'critical'
                    ? 'bg-red-100'
                    : stockLevel === 'low'
                    ? 'bg-yellow-100'
                    : 'bg-emerald-100';
                const badgeClass =
                  stockLevel === 'critical'
                    ? 'bg-red-500 text-white'
                    : stockLevel === 'low'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-emerald-500 text-white';

                return (
                  <TableRow
                    key={item.id}
                    className="animate-fade-in border-b border-slate-100 last:border-0"
                  >
                    <TableCell className="font-medium text-slate-800">
                      {item.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20"
                      >
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{item.quantity}</span>
                      <span className="text-slate-500 text-sm ml-1">
                        {item.unit}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16">
                          <Progress
                            value={
                              item.minimumStock
                                ? (item.quantity / item.minimumStock) * 100
                                : 100
                            }
                            className={`h-2 ${barBg}`}
                          />
                        </div>
                        <Badge className={badgeClass}>{stockLevel}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {getVendorName(item.vendorId)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-700 border-slate-200"
                      >
                        {item.location}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-800">
                      ${item.value?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>⋮
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-red-600"
                            onClick={() => handleDeleteItem(item.id, item.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
