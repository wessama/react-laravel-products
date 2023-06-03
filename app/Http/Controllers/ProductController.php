<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'asking_price' => 'required|string|max:255',
        ]);

        $request->user()->products()->create($validated);

        return redirect(route('products.index'));
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

        return redirect(route('products.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product) : RedirectResponse
    {
        $this->authorize('delete', $product);

        $product->delete();

        return redirect(route('products.index'));
    }
}
