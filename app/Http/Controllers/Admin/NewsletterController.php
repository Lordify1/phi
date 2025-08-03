<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Misc;
use App\Models\Newsletter;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{

    public function index()
    {
        $newsletters = Newsletter::all();
        return response()->json($newsletters);
    }

    public function createOrUpdate(Request $request)
    {
        $vData = $request->validate([
            'id' => 'nullable',
            'title' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'content' => 'required',
            'status' => 'required|in:draft,sent,scheduled',
            'scheduled_date' => 'nullable|required_if:status,scheduled|date|after:now',
            'images' => 'nullable',
            'attachments' => 'nullable',
        ]);

        try{

            $message = '';

            // return response()->json($request->file('images'));

            // return Misc::response($imagePaths);

            if(isset($vData['id']))
            {
                $newsletter = Newsletter::findOrFail($vData['id']);

                $imagePaths = $request->hasFile('images') ? Misc::handleFileUpload($request->file('images'), 'files/newsletters/images') : [];

                $attachmentPaths = $request->hasFile('attachments') ? Misc::handleFileUpload($request->file('attachments'), 'files/newsletters/attachments') : [];

                if($newsletter->images) foreach(json_decode($newsletter->images) as $old){ $imagePaths[] = $old;}
                
                $newsletter->fill($vData);
                $newsletter->scheduled_date = $vData['status'] !== 'scheduled' ? NULL : $vData['scheduled_date'];
                $newsletter->images = json_encode($imagePaths);
                $newsletter->attachments = json_encode($attachmentPaths);
                $newsletter->update();

                $message = 'Newsletter Updated';

                if($vData['status'] === 'scheduled')
                {
                    $this->send($newsletter->id, true);
                }
            }else{

                $imagePaths = $request->hasFile('images') ? Misc::handleFileUpload($request->file('images'), 'files/newsletters/images') : [];

                $attachmentPaths = $request->hasFile('attachments') ? Misc::handleFileUpload($request->file('attachments'), 'files/newsletters/attachments') : [];

                $newsletter = new Newsletter();
                $newsletter->fill($vData);
                $newsletter->scheduled_date = $vData['status'] !== 'scheduled' ? NULL : $vData['scheduled_date'];
                $newsletter->images = json_encode($imagePaths);
                $newsletter->attachments = json_encode($attachmentPaths);
                $newsletter->save();

                if($vData['status'] === 'scheduled')
                {
                    $this->send($newsletter->id, true);
                }

                $message = 'Newsletter Created';
            }

            return Misc::success_response($message);
        }catch(\Throwable $th){
            Log::error($th->getMessage());
            return Misc::error_response($th->getMessage());
        }
    }
    
    
    public function send($id, $schedule = false)
    {
        try{
            $newsletter = Newsletter::where('id',$id)->get();
            $subscribers = NewsletterSubscriber::subscribed();
            
            // Dispatch a job to send the newsletter to all subscribers
            dispatch(new \App\Jobs\SendNewsletterJob($newsletter, $subscribers, $schedule));

            // Optionally update status and send_count
            $newsletter = Newsletter::findOrfail($id);
            $newsletter->status = 'sent';
            $newsletter->send_count = $subscribers->count();
            $newsletter->save();

            return Misc::success_response('Newsletter is being sent to subscribers.');
        }catch(\Throwable $th){
            return Misc::error_response($th->getMessage());
        }
    }

  
    public function trashIt($id)
    {
        try{
            $newsletter = Newsletter::findOrFail($id);
            $newsletter->deleted_at = now();
            $newsletter->update();

            return Misc::success_response('Newsletter Moved to Trash');
        }catch(\Throwable $th){
            return Misc::error_response($th->getMessage());
        }
    }

    public function delete($id)
    {
        try{
            $newsletter = Newsletter::findOrFail($id);
            $newsletter->delete();

            return Misc::success_response('Newsletter Deleted');
        }catch(\Throwable $th){
            return Misc::error_response($th->getMessage());
        }
    }

    public function trash()
    {
        $trash = Newsletter::deletedItems();
        return response()->json($trash);
    }

    // subscribers start

    public function subscribers()
    {
        $subscribers = NewsletterSubscriber::all();
        return response()->json($subscribers);
    }

    public function delete_subscriber()
    {

    }

    // subscribers end

}
