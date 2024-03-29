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
        Schema::create('invites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('theme_id')->nullable();
            $table->string('name_one');
            $table->string('name_two');
            $table->date('end_point');
            $table->string('photo')->nullable();
            $table->text('place_one');
            $table->string('map_url_one')->nullable();
            $table->text('place_two');
            $table->string('map_url_two')->nullable();
            $table->text('invitation');
            $table->text('postinvite');
            $table->text('deadline');
            $table->text('thankyou');
            $table->text('additional');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invites');
    }
};
