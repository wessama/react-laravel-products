<?php

namespace App\Http\Controllers;

use App\Events\BidUpdated;
use App\Models\Bid;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:255',
        ]);

        $bids = $product->bids();

        $currentBid = $validated['value'];
        if ($currentBid > $product->highest_bid) {
            event(new BidUpdated($product->id, $currentBid));
        }

        $bids->create($validated);

        return Inertia::render('Products/Index', [
            'products' => Product::with('user:id,name')->latest()->get(),
            'highestBid' => $product->fresh()->highest_bid,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bid $bid)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bid $bid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bid $bid)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bid $bid)
    {
        //
    }
}
