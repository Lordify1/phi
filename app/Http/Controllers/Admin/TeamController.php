<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Misc;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
 
    public function index()
    {
        $team = Team::all();
        return response()->json($team);
    }

    public function createOrUpdate(Request $request)
    {
        $data = $request->validate([
            'id' => 'nullable',
            'name' => 'string|required',
            'role' => 'required',
            'bio' => 'required',
            'picture' => 'required_without:id',
            'links' => 'required|json',
        ], [
            'picture.required_without' => 'Picture is required'
        ]);

        isset($data['picture']) &&  $data['picture'] = json_encode($data['picture']);
        isset($data['links']) &&  $data['links'] = json_encode($data['links']);
    
        try{
            $team = null;

            if(isset($data['id']))
            {
                $team = Team::find($data['id']);
            }
            $message = '';

            if(!$team)
            {
                $newTeam = new Team();
                $newTeam->fill($data);
                $newTeam->save();

                $message = 'Team Member Created';
            }else{
                isset($data['links']) &&  $data['links'] = json_decode($data['links']);
                $team->update($data);

                $message = 'Team Member Updated';
            };

            return Misc::success_response($message);
        }catch(\Throwable $th){
            return Misc::error_response($th->getMessage());
        }
    }

    public function deleteTeam($id)
    {
        try{
            $team = Team::findOrFail($id);
            $team->delete();
            return Misc::success_response('Team Member Deleted');
        }catch(\Throwable $th)
        {
            return Misc::error_response($th->getMessage());
        }
    }

}
