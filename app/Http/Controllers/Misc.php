<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Startup;
use App\Models\StartupLike;
use App\Models\StartupView;
use App\Models\StartupComment;
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

    // view function for start up 
    public function viewStartup(Request $request)
    {
        $data = $request->validate([
            'startup_id' => 'required',
            'user_id' => 'required',
            'guest' => 'required|boolean'
        ]);

        try{

        $hasViewed = StartupView::
        where('user_id', $data['user_id'])
        ->orWhere('guest_id', $data['user_id'])
        ->where('startup_id', $data['startup_id'])
        ->first();

        if($hasViewed) return;

        $view = new StartupView();
        if($data['guest'] === true):
            $view->guest_id = $data['user_id'];
        else:
            $view->user_id = $data['user_id'];
        endif;
        $view->startup_id = $data['startup_id'];
        $view->save();

        $update = $this->addStartupView($data['startup_id']);
        return 'Success';
        }catch(\Throwable $th){return $th->getMessage();};
    }

    // add view function for start up 
    private function addStartupView($id){
        try{
            $startup = Startup::findorFail($id);
            $views = StartupView::where('startup_id', $id)->get();
            $startup->update([
                'views_count' => $views->count()
            ]);
            return true;
        }catch(\Throwable $th){return $th->getMessage();}
    }

    // view function for start up 
    public function likeStartup(Request $request)
    {
        $data = $request->validate([
            'startup_id' => 'required',
            'user_id' => 'required',
            'guest' => 'required|boolean'
        ]);

        try{

        $hasLike = StartupLike::
            where('user_id', $data['user_id'])
            ->orWhere('guest_id', $data['user_id'])
            ->where('startup_id', $data['startup_id'])
            ->first();

        if($hasLike){
            $this->unlikeStartup($data['startup_id'], $data['user_id']);
            return 'Unliked';
        };

        $like = new StartupLike();
        if($data['guest'] === true):
            $like->guest_id = $data['user_id'];
        else:
            $like->user_id = $data['user_id'];
        endif;
        $like->startup_id = $data['startup_id'];
        $like->save();

        $this->addStartupLike($data['startup_id']);
        return 'Liked';
        }catch(\Throwable $th){return $th->getMessage();};
    }

    // add like function for start up 
    private function addStartupLike($id){
        try{
            $startup = Startup::findorFail($id);
            $likes = StartupLike::where('startup_id', $id)->get();
            $startup->update([
                'likes_count' => $likes->count()
            ]);
            return true;
        }catch(\Throwable $th){return $th->getMessage();}
    }

    // remove like function for startup
    private function unlikeStartup($id, $userId){
        try{
            $startup = Startup::findorFail($id);
            $likes = StartupLike::where('startup_id', $id)->get();
            $startup->update([
                'likes_count' => $likes->count() - 1
            ]);
            $hasLike = StartupLike::
            where('user_id', $userId)
            ->orWhere('guest_id', $userId)
            ->where('startup_id', $id)
            ->first();

            $hasLike->delete();

            return true;
        }catch(\Throwable $th){return $th->getMessage();}
    }



    // save comment for startup
    public function saveStartupComment(Request $request){
        $das = $request->validate([
            'startup_id' => 'required|integer',
            'comment' => 'required|string',
            'comment_id' => 'nullable'
        ]);

        $oldComment = isset($das['coment_id']) ?? StartupComment::findOrFail($das['comment_id']);

        if($oldComment){
            $oldComment->update([
                'comment' => $das['comment']
            ]);
        }else{
            $comment = new StartupComment();
            $comment->fill($das);
            $comment->sender_id = Auth::id();
            $comment->save();

            return true;            
        }
    }

}
