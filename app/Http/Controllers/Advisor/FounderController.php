<?php

namespace App\Http\Controllers\Advisor;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Misc;
use App\Models\Rating;
use App\Models\Startup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FounderController extends Controller
{
    // create, update, delete startup start
    public function createStartup(Request $request){
        
    }

    public function updateStartup(Request $request){
        
    }

    public function deleteUpdate($id){

    }
    // create, update, delete startup end


    // rate startup
    public function rateStartup(Request $request){
        $val = $request->validate([
            'rate' => 'required',
            'comment' => 'nullable',
            'startup_id' => 'required',
        ]);

        
        $rated = Rating::where([
            'user_id' => Auth::id(),
            'startup_id' => $val['startup_id']
        ])->first();

        if($rated){
            $rated->update([
                'rate' => $val['rate'],
                'user_id' => Auth::id(),
                'startup_id' => $val['startup_id'],
                'comment' => $val['comment'] ? $val['comment'] : null
            ]);

            $this->totalRate($val['startup_id']);
        }else{
            $rate = new Rating();
            $rate->fill($val);
            $rate->user_id = Auth::id();
            $rate->save();

            $this->totalRate($val['startup_id']);
        }

        return Misc::success_response('Thanks for your support');
        
    }

    // update startup total rate
    private function totalRate($id){
        $rates = Rating::where('startup_id',$id)->get();
        $total = $rates->sum('rate') / $rates->count();
        $startup = Startup::findOrFail($id);
        $startup->update([
            'rating' => $total
        ]);
        return true;
    }

    public function getStartup($id){
        $startup = Startup::findOrFail($id);
        return response()->json($startup);
    }
}