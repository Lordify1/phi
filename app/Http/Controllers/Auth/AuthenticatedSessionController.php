<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Misc;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try{
            $request->authenticate();

            $request->session()->regenerate();

            $user = User::findOrFail(Auth::id());

            if($user->is_admin !== 'yes' && !$user->email_verified_at) return Misc::error_response('Email Not Verified');

            $redirectUrl = '';
            $intended = false;

            if ($request->session()->has('url.intended')) {
                $redirectUrl = $request->session()->get('url.intended');
                $intended = true;
            } else {
                if ($user->is_admin == 'yes') {
                    $redirectUrl = '/admin/dashboard';
                } else {
                    $redirectUrl = '/advisor/dashboard';
                }
            }

            return Misc::success_response('Login Successfully', $redirectUrl, 200, [], $intended);
        } catch (\Throwable $th) {
            return Misc::error_response($th->getMessage());
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
