<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BidUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public int $productId, public int $highestBid)
    {

    }

    public function broadcastOn()
    {
        return ['product.' . $this->productId];
    }

    public function broadcastAs()
    {
        return 'bid.updated';
    }

    public function broadcastWith()
    {
        return [
            'highestBid' => $this->highestBid,
        ];
    }
}
