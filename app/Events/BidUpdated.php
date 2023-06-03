<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BidUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public int $productId, public int $highestBid)
    {
        //
    }

    public function broadcastOn() : array
    {
        return ['product.' . $this->productId];
    }

    public function broadcastAs() : string
    {
        return 'bid.updated';
    }

    public function broadcastWith() : array
    {
        return [
            'highestBid' => $this->highestBid,
        ];
    }
}
