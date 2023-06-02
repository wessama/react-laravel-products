<?php

namespace App\Broadcasting;

use App\Models\User;

class ProductChannel
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user, int $productId): array|bool
    {
        return true;
    }
}
