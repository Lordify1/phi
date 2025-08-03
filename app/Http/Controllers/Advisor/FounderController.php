<?php

namespace App\Http\Controllers\Advisor;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Misc;
use Illuminate\Http\Request;

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
    public function rateStartup(){
        return Misc::success_response('Success Connecting');
    }
}