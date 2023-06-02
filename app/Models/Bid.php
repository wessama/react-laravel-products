<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Bid extends Model
{
    protected $fillable = [
        'product_id',
        'value',
    ];

    public function product() : HasOne
    {
        return $this->hasOne(Product::class);
    }
}
