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
        Schema::create('invite_guests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invite_group_id');
            $table->string('name');
            $table->enum('willbe', ['y', 'n'])->nullable();
            $table->timestamps();
            $table->foreign('invite_group_id')->references('id')->on('invite_groups')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invite_guests');
    }
};
