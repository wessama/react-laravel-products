<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('products', \App\Http\Controllers\ProductController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::post('bids/store/{product}', [\App\Http\Controllers\BidController::class, 'store'])->name('bids.store');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('products', \App\Http\Controllers\Admin\ProductController::class)
            ->only('index', 'store', 'update', 'destroy');
    });
});

Route::middleware('admin')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('products', \App\Http\Controllers\Admin\ProductController::class)
            ->only('index', 'store', 'update', 'destroy');
    });
});

require __DIR__.'/auth.php';
