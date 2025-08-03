<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Misc;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request)
    {
        // if ($request->user()->hasVerifiedEmail()) {
        //     return redirect()->intended(route('dashboard', absolute: false));
        // }

        $request->user()->sendEmailVerificationNotification();

        return Misc::success_response('Verification Email Sent');
    }
}
