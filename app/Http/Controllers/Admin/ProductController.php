<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::with('user:id,name')->latest()->get(),
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'asking_price' => 'required|string|max:255',
        ]);

        $request->user()->products()->create($validated);

        return redirect(route('admin.products.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product) : RedirectResponse
    {
        $this->authorize('update', $product);

        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'asking_price' => 'required|string|max:255',
        ]);

        $product->update($validated);

        return redirect(route('admin.products.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product) : RedirectResponse
    {
        $this->authorize('delete', $product);

        $product->delete();

        return redirect(route('admin.products.index'));
    }
}

