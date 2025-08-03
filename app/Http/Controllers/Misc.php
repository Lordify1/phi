<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Milon\Barcode\DNS1D;
use Illuminate\Support\Facades\Auth;
use App\Models\User;




class Misc extends Controller
{

    public static function response($data, $status = 200)
    {
        return response()->json(['data' => $data], $status);
    }

    public static function success_response($message, $redirectUrl = null, $status = 200, $data = [], $intended = false)
    {
        return response()->json([
            'message' => $message,
            'redirectUrl' => $redirectUrl,
            'data' => $data,
            'intended' => $intended
        ], $status);
    }

    public static function error_response($message, $status = 500)
    {
        return response()->json([
            'message' => $message,
        ], $status);
    }

    public static function authenticateUser()
    {
        $user = User::findOrFail(Auth::user()->id);
        $user->authenticated = 0;
        $user->update();   
    } 

    public function delete($id, $type)
    {

    }

    public static function handleFileUpload($files, $storagePath)
    {
        $paths = [];
            foreach ($files as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path($storagePath), $fileName);
                $paths[] = 'files/newsletters/images/' . $fileName;
            }

        return $paths;
    }

}
