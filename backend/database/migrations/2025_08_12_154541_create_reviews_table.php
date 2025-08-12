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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reviewer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('reviewed_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('charter_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('booking_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('type', ['charter', 'crew', 'operator'])->default('charter');
            $table->integer('rating'); // 1-5 stars
            $table->text('comment');
            $table->json('rating_breakdown')->nullable(); // For detailed ratings (safety, cleanliness, etc.)
            $table->json('images')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_public')->default(true);
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
