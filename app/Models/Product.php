<?php

namespace App\Models;

use App\Events\ProductCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'asking_price',
    ];

    protected $dispatchesEvents = [
        'created' => ProductCreated::class,
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
