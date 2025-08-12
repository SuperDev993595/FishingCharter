<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CharterController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CrewController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// OAuth routes
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
Route::get('/auth/facebook', [AuthController::class, 'redirectToFacebook']);
Route::get('/auth/facebook/callback', [AuthController::class, 'handleFacebookCallback']);

// Public charter routes
Route::get('/charters', [CharterController::class, 'index']);
Route::get('/charters/{charter}', [CharterController::class, 'show']);
Route::get('/charters/search', [CharterController::class, 'search']);

// Public crew routes
Route::get('/crew-posts', [CrewController::class, 'index']);
Route::get('/crew-posts/{crewPost}', [CrewController::class, 'show']);
Route::get('/crew-posts/search', [CrewController::class, 'search']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Charter management (operators only)
    Route::middleware('role:operator')->group(function () {
        Route::post('/charters', [CharterController::class, 'store']);
        Route::put('/charters/{charter}', [CharterController::class, 'update']);
        Route::delete('/charters/{charter}', [CharterController::class, 'destroy']);
        Route::get('/my-charters', [CharterController::class, 'myCharters']);
    });
    
    // Booking management
    Route::middleware('role:angler')->group(function () {
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::get('/my-bookings', [BookingController::class, 'myBookings']);
        Route::put('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
    });
    
    // Operator booking management
    Route::middleware('role:operator')->group(function () {
        Route::get('/operator/bookings', [BookingController::class, 'operatorBookings']);
        Route::put('/bookings/{booking}/confirm', [BookingController::class, 'confirm']);
        Route::put('/bookings/{booking}/complete', [BookingController::class, 'complete']);
    });
    
    // Crew post management (operators only)
    Route::middleware('role:operator')->group(function () {
        Route::post('/crew-posts', [CrewController::class, 'store']);
        Route::put('/crew-posts/{crewPost}', [CrewController::class, 'update']);
        Route::delete('/crew-posts/{crewPost}', [CrewController::class, 'destroy']);
        Route::get('/my-crew-posts', [CrewController::class, 'myCrewPosts']);
    });
    
    // Crew application management
    Route::middleware('role:crew')->group(function () {
        Route::post('/crew-applications', [CrewController::class, 'apply']);
        Route::get('/my-applications', [CrewController::class, 'myApplications']);
        Route::put('/crew-applications/{application}/withdraw', [CrewController::class, 'withdrawApplication']);
    });
    
    // Operator application management
    Route::middleware('role:operator')->group(function () {
        Route::get('/crew-posts/{crewPost}/applications', [CrewController::class, 'applications']);
        Route::put('/crew-applications/{application}/review', [CrewController::class, 'reviewApplication']);
        Route::put('/crew-applications/{application}/accept', [CrewController::class, 'acceptApplication']);
        Route::put('/crew-applications/{application}/reject', [CrewController::class, 'rejectApplication']);
    });
    
    // Messaging
    Route::get('/messages', [MessageController::class, 'index']);
    Route::get('/messages/{user}', [MessageController::class, 'conversation']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::put('/messages/{message}/read', [MessageController::class, 'markAsRead']);
    
    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::get('/my-reviews', [ReviewController::class, 'myReviews']);
    Route::put('/reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
    
    // Payment routes
    Route::post('/payments/create-intent', [BookingController::class, 'createPaymentIntent']);
    Route::post('/payments/confirm', [BookingController::class, 'confirmPayment']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/users', [AuthController::class, 'adminUsers']);
    Route::get('/admin/charters', [CharterController::class, 'adminCharters']);
    Route::get('/admin/bookings', [BookingController::class, 'adminBookings']);
    Route::get('/admin/crew-posts', [CrewController::class, 'adminCrewPosts']);
    Route::get('/admin/reviews', [ReviewController::class, 'adminReviews']);
    Route::put('/admin/users/{user}/verify', [AuthController::class, 'verifyUser']);
    Route::put('/admin/charters/{charter}/feature', [CharterController::class, 'toggleFeature']);
});
