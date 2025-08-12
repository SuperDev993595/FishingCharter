<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Charter extends Model
{
    use HasFactory;

    protected $fillable = [
        'operator_id', 'name', 'description', 'boat_name', 'boat_type',
        'capacity', 'location', 'latitude', 'longitude', 'price_per_person',
        'price_per_trip', 'duration_hours', 'amenities', 'fishing_types',
        'target_species', 'images', 'license_number', 'insurance_info',
        'is_active', 'is_featured', 'rating', 'review_count'
    ];

    protected $casts = [
        'amenities' => 'array',
        'fishing_types' => 'array',
        'target_species' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'rating' => 'decimal:2',
        'price_per_person' => 'decimal:2',
        'price_per_trip' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function operator()
    {
        return $this->belongsTo(User::class, 'operator_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
