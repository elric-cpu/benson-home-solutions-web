'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Button,
  Input,
  Badge,
} from '@/components/ui';
import { Search, Plus, Trash2, Loader2, Info } from 'lucide-react';
import Link from 'next/link';

interface CatalogItem {
  id: string;
  name: string;
  category1: string | null;
  unitRate: string | null;
  materialRate: string | null;
  laborRate: string | null;
  uom: string | null;
}

interface CartItem extends CatalogItem {
  cartId: string;
  quantity: number;
}

export default function ProjectBuilderClient() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<CatalogItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Debounced search
  useEffect(() => {
    if (search.trim().length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ search: search.trim() }),
          signal: controller.signal,
        });
        if (res.ok && !controller.signal.aborted) {
          const data = await res.json();
          if (!controller.signal.aborted) {
            setResults(data || []);
          }
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('Search failed', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const addToCart = (item: CatalogItem) => {
    setCart((prev) => [
      ...prev,
      { ...item, cartId: Math.random().toString(36).slice(2), quantity: 1 },
    ]);
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const totals = useMemo(() => {
    let material = 0;
    let labor = 0;
    let total = 0;

    cart.forEach((item) => {
      const q = item.quantity;
      material += (parseFloat(item.materialRate || '0') || 0) * q;
      labor += (parseFloat(item.laborRate || '0') || 0) * q;
      total += (parseFloat(item.unitRate || '0') || 0) * q;
    });

    return { material, labor, total };
  }, [cart]);

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="bg-brand-500 hover:bg-brand-600 mb-4 border-transparent text-white">
            True Cost Directory
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
            Oregon Project Cost Builder
          </h1>
          <p className="text-lg text-slate-600">
            Stop guessing what repairs should cost. We pull real, localized
            construction data (materials and labor) straight from the 1build
            index. Build your project line-by-line below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* SEARCH & RESULTS */}
          <div className="space-y-6 lg:col-span-7">
            <Card>
              <CardHeader className="rounded-t-xl bg-slate-900 text-white">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Search className="h-5 w-5" />
                  Search Materials & Labor
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Input
                    placeholder="Search for drywall, paint, framing, doors..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 text-lg"
                  />
                  <div className="absolute top-3.5 left-3 text-slate-400">
                    {isSearching ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </div>
                </div>

                {search.length > 0 && search.length < 3 && (
                  <p className="py-4 text-center text-sm text-slate-500">
                    Type at least 3 characters to search the local database...
                  </p>
                )}

                <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
                  {results.length === 0 &&
                    search.length >= 3 &&
                    !isSearching && (
                      <p className="py-8 text-center text-slate-500">
                        No matching items found. Try a broader term like
                        &quot;door&quot; or &quot;paint&quot;.
                      </p>
                    )}
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="hover:border-brand-500 flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors sm:flex-row sm:items-center"
                    >
                      <div className="flex-1">
                        <h3 className="mb-1 leading-tight font-semibold text-slate-900">
                          {item.name}
                        </h3>
                        {item.category1 && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium tracking-wider text-slate-500 uppercase">
                            {item.category1}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            ${parseFloat(item.unitRate || '0').toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500">
                            per {item.uom || 'Unit'}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(item)}
                          className="shrink-0"
                        >
                          <Plus className="mr-1 h-4 w-4" /> Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ESTIMATE CART */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <Card className="border-brand-200 overflow-hidden shadow-lg">
                <CardHeader className="bg-brand-50 border-brand-100 border-b">
                  <h2 className="text-brand-900 text-xl font-semibold">
                    Your Project Estimate
                  </h2>
                  <p className="text-brand-700 text-sm">
                    Localized to Mid-Willamette Valley & Harney County
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center p-8 text-center text-slate-500">
                      <Info className="mb-3 h-8 w-8 text-slate-300" />
                      <p>Your estimate is empty.</p>
                      <p className="mt-1 text-sm">
                        Search and add items to see the true cost breakdown.
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-[400px] overflow-y-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="sticky top-0 border-b border-slate-200 bg-slate-50 text-slate-600">
                          <tr>
                            <th className="px-4 py-3 font-medium">
                              Item & Qty
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                              Cost
                            </th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {cart.map((item) => (
                            <tr key={item.cartId} className="hover:bg-slate-50">
                              <td className="px-4 py-3">
                                <p
                                  className="line-clamp-2 font-medium text-slate-900"
                                  title={item.name}
                                >
                                  {item.name}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateQuantity(
                                        item.cartId,
                                        parseInt(e.target.value) || 1,
                                      )
                                    }
                                    className="h-8 w-20 px-2 py-1 text-sm"
                                  />
                                  <span className="text-xs text-slate-500">
                                    {item.uom || 'Units'}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 pt-4 text-right align-top font-medium whitespace-nowrap text-slate-900">
                                $
                                {(
                                  (parseFloat(item.unitRate || '0') || 0) *
                                  item.quantity
                                ).toFixed(2)}
                              </td>
                              <td className="px-4 py-3 pt-3 text-right align-top">
                                <button
                                  onClick={() => removeFromCart(item.cartId)}
                                  className="p-1 text-slate-400 transition-colors hover:text-red-500"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {cart.length > 0 && (
                    <div className="space-y-3 border-t border-slate-200 bg-slate-50 p-6">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Estimated Material (Local Average)</span>
                        <span>${totals.material.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Estimated Labor (Local Average)</span>
                        <span>${totals.labor.toFixed(2)}</span>
                      </div>
                      <div className="flex items-end justify-between border-t border-slate-300 pt-3">
                        <span className="text-lg font-bold text-slate-900">
                          Total Estimate
                        </span>
                        <div className="text-right">
                          <span className="text-brand-600 text-2xl font-black">
                            ${totals.total.toFixed(2)}
                          </span>
                          <p className="mt-1 text-[10px] tracking-wide text-slate-400 uppercase">
                            *Excludes complex scope & permits
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {cart.length > 0 && (
                <div className="mt-6">
                  <Link href="/contact" className="block w-full">
                    <Button
                      size="lg"
                      className="shadow-brand-500/20 w-full text-lg shadow-xl"
                    >
                      Does this look overwhelming? Get an Expert Quote
                    </Button>
                  </Link>
                  <p className="mt-4 px-4 text-center text-xs leading-relaxed text-slate-500">
                    This interactive tool connects to the 1build database to
                    provide raw material and labor averages. Real-world projects
                    require mobilization, demolition, disposal, and expertise.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
