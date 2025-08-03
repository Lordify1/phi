<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Misc;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{

    public function index()
    {
        $partners = Partner::all();
        return response()->json($partners);
    }

    public function createOrUpdate(Request $request)
    {
        $data = $request->validate([
            'id' => 'nullable',
            'name' => 'string|required',
            'url' => 'required',
            'logo' => 'required_without:id',
        ]);

        isset($data['logo']) &&  $data['logo'] = json_encode($data['logo']);
    
        try{
            $partner = null;

            if(isset($data['id']))
            {
                $partner = Partner::find($data['id']);
            }
            $message = '';

            if(!$partner)
            {
                $newPartner = new Partner();
                $newPartner->fill($data);
                $newPartner->save();

                $message = 'Partner Created';
            }else{
                $partner->update($data);

                $message = 'Partner Updated';
            };

            return Misc::success_response($message);
        }catch(\Throwable $th){
            return Misc::error_response($th->getMessage());
        }
    }

    public function deletePartner($id)
    {
        try{
            $partner = Partner::findOrFail($id);
            $partner->delete();
            return Misc::success_response('Partner Deleted');
        }catch(\Throwable $th)
        {
            return Misc::error_response($th->getMessage());
        }
    }
}
