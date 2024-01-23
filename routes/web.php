<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\IncomeController;
use App\Http\Controllers\Admin\IngredientController;
use App\Http\Controllers\Admin\OutcomeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StoreController;
use App\Models\Income;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return 'halo';
});

Route::get('/admin/dashboard',[DashboardController::class,'index'])->name('dashboard');

Route::controller(DashboardController::class)->group(function () {
    Route::get('/admin', 'index');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/admin/product', 'index');
    Route::post('/admin/product', 'store');
    Route::put('/admin/product/', 'update');
    Route::delete('/admin/product/', 'destroy');
});

Route::controller(OutcomeController::class)->group(function () {
    Route::get('/admin/outcome', 'index');
    Route::post('/admin/outcome', 'store');
    Route::put('/admin/outcome/', 'update');
    Route::delete('/admin/outcome/', 'destroy');
});

Route::controller(IncomeController::class)->group(function () {
    Route::get('/admin/income', 'index');
    Route::post('/admin/income', 'store');
    Route::put('/admin/income/', 'update');
    Route::delete('/admin/income/', 'destroy');
});

Route::controller(StoreController::class)->group(function () {
    Route::get('/admin/store', 'index');
    Route::post('/admin/store', 'store');
    Route::put('/admin/store/', 'update');
    Route::delete('/admin/store/', 'destroy');
});

Route::controller(IngredientController::class)->group(function () {
    Route::get('/admin/ingredient', 'index');
    Route::post('/admin/ingredient', 'store');
    Route::put('/admin/ingredient/', 'update');
    Route::delete('/admin/ingredient/', 'destroy');
});

Route::controller(CustomerController::class)->group(function () {
    Route::get('/admin/customer', 'index');
    Route::post('/admin/customer', 'store');
    Route::put('/admin/customer/', 'update');
    Route::delete('/admin/customer/', 'destroy');
});

Route::controller(SettingController::class)->group(function () {
    Route::get('/admin/setting', 'index');
});


