<?php

use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Advisor\FounderController;
use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminCheck;
use App\Http\Middleware\Advisor\AuthCheck;
use App\Http\Middleware\Advisor\GuestCheck;
use Illuminate\Support\Facades\Auth;

//FRONTEND ROUTES START
    Route::get('/', function () {
        return Inertia::render('Main/Index');
    })->name('phi_home');

    
    Route::get('/partners/get', [FrontendController::class, 'partners'])->name('frontend.partners.get');
    Route::get('/team/get', [FrontendController::class, 'team'])->name('team.partners.get');

    // Newsletter subscription start
    Route::post('/newsletter/subscribe', [FrontendController::class, 'newsletter_subscribe'])->name('frontend.newsletter.subscribe');
    // Newsletter subscription end
// FRONTEND ROUTES END



// Admin Routes start 
Route::get('/admin/login', function(){
    return Inertia::render('Admin/Auth/Login');
})->name('adminLogin');

Route::middleware([AdminCheck::class])->prefix('admin')->group(function () {

    // dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    //PARTNERS START
    Route::get('/partners', function () {
        return Inertia::render('Admin/Sections/Partners');
    })->name('admin.partners');

    Route::get('/partners/get', [PartnerController::class, 'index'])->name('admin.partners.get');
    // create and update url
    Route::post('/partners/post', [PartnerController::class, 'createOrUpdate'])->name('admin.partners.post');
    // delete url 
    Route::delete('/partners/delete/{id}', [PartnerController::class, 'deletePartner'])->name('admin.partners.delete');
    //PARTNERS END


    // TEAM START
    Route::get('/team', function () {
        return Inertia::render('Admin/Sections/Team');
    })->name('admin.team');

    Route::get('/team/get', [TeamController::class, 'index'])->name('admin.team.get');
    // fronted data url
    Route::post('/team/get', [TeamController::class, 'get'])->name('admin.team.getJson');
    // create and update url
    Route::post('/team/post', [TeamController::class, 'createOrUpdate'])->name('admin.team.post');
    // delete url 
    Route::delete('/team/delete/{id}', [TeamController::class, 'deleteTeam'])->name('admin.team.delete');


    // TEAM END



    // NEWSLETTER START

    
    Route::prefix('newsletter')->group(function(){


        // Newsletter page start

        Route::get('/', function(){
            return Inertia::render('Admin/Newsletter/Index');
        });

        Route::get('/get', [NewsletterController::class, 'index']);
        Route::post('/post', [NewsletterController::class, 'createOrUpdate']);
        Route::delete('/delete/{id}', [NewsletterController::class, 'trashIt']);
        Route::delete('/full_delete/{id}', [NewsletterController::class, 'delete']);
        Route::get('/trash', [NewsletterController::class, 'trash']);
        // Newsletter page end

        // Subscribers start

        Route::get('/subscribers', function(){
            return Inertia::render('Admin/Newsletter/Subscribers');
        });

        Route::get('/subscribers/get', [NewsletterController::class, 'subscribers']);
        Route::post('/subscribers/delete', [NewsletterController::class, 'delete_subscriber']);

        // Subscribers end


        // Send Newsletters start

        Route::get('/send', function(){
            return Inertia::render('Admin/Newsletter/Send');
        });
        Route::post('/send/{id}', [NewsletterController::class, 'send']);

        // Send Newsletters end
    });


    // NEWSLETTER END



});

// Admin Routes end 



// AI Advisor Start

Route::prefix('advisor')->group(function(){

    Route::get('/', function(){
        return Inertia::render('Advisor/Index', ['user' => Auth::user()]);
    });

    Route::get('/startups', function(){
        return Inertia::render('Advisor/Startups', ['title' => 'Startups', 'user' => Auth::user()]);
    });

    // Founder start

    Route::prefix('startup')->group(function(){
        Route::get('/get/{id}', []);    
        Route::post('/rate', [FounderController::class, 'rateStartup']);
    });

    // Founder end

    Route::middleware(GuestCheck::class)->group(function(){
        // register routes
        Route::get('/register', function(){
            return Inertia::render('Advisor/Auth/Register', ['auth' => Auth::check()]);
        });

        // login routes
        Route::get('/login', function(){
            return Inertia::render('Advisor/Auth/Login', ['auth' => Auth::check()]);
        })->name('advisor.login');
    });

    // Email verification 
    Route::get('/verify-email', function(){
        return Inertia::render('Advisor/Auth/VerifyEmail', ['user' => Auth::user()]);
    });

    // dashboard
    Route::get('/dashboard', function(){
        return Inertia::render('Advisor/Auth/Dashboard', ['user' => Auth::user()]);
    })->middleware(AuthCheck::class)->name('advisor.dashboard');

    Route::get('/dashboard/startup', function(){
        return Inertia::render('Advisor/Founder/Projects',['title'=>'My Projects']);
    });

});

// AI Advisor end


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
