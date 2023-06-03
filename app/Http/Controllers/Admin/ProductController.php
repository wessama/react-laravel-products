<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Inertia\Inertia;

/**
 * In a production application, this would happen via Nova or Filament and there
 * wouldn't be a need to duplicate the controller and routes for
 * @see \App\Http\Controllers\ProductController
 */
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
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

