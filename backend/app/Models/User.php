<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'avatar',
        'bio',
        'location',
        'website',
        'social_links',
        'is_verified',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'social_links' => 'array',
        'is_verified' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get the charters owned by this user (if operator).
     */
    public function charters()
    {
        return $this->hasMany(Charter::class, 'operator_id');
    }

    /**
     * Get the bookings made by this user (if angler).
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'angler_id');
    }

    /**
     * Get the crew posts created by this user (if operator).
     */
    public function crewPosts()
    {
        return $this->hasMany(CrewPost::class, 'operator_id');
    }

    /**
     * Get the crew applications submitted by this user (if crew).
     */
    public function crewApplications()
    {
        return $this->hasMany(CrewApplication::class, 'crew_id');
    }

    /**
     * Get the messages sent by this user.
     */
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Get the messages received by this user.
     */
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    /**
     * Get the reviews written by this user.
     */
    public function reviewsWritten()
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }

    /**
     * Get the reviews received by this user.
     */
    public function reviewsReceived()
    {
        return $this->hasMany(Review::class, 'reviewed_id');
    }

    /**
     * Check if user is an angler.
     */
    public function isAngler()
    {
        return $this->role === 'angler';
    }

    /**
     * Check if user is an operator.
     */
    public function isOperator()
    {
        return $this->role === 'operator';
    }

    /**
     * Check if user is crew.
     */
    public function isCrew()
    {
        return $this->role === 'crew';
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Get the average rating for this user.
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviewsReceived()->avg('rating') ?? 0;
    }

    /**
     * Get the total number of reviews for this user.
     */
    public function getReviewCountAttribute()
    {
        return $this->reviewsReceived()->count();
    }
}
