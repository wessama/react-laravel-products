<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) : mixed
    {
        // Check if the authenticated user exists and has the is_admin property set to true
        if ($request->user() && $request->user()->is_admin) {
            return $next($request);
        }

        // Redirect or return an error response if the user is not an admin
        return redirect()->route('dashboard')->with('error', 'You are not authorized to access this resource.');
    }
}
