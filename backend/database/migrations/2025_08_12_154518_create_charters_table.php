<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('charters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('operator_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->string('boat_name');
            $table->string('boat_type');
            $table->integer('capacity');
            $table->string('location');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->decimal('price_per_person', 10, 2);
            $table->decimal('price_per_trip', 10, 2)->nullable();
            $table->integer('duration_hours');
            $table->json('amenities')->nullable();
            $table->json('fishing_types')->nullable();
            $table->json('target_species')->nullable();
            $table->json('images')->nullable();
            $table->string('license_number')->nullable();
            $table->string('insurance_info')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charters');
    }
};
