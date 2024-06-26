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
        Schema::create('invite_groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invite_id');
            $table->enum('w1', ['y', 'n'])->nullable();
            $table->enum('w1', ['y', 'n'])->nullable();
            $table->string('link', 8)->unique();
            $table->timestamps();
            $table->index('link');
            $table->foreign('invite_id')->references('id')->on('invites')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invite_groups');
    }
};
