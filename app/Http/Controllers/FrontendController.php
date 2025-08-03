<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use App\Models\Partner;
use App\Models\Team;
use Throwable;

class FrontendController extends Controller
{
    public function partners()
    {
        $partners = Partner::all();
        return response()->json($partners);
    }

    public function team()
    {
        $team = Team::all();
        return response()->json($team);
    }

    public function newsletter_subscribe(Request $request)
    {
        $vData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:newsletter_subscribers,email'
        ],[
            'email.unique' => "You've subscribed previously"
        ]);

        try{
            $subscriber = new NewsletterSubscriber();
            $subscriber->fill($vData);
            $subscriber->save();

            return Misc::success_response('Subscribed Successfully');
        }catch(\Throwable $th){
            return Misc::error_response($th->getMessage());
        }
    }

    
}
