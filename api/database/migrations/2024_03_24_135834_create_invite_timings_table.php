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
        Schema::create('invite_timings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invite_id');
            $table->string('event_time');
            $table->string('event_desc');
            $table->timestamps();
            $table->foreign('invite_id')->references('id')->on('invites')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invite_timings');
    }
};
