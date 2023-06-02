<?php

namespace App\Models;

use App\Events\ProductCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'asking_price',
    ];

    protected $appends = [
        'highest_bid',
    ];

    protected $dispatchesEvents = [
        'created' => ProductCreated::class,
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bids() : HasMany
    {
        return $this->hasMany(Bid::class);
    }

    public function getHighestBidAttribute()
    {
        $highestBid = $this->bids()->max('value');
        return $highestBid ?? 0;
    }
}
