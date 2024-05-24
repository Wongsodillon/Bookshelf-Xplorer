<?php

namespace App\Http\Middleware;

use App\Models\Lists;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureListBelongsToUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $listId = $request->route('id');
        $list = Lists::find($listId);
        if ($list->user_id != Auth::id()) {
            return redirect()->back();
        }

        return $next($request);
    }
}
