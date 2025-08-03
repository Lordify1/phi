<?php

namespace App\Jobs;

use App\Mail\NewsletterMailHandler;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNewsletterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, SerializesModels;

    protected $newsletter;
    protected $subscribers;
    protected $schedule;

    /**
     * Create a new job instance.
     */
    public function __construct($newsletter, $subscribers, $schedule)
    {
        $this->newsletter = $newsletter;
        $this->subscribers = $subscribers;
        $this->schedule = $schedule;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->schedule === true) {
            if (
                $this->newsletter[0]->scheduled_date &&
                Carbon::parse($this->newsletter[0]->scheduled_date)->format('Y-m-d H:i') === Carbon::now()->format('Y-m-d H:i')
            ) {
                $subject = $this->newsletter[0]->subject ?? 'Newsletter';
                $view = 'emails.newsletter.normal';
                $data = $this->newsletter[0];

                foreach ($this->subscribers as $subscriber) {
                    $email = $subscriber->email;
                    Mail::to($email)->send(new NewsletterMailHandler($subject, $view, $data));
                }
            }
        } else {
            $subject = $this->newsletter[0]->subject ?? 'Newsletter';
            $view = 'emails.newsletter.normal';
            $data = $this->newsletter[0];

            foreach ($this->subscribers as $subscriber) {
                $email = $subscriber->email;
                Mail::to($email)->send(new NewsletterMailHandler($subject, $view, $data));
            }
        }
    }
}
