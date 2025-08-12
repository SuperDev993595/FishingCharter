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
        Schema::create('crew_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crew_post_id')->constrained()->onDelete('cascade');
            $table->foreignId('crew_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['pending', 'reviewed', 'shortlisted', 'interviewed', 'accepted', 'rejected'])->default('pending');
            $table->text('cover_letter');
            $table->json('experience')->nullable();
            $table->json('certifications')->nullable();
            $table->json('references')->nullable();
            $table->string('resume_path')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('interviewed_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crew_applications');
    }
};
